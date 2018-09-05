var express = require('express');
var router = express.Router();


//define controllers
var admin_user = require('../../controller/admin/adminUser_controller.js');
var admin_login = require('../../controller/admin/adminLogin_controller.js');
//define routes now

router
    .route('/all_user')
    .get(admin_user.allUsers);

router
     .route('/all_user/:email')
     .get(admin_user.userGetOne);

     //admin Login

router
   .route('/hs_admin')
   .post(admin_login.login);

//delete user

router   
    .route('/delete-user/:id')
    .get(admin_user.deleteUser);
   

module.exports=router;