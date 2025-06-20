const db=require('../db/config')

const userLogin=async (email, hashedPassword) => {
    try {
        const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
        const [rows] = await db.execute(query, [email, hashedPassword]);
        
        if (rows.length > 0) {
            return rows[0]; // Return the user object
        } else {
            return null; // No user found
        }
    } catch (error) {
        console.error('Database error:', error);
        throw error; // Propagate the error to be handled by the calling function
    }
}
module.exports = userLogin;