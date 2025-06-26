const fetchUser=require('../../../lib/user/fetchUser')

const getUser = async (req, res, next) => {
    const userId = req.user.id; // Assuming user ID is stored in req.user after authentication
    console.log("userId",userId)
    try {
        const user = await fetchUser(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            user: {
                id: user.id,
                username: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            },
            message: 'User fetched successfully'
        });
    } catch (error) {
        next(error);
    }
}
module.exports = getUser;