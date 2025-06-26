const userCreate = require('../../../lib/user/userCreate')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2
const fs = require('fs')
require('dotenv').config()

cloudinary.config({
    cloud_name: 'dxhqouszq',
    api_key: '864435449977183',
    api_secret: 'nbi2qOEgb9j11Os_RdVHRfeDbhY'
})
const userSignup = async (req, res, next) => {
    const { username, email, password, role } = req.body
    console.log("body",req.body)
    console.log("file",req.files)
    const avatar = req.files?.image
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" })
    }
    const resultavatar = await cloudinary.uploader.upload(avatar.tempFilePath)
    fs.unlinkSync(avatar.tempFilePath) // Cleanup temp file
    const hashedPassword = await bcrypt.hash(password, 10)
    const userdata = {
        username, email, hashedPassword, resultavatar, role
    }
    console.log("user information",userdata)
    try {
        const user = await userCreate(userdata)
        if (user) {
            jwt.sign({ id: user.id }, process.env.JWT_SECRET, (err, token) => {
                if (err) {
                    console.error("Error signing JWT:", err);
                    return res.status(500).json({ message: "Internal server error" })
                } else {
                    res.status(200).json({
                        token,
                        message: 'User registered successfully'
                    })
                }
            })
        } else {
            return res.status(400).json({ message: "User already exists" })
        }
    } catch (error) {
        next(error)

    }
}
module.exports = userSignup;