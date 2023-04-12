import {
    createBuyer,
    createMerchant,
    createAdmin,
} from './users-dao.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as usersDao from "./users-dao.js";

const JWT_SECRET = 'hashkeyforshipshare';

export const AuthController = (app) => {
    app.post('/auth/signup', signup);
    app.post('/auth/login', login);
    app.post('/auth/changePassword', changePassword);
}

// Sign up -- enter [name, email, password, role], return [token = id]
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

        // generate token for authentication
        const token = jwt.sign({ id: createdUser._id }, JWT_SECRET);

        // return success response and generated token
        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
};


// Login -- enter [email, password], return [token = id]
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if user exists （in each role）
        let user = null;
        user = await findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        // Check if password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Wrong password' });
        }

        // Generate token for authentication
        const token = jwt.sign({ id: user._id }, JWT_SECRET);

        // Return success response and generated token
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
};

// Change password -- enter [email, oldPassword, newPassword]
export const changePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;
        const user = await findUserByEmail(email);

        // Compare
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect old password' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        await updateUserPassword(email, hashedPassword);

        // Return success message
        res.json({ message: 'Password updated successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error changing password' });
    }
};


// utility function
const findUserByEmail = async (email) => {
    const users = await usersDao.findUserByEmail(email);
    return users[0];
}

// c. Update -- return null when unsuccessful
const updateUserPassword = async (email, password) => {
    const user = await findUserByEmail(email);
    const newUser = { ...user._doc, password };

    const id = user._id;
    const role = user.role;

    if (role === 'buyer') {
        await usersDao.updateBuyer(id, newUser)
    }
    else if (role === 'merchant') {
        await usersDao.updateMerchant(id, newUser)
    }
    else if (role === 'admin') {
        await usersDao.updateAdmin(id, newUser)
    }
}