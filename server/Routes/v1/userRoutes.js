const express=require('express');
const router=express.Router();

const {
    createUser,
    userDetails,
    showAllUsers,
    updateUser,
    removeUser } = require('../../Controllers/User');


router.post('/createUser',createUser);
router.get('/userDetails',userDetails);
router.get('/showAllUsers',showAllUsers);
router.put('/updateUser',updateUser);
router.delete('/removeUser',removeUser);

module.exports=router;