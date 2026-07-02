const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticateJWT = async(req, res, next) => {
    const token = req.header('Authorization');
    // console.log(token)
    
    if (!token) {
        return res.status(403).json({ message: 'Token required' });
    }
//   jwt.verify(token.slice(7), 'secretkey123', (err, user) => {  
//   // jwt.verify(token, 'secretkey123', (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: 'Invalid token' });
//     }
//     req.user = user;
//     next();
// });
jwt.verify(token.slice(7), 'secretkey123', async (err, decoded) => {

    if (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }

    // Find user from database
    const user = await User.findById(decoded._id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    // Check whether this token matches the one stored in DB
    if (user.activeToken !== token.slice(7)) {
        return res.status(401).json({
            message: "Session expired. Please login again."
        });
    }

    req.user = user;

    next();
});
};

module.exports = authenticateJWT;