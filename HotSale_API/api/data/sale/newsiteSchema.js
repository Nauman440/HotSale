var mongoose = require('mongoose');


var newSiteSchema = new mongoose.Schema({

Name:{
    type:String
},

Category:{
    type:String
},

SubCategory:
{
    type:String
},

URL:
{
    type:String
}

});

module.exports = mongoose.model("Sites",newSiteSchema);