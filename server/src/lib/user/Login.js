const db=require('../../db/config')

const Login=async (email, hashedPassword) => {
    try {

        const [rows]  =await db.query('SELECT * FROM users WHERE email = ? ', [email]);
        console.log('Rows:', rows); // Debugging line to check the fetched rows
        
        if (rows.length > 0) {
            return rows[0]; // Return the user object
        } else {
            const error = new Error('User with this email does not exists');
            error.status = 401; // Unauthorized
            throw error;
        }
    } catch (error) {
        console.error('Database error:', error);
        throw error; // Propagate the error to be handled by the calling function
    }
}
module.exports = Login;