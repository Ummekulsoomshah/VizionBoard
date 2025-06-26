const Login=require('../../../lib/user/Login')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const LoginUser = async (req, res,next) => {
    const { email, password,rememberMe } = req.body;
    const hashedPassword =await bcrypt.hash(password, 10); // Hash the password
    try {
        const user = await Login(email, hashedPassword); // Call the userLogin function

        if (user) {
           
            const token= jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: rememberMe ? '7d' : '1h' });
            res.status(200).json({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar
                },
                message: 'Login successful'
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        next(error);
    }
}
module.exports = LoginUser;