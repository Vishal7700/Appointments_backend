const jwt = require('jsonwebtoken');
require('dotenv').config();

const isLoggedIn = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).send({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded; 

        next();  
    } catch (error) {
        return res.status(400).send({ message: 'Invalid token.' });
    }
};

module.exports.isLoggedIn = isLoggedIn;
