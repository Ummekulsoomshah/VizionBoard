const userCreate = require('../../../lib/userCreate')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cloudinary=require('cloudinary').v2
const fs = require('fs')
require('dotenv').config() 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
const userSignup = async (req, res,next) => {
    const { username, email, password,role } = req.body
const avatar = req.files?.avatar
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" })
    }
    const resultavatar = await cloudinary.uploader.upload(avatar.tempFilePath)
        fs.unlinkSync(avatar.tempFilePath) // Cleanup temp file
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = {
        username, email, hashedPassword,resultavatar,role
    }
    try {
        const user = await userCreate(user)
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