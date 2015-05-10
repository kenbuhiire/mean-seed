var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
//connection to the mongo collection/database where user in this 
//case is the name of the collection
mongoose.connect('mongodb://localhost/user');

//add your mongoose schema here for example
 var userSchema =  new mongoose.Schema({
  username:String,
  email:{type:String, required:true},
  password: String
});

//add your mongoose model for example
var User = mongoose.model('User',userSchema);

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//add your apis below for example
//get api
app.get('/api/users', function(req, res, next){
  User.find({}, function(err, users){
    if(err) next(err);
    res.send(users);
  });
});

//post api
app.post('/api/users/', function(req, res, next){
    var user = new User(req.body);
    user.save(function(err, user){
        if(err) next(err);
        res.send(user);
    });
});

app.delete('/api/users/:_id', function(req,res, next){
    User.findByIdAndRemove({_id:req.params._id}, function(err, user){
        if(err) next(err);
        User.find(function(err, users){
            if(err) next(err);
            res.send(users);
        });
    });
});
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});