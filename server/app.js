	//Including Express Module....
var express = require('express');
//creating an Instance of Express Module...
var app =express();
//Including Mongoose for databse connectivity...
var mongoose = require('mongoose');
//Including body-parser to parse the header
var bodyParser = require('body-parser');
//Including cookie-parser to parse the cookie...
var cookieParser = require('cookie-parser');
//Create a session middleware....
var session = require('express-session');
//Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
var methodOverride = require('method-override');
//Including path module to include static files...
var path = require('path');
//includig file system to read and write files...
var fs = require('fs');
/*//Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources (e.g. fonts) on a web page to be 
//requested from another domain outside the domain from which the first resource was served.*/

var passport = require('passport');
var cors = require('cors');
//HTTP request logger middleware for node.js
var logger = require('morgan');
//including passport module for using passport strategy...
app.use(cors(
{
    origin: '*'
}
));

//Data Base Connection
var dbPath = "mongodb://localhost/SkillMockDB";
mongoose.connect(dbPath);
mongoose.connection.once('open',function(){
  console.log("Database Connection Established Successfully...");
});
//parsing  and cookie middlewares
app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));
app.use(cookieParser());


app.use(session({
  secret: 'srmlqhyg34',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize()); //to initialize passport service...
app.use(passport.session()); // persistent login sessions...



app.use(express.static(path.resolve(__dirname,'./../client')));

//response generating Library
var resGenerator = require('./libs/resGenerator');

//Including User model and UserAuth Model
var userModel = require('./app/models/UserDetails');

//including controller files
var Routes = require('./app/controllers/authRoutes');
app.use('/users', Routes);

var TestRoutes = require('./app/controllers/skillTestRoutes');
app.use('/Test', TestRoutes);



app.all('/*',function(req,res,next){
  res.header("Access-Control-Allow-Origin","http://localhost:3000");

})

require('./app/controllers/facebookRoute')(passport);

require('./app/controllers/googleRoute')(passport);


var FbUser = require('./app/models/FbUser');
var GoogleUser = require('./app/models/GoogleUser');

app.get('/getUserinfogoogle', function(req, res) {
  GoogleUser.find(function(error, user) {
    if (error) {
      //console.log("error");
      var err = resGenerator.generate(true, "Something is not working, error  : " + error, 500, null);
      res.json(err);
    } 
     else {
         var response = resGenerator.generate(false, "Login Successfull using google", 200, user);
          res.json(user);
        }
      });
    });

// =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect : '/Signup',
      failureRedirect : '/'
    }));
//User Information of facebook

app.get('/getUserinfofacebook', function(req, res) {
  FbUser.find(function(error, user) {
    if (error) {
      //console.log("error");
      var err = resGenerator.generate(true, "Something is not working, error  : " + error, 500, null);
      res.json(err);
    } 
     else {
         var response = resGenerator.generate(false, "Login Successfull using facebook", 200, user);
          res.json(user);
        }
      });
    });



  app.get('/auth/google', passport.authenticate('google', {
        scope: [
        'profile','email']
    }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
          successRedirect: '/Signup',
            failureRedirect: '/'
        }));

//Setting port to 8080..
var port = 8080;

//To log HTTP Requests..
app.use(logger('dev'));



//handling 404 error.
app.use(function(req, res, next){
  res.status(404);
  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }
  res.send('Not found');
});

//Listening on port 3000
app.listen(port,  function(){
  console.log("SkillMock is Running on port:" +port);
});
