//var express = require('express');
//var passport = require('passport');
//var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var user = mongoose.model('User');
var pass = require('../../data/user/userSchema.js');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var async = require('async');

var crypto = require('crypto');
var secret = require('../../../secret/secret.js');

/*passport.serializeUser((user,done)=>
{
  done(null,user.id);

});

passport.deserializeUser((id,done)=>{
   User.findById(id,(err,user)=>
{
   done(err,user);
});
});
*/

module.exports.signUp = function(req,res)
{
   console.log("Create Account");
   
   user
             .create({
               firstname:req.body.firstname,
               lastname:req.body.lastname,  
               username:req.body.username,
               email:req.body.email,
               password:req.body.password,
               phone_no:req.body.phone_no,
               Age:req.body.Age
               
             },function(err,user)
            {
                if(err)
                {
                    console.log("Error Creating a user");
                    res.status(500).send(err);
                }
                else{
                    console.log('User added');
                    res.status(200).send("User is added to database" + user);
                
                }
            });
};


module.exports.login=function(req,res)
{
    console.log("yes");
     var email=req.body.email;
     var password=req.body.password
    console.log(email);
    user.findOne({'email':email,'password':password},function(err,user)
{
    if(user)
    {
        console.log("I exist");
        res.status(200).send("exist");
    }

    if(err)
    {
       res.status(500).send(err);
    }
    if(!user)
    {
        res.status(404).send("Data Not Found");
    }
});
}


module.exports.forget=function(req,res)
{
    async.waterfall([
        function(callback)
        {
         crypto.randomBytes(20,(err,buf)=>{
            var rand = buf.toString('hex');
            callback(err,rand);
          
         });   
        },

        function(rand,callback)
        {
            user.findOne({'email':req.body.email},(err,user)=>
        {
         if(!user)
         {console.log(rand);
             console.log('error','No Account with that exist or email is invalid');
            
            }   
            
           user.passwordResetToken = rand;
           user.passwordResetExpires = Date.now() + 1 * 60 *1000;

           user.save((err) => {
               callback(err,rand,user)
           });
        })
        },
        function(rand,user,callback)
        {
            var smtpTransport = nodemailer.createTransport({
                host:'smtp.gmail.com',
                port: '587',
                auth: {
                    
                    user:secret.auth.user,
                    pass:secret.auth.pass
                    
                },secureConnection:'false',
                tls:{
                    ciphers:'SSLv3',
                    rejectUnauthorized:false
                }       
                
            });
            console.log(secret.auth.user);
            console.log(secret.auth.pass);

            var mailOptions = {
                to: user.email,
                from:'Hotsale' + '<'+secret.auth.user+'>',
                subject : 'Hotsale Application Password Reset Token',
                text : 'You have requested for password reset token.\n\n'+
                     'Please click on the link to complete the process:\n\n'+
                     'http://localhost:5000/user/reset-password/'+rand+'\n\n' 

            };
            smtpTransport.sendMail(mailOptions,(err,response)=>
        {
            console.log('info','A password reset token has been sent to '+user.email);
            console.log(err);
            res.send(err);
            return callback(err,user);
        })
        }
    ],function(err)
{

})

}

module.exports.reset = function(req,res)
{
    user.findOne({'passwordResetToken':req.params.token,
    'passwordResetExpires':{$gt:Date.now()}},(err,user)=>
{
    if(!user)
    {
        res.status(200).send({'state': 'Expired','message': 'Token is expired'});
    }
    else{
        var data = "User is there"
        res.status(200).send({'state':'Active','message':'Token is valid'});
    }
});

}

module.exports.reset_with_email = function(req,res)
{
    async.waterfall([
        function(callback){
            user.findOne({'passwordResetToken':req.params.token,
            'passwordResetExpires':{$gt:Date.now()}},(err,user)=>
        {
            if(!user)
            {
                res.status(404).json("Token Expired ");
            }
            else{
               
                user.password = req.body.password;
                user.passwordResetToken = undefined;
                user.passwordResetExpires = undefined

                user.save((err)=>{
                    console.log("updated");
                    res.status(200).send("Password Updated");
                    callback(err,user);
                    
                    
                    
                })
            }
        });
        },
        function(user, callback)
        {
            var smtpTransport = nodemailer.createTransport({
                host:'smtp.gmail.com',
                port: '587',
                auth: {
                    
                    user:secret.auth.user,
                    pass:secret.auth.pass
                    
                },secureConnection:'false',
                tls:{
                    ciphers:'SSLv3',
                    rejectUnauthorized:false
                }       
                
            });
            console.log(secret.auth.user);
            console.log(secret.auth.pass);

            var mailOptions = {
                to: user.email,
                from:'Hotsale' + '<'+secret.auth.user+'>',
                subject : 'Hotsale Application Password Updated',
                text : 'Your password has been updated' 

            };
            smtpTransport.sendMail(mailOptions,(err,response)=>
        {
            console.log('info','Password is updated for '+user.email);
            console.log(err);
            res.send(err);
            return callback(err,user);
        })
        }
    ])
}