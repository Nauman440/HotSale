var express = require('express');
var app = express();
var path=require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var passport = require('passport');

//require database
require('./api/data/dbconnection');
//require routes + other files
var signup = require('./api/routes/user/userroutes.js');
var admin = require('./api/routes/admin/adminroutes.js');
var sales = require('./api/routes/sales/salesroutes.js');
var org = require('./api/routes/org/orgroutes.js');
require('./config/passport');
require('./secret/secret.js');

app.set('port',3000);

app.use(function(req,res,next)
{

    console.log(req.method,req.url);
     res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname+'/ProSanct-Web-Scrapper-master')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use(session({
    secret: 'Thisismytestkey',
    resave:false,
    saveUninitialized:false,
    store: new MongoStore({mongooseConnection:mongoose.connection})
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());



//Bringing Routes in our Application
app.use('/',signup);
app.use('/admin',admin)
app.use('/admin',sales)
app.use('/org',org);

app.listen(app.get('port'),function()
{
    console.log('Magic Started at '+ app.get('port'));
    
});