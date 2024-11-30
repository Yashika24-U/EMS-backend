const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();


const registerUser = async (req, res) => {
    try {
        const { username, password, email, mobile } = req.body;

        // Validation : if user already exsists
        let exsistingUser = await User.findOne({
            $or: [{ email }, { username }]
        })

        if (exsistingUser) {
            return res.status(400).json({
                message: 'User already exsists with this email or username'
            })
        }

        //  Encryption : hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            mobile,
        })

        // Save user
        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id, username: newUser.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: newUser._id,
                name: newUser.username,
                email: newUser.email,
                mobile: newUser.mobile,
            }
        })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ massage: 'Server error during registration' })
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;


        // find user
        const user = await User.findOne({ email })
        console.log('user', user)

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: "Inavlid Credentials" })
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({
            message: 'User Logged successfully',
            token
        })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error during login' })
    }
}


module.exports = { registerUser, loginUser }