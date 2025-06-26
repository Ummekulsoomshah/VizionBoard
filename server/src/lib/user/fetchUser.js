const db=require('../../db/config')

const fetchUser = async (userId) => {
    try {
        const [rows]=await db.query('SELECT * FROM users WHERE id = ?', [userId]);
        if (rows.length === 0) {
             const error = new Error('User with this email does not exists');
            error.status = 400; // Conflict
            throw error;// User not found
        }
        const user = rows[0];
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role
        };
    }
    catch (error) {
        console.error("Error fetching user:", error);
        throw new Error('Database query failed');
    }
}
module.exports=fetchUser