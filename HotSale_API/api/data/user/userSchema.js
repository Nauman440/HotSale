var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
firstname:{
    type:String
    
},
lastname:{
type:String

},

username:{
type:String

},
email:
{
    type:String

},
password:
{
    type:String
},
phone_no:
{
    type:String
},
Age:
{
    type:String

},
passwordResetToken: {type:String,default:''},
passwordResetExpires: {type:Date, default:Date.now}

});
userSchema.methods.encryptPassword = function(password)
{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null);
}

module.exports = userSchema.methods.encryptPassword;
module.exports=mongoose.model('User',userSchema)