import {
    createBuyer,
    createMerchant,
    createAdmin, findAdminByEmail,
} from './users-dao.js';
import bcrypt from 'bcryptjs';
import * as usersDao from "./users-dao.js";


export const AuthController = (app) => {
    app.post('/auth/signup', signup);
    app.post('/auth/login', login);
    app.put('/auth/changePassword', changePassword);
    app.post("/auth/profile", profile);
    app.post("/auth/logout",  logout);
    app.put("/auth/update", update);
}

// Sign up -- enter [name, email, password, role], return [newUser]
export const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user with same email exists
        const existingUser = await findUserByEmail(email);
        console.log(existingUser);
        if (existingUser ) {
            return res.status(409).json({ message: 'User with same email already exists' });
        }

        // hash
        const hashedPassword = await bcrypt.hash(password, 10);

        // build new user
        const newUser = { name, email, password: hashedPassword };
        let createdUser = null;
        if (role === "buyer") {
            createdUser = await createBuyer(newUser);
        }
        else if (role === "merchant") {
            createdUser = await createMerchant(newUser);
        }
        else if (role === "admin") {
            createdUser = await createAdmin(newUser);
        }

        // return success response
        req.session["currentUser"] = newUser;
        res.json(await findUserByEmail(email));
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
};


// Login -- enter [email, password], return [user]
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if user exists （in each role）
        let user = null;
        user = await findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        // 2. Check if password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Wrong password' });
        }

        // 3. Check if user is banned. If so, return 403
        const admin = await usersDao
            .findAdminByEmail("admin@shipshare.com");
        if (admin[0].blockList.indexOf(user._id.toString()) !== -1) {
            return res.status(403).json({ message: 'User is banned' });
        }

        // 4. Return success response
        req.session["currentUser"] = user;
        req.session.save(err => {});
        console.log("Log In");
        console.log(req.session);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error logging in' });
    }
};

// Profile
const profile = async (req, res) => {
    console.log("Profile");
    console.log(req.session);
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
        console.log("Cannot find current user");
        res.sendStatus(404);
        return;
    }
    res.json(currentUser);
};

// Logout
const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200)
};


// Change password -- enter [oldPassword, newPassword]
export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        // Check if user logged in
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(404);
            return;
        }

        // Compare
        const isMatch = await bcrypt.compare(oldPassword, currentUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect old password' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        await updateUserPassword(currentUser, hashedPassword);

        // Return success message
        res.json({ message: 'Password updated successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error changing password' });
    }
};

// Update
export const update = async (req, res) => {

    // Check if user logged in
    const currentUser = req.session["currentUser"];
    const update = req.body;
    if (!currentUser) {
        res.sendStatus(404);
        return;
    }
    const id = currentUser._id;
    const role = currentUser.role;
    let updatedUser = null;

    // Update user object - based on role
    if (role === 'buyer') {
        updatedUser = await usersDao.updateBuyer(id, update)
            .then(() => usersDao.findBuyerById(id));
    }
    else if (role === 'merchant') {
        updatedUser = await usersDao.updateMerchant(id, update)
            .then(() => usersDao.findMerchantById(id));
    }
    else if (role === 'admin') {
        updatedUser = await usersDao.updateAdmin(id, update)
            .then(() => usersDao.findAdminById(id));
    }
    // 4. Update session and return.
    req.session["currentUser"] = updatedUser;
    req.session.save(err => {});
    res.json(updatedUser);
};



// utility function
const findUserByEmail = async (email) => {
    const users = await usersDao.findUserByEmail(email);
    return users[0];
}

// c. Update -- return null when unsuccessful
const updateUserPassword = async (user, password) => {
    const id = user._id;
    const role = user.role;

    if (role === 'buyer') {
        await usersDao.updateBuyer(id, {password})
    }
    else if (role === 'merchant') {
        await usersDao.updateMerchant(id, {password})
    }
    else if (role === 'admin') {
        await usersDao.updateAdmin(id, {password})
    }
}
