var mongoose = require('mongoose');
var User = mongoose.model('User');
var pass = require('../../data/user/userSchema.js');



module.exports.allUsers = function(req,res)
{

    User
       .find()
       .exec(function(err,users)
    {
        console.log("Users Founds" + users.length);
        res.json(users);

    });
   
}

module.exports.userGetOne = function(req,res)
{
    var email=req.params.email;
    console.log(email);
    User
       .findOne({'email':email})
       .exec(function(err,user)
       {
           var response = {
               status:200,
               message : user
           }
            if(err){ 
              response.status = 500;
              response.message = 
              {
                  "message" :"Something is not right"
              };
             }

             else if(!user)
             {
                 response.status = 404;
                 response.message =
                 {
                     "message":"User Not Found"
                 }
             }
             res
               .status(response.status)
               .json(response.message);
       });
}

module.exports.deleteUser = function(req,res)
{
    var id = req.params.id;
    console.log(id);

    User.
       findByIdAndRemove(id)
       .exec(function(err,user)
    {
        if(err){
            res
              .status(404)
              .json(err);
        }
        else{
            console.log("User deleted, id:",id)
            res
               .status(204)
               .json();
        }
    });

}

