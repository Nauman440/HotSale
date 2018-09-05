var mongoose = require('mongoose');

var orgSchema = new mongoose.Schema({

title:{
    type:String
},
start_date:{
 type:String
},
end_date:{
  type:String
},
site_url:{
    type:String,
},
category:{
    type:String
},

sub_category:{
    type:String
},

location:{
    type:String
},
image_url:{
    type:String
},

desc:{
    type:String
},
Status:{
  type:String,
  default:'Pending'
}

});

module.exports=mongoose.model('org_ads',orgSchema);