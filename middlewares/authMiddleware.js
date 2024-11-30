const jwt = require('jsonwebtoken')
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {

    // Get the token from the header
    const token = req.header('Authorization')?.replace('Bearer ', '');


    //  Check if no token
    if (!token) {
        return res.status(401).json({ message: 'No token, Auhtorization denied' });
    }


    try {

        //Verify token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find User
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'User not found' })
        }

        if (!user.isActive) {
            return res.status(403).json({ message: 'User account is deactivated' })
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;