const jwt = require('jsonwebtoken');

exports.authorize = (req, res) => {
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(403).json({ message: 'Token required' });
    }
  // jwt.verify(token.slice(7), 'secretkey123', (err, user) => {  
    jwt.verify(token, 'secretkey123', (err, user) => {
        if (err) {
        return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
})
}
