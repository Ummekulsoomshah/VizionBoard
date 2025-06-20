const router= require('express').Router();
const LoginUser=require('../api/v1/user/userLogin')
const SignupUser=require('../api/v1/user/userSignup')
const GetUser=require('../api/v1/user/getUser')
const UpdateUser=require('../api/v1/user/editUser')
const UpdatePassword=require('../api/v1/user/updatePass')
const DeleteUser=require('../api/v1/user/deleteUser')
const GoogleLogin=require('../api/v1/user/googleLogin')

router.post('/login',LoginUser);
router.post('/signup',SignupUser); 
// router.get('/getUser',GetUser);
// router.put('/updateUser',UpdateUser);
// router.put('/updatePassword',UpdatePassword);
// router.delete('/deleteUser',DeleteUser);
// router.post('/googleLogin',GoogleLogin);

module.exports=router;