import './App.css';

import AdminDash from "./components/AdminDash";
import StudentDash from "./components/StudentDash";
import ProfDash from "./components/ProfDash";
import HomeNav from "./components/HomeNav";
import ProfCourseHome from "./components/ProfCourseHome";
import StudCourseHome from "./components/StudCourseHome";
import ProfCourseView from "./components/ProfCourseView";
import Login from "./components/Login";
import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Navigate to="/login" />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/logout" element={<Login />}/>
        <Route exact path="/adminDash" element={<AdminDash />}/>
        <Route exact path="/studentDash" element={<StudentDash />}/>
        <Route exact path="/profDash" element={<ProfDash />}/>
        <Route exact path="/navBar" element={<HomeNav />}/>
        <Route exact path="/profCourseHome" element={<ProfCourseHome />}/>
        <Route exact path="/studCourseHome" element={<StudCourseHome />}/>
        <Route exact path="/profCourseView" element={<ProfCourseView />}/>
      </Routes>
    </Router>
  );
}

export default App;



























    
    /*
    import logo from './logo.svg';
    import './App.css';
    const PORT = 4001;
    var express = require('express');
    var path = require('path');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');

    var index = require('./routes/index');
    var professorRouter = require('./routes/professor');
    var studentRouter = require('./routes/student');
    var classRouter = require('./routes/class');
    var assignmentRouter = require('./routes/assignment');

    var mongoose = require('mongoose');

    var mongooseUrl = 'mongodb+srv://ijcrawford:isaacpassword@codegrader-341.da0gq37.mongodb.net/test?retryWrites=true&w=majority';

    mongoose.connect(mongooseUrl,{ useNewUrlParser: true });

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open',function(){
      console.log('Connected to MongoDB');
    });

    var app = express();

    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });

    app.use("/student", studentRouter);
    app.use("/professor", professorRouter);
    app.use("/class", classRouter);
    app.use("/assignment", assignmentRouter);

    function App() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      );
    }

    export default App;
*/