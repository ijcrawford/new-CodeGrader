const PORT = 4001;
var express = require('express');
var path = require('path');
const session = require("express-session");
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const passport = require("passport");
const cors = require("cors");
//var index = require('./routes/index');
var professorRouter = require('./routes/professor');
var studentRouter = require('./routes/student');
var courseRouter = require ('./routes/courses');
var assignmentRouter = require('./routes/assignments');
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
app.use(cors());

const corsOptions ={
  origin:'http://localhost:4001', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());



app.use(bodyParser.json({limit: '50mb', extended: true}));

app.use(bodyParser.urlencoded({limit: '50mb', extended:true, parameterLimit: 10000}));

app.use("/student", studentRouter);
app.use("/professor", professorRouter);
app.use("/courses", courseRouter);
app.use("/assignments", assignmentRouter);
app.use("/users", router);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});