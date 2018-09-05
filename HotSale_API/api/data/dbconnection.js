var mongoose = require('mongoose');

var dburl ="mongodb://localhost:27017/hotsale";

mongoose.connect(dburl);

mongoose.connection.on('connected',function()
{
    console.log("I am connected to " + dburl);
})

mongoose.connection.on('disconnected',function()
{
    console.log("Mongoose Disconnected");
})

mongoose.connection.on('error',function(err)
{
    console.log("Error connecting with database" + err);
});

//Bringing In Schemas and model
require('./user/userSchema.js');
require('./sale/saleSchema.js');
require('./admin/adminSchema.js');
require('./sale/newsiteSchema.js');
require('./org/Schema.js');