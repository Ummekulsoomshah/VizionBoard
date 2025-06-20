const db=require('../db/config')

const userCreate = async (user) => {
    const { username, email, hashedPassword ,resultavatar,role} = user;

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return null; // User already exists
        }

        const [result] = await db.query('INSERT INTO users (username, email, password,avatar,role) VALUES (?, ?, ?,?,?)', [username, email, hashedPassword,avatar,role]);
        return { id: result.insertId }; // Return the created user object
    } catch (error) {
        console.error("Error creating user:", error);
        throw error; // Propagate the error to be handled by the calling function
    }
}
module.exports = userCreate;