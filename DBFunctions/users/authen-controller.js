import {
    createBuyer,
    createMerchant,
    createAdmin, findUserByEmail
} from './users-dao.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'hashkeyforshipshare';

export const AuthController = (app) => {
    app.post('/auth/signup', signup);
    app.post('/auth/login', login);
}

// Sign up -- enter [name, email, password, role], return [token = id]
export const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user with same email exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
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
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token for authentication
        const token = jwt.sign({ id: user._id }, JWT_SECRET);

        // Return success response and generated token
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
};
