const userLogin=require('../../../lib/userLogin')
const bcrypt = require('bcrypt');
const LoginUser = async (req, res,next) => {
    const { email, password } = req.body;
    const hashedPassword =await bcrypt.hash(password, 10); // Hash the password
    try {
        const user = await userLogin(email, hashedPassword);
        if (user) {
            res.status(200).json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        next(error);
    }
}
module.exports = LoginUser;