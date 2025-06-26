const db = require('../../db/config')

const userCreate = async (userdata) => {
    const { username, email, hashedPassword, resultavatar, role } = userdata;
    console.log("user at lib", userdata)
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            // Throw an error with a clear message
            const error = new Error('User with this email already exists');
            error.status = 409; // Conflict
            throw error;
        }
        const [result] = await db.query('INSERT INTO users (name, email, password,avatar,role) VALUES (?, ?, ?,?,?)', [username, email, hashedPassword, resultavatar.secure_url, role]);
        return { id: result.insertId }; // Return the created user object
    } catch (error) {
        console.error("Error creating user:", error);
        throw error; // Propagate the error to be handled by the calling function
    }
}
module.exports = userCreate;