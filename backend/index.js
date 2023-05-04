const PORT = 4001;
var express = require('express');
var path = require('path');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var index = require('./routes/index');
var professorRouter = require('./routes/professor');
var studentRouter = require('./routes/student');
var router = require('./routes/users');

var mongoose = require('mongoose');

var mongooseUrl = 'mongodb+srv://ijcrawford:isaacpassword@codegrader-341.da0gq37.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongooseUrl,{ useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open',function(){
  console.log('Connected to MongoDB');
});

var app = express();

app.use(bodyParser.json({limit: '50mb', extended: true}));

app.use(bodyParser.urlencoded({limit: '50mb', extended:true, parameterLimit: 10000}));

app.use("/student", studentRouter);
app.use("/professor", professorRouter);
app.use("/users", router);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});