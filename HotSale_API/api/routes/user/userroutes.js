var express = require('express');
var router = express.Router();
var user = require('../../controller/user/usersController.js');

router
  .route('/signup')
  .post(user.signUp);

  router
       .route('/login')
       .post(user.login)



  router
      .route('/forget')
      .post(user.forget)


  router
       .route('/reset/:token')
       .get(user.reset)
       .post(user.reset_with_email)

       

module.exports=router;