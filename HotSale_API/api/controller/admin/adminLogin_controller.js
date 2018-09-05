var mongoose = require('mongoose');
var admin_login = mongoose.model('adminlogin');

module.exports.login = function(req,res)
{console.log("yes");
var email=req.body.email;
var password=req.body.password
console.log(email);
console.log(password);
admin_login.findOne({'Email':email,'Password':password},function(err,user)
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
}
)}