const jwt=require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token=req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("JWT verification error:", error);
        return res.status(400).json({ message: 'Invalid token.' });
    }
}
module.exports = authMiddleware;