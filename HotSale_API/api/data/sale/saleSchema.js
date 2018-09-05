var mongoose = require('mongoose');



var salesSchema = new mongoose.Schema({
    brandname:{
        type:String
    },
    brandsite:{
     type:String
    },
    image:{
        type:String
    },

    city:{
        type:String
    },


    category:{

    }
,
    Date:{
         type:Date,
         "default":Date.now
    },
    text:
    {
     type:String
    }
}) ;

module.exports = mongoose.model('Sales',salesSchema);