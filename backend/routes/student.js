const express = require('express');
const studentRouter = express.Router();
const Student = require("../models/student");
const Course = require("../models/course");
const Assignment = require("../models/assignment");
const Verify = require("./verify");
const passport = require("passport");

//Create student account
studentRouter.route('/')
.post( async (req,res) => {
    console.log("Creating a new account...");
    console.log(req.body);

    await Student.register(new Student({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName}), 
        req.body.password)
        .then((student) => {
            passport.authenticate("local")(req, res, () => {
                const token = Verify.getToken(student);
                return res
                .status(200)
                .header("x-access-token", token)
                .header("access-control-expose-headers", "x-access-token")
                .send(student);
            })
        });
});

//Login
studentRouter.route('/login')
.post(passport.authenticate("local"), async (req, res) => {
    try {    
        console.log("Logging in...")
        await Student.findOne({email: req.body.email})
        .then((student) => {
            const token = Verify.getToken(student);
            return res.status(200).send(token);
        });
    } catch(err) {
        console.log("Login failed.");
        return res.status(500).json(err);
    }
});

//Delete a student account
studentRouter.route("/:studentId")
.delete( async (req, res) => {
    console.log("Deleting student account " + req.params.studentId);
    try {
        await Student.deleteOne({studentId: req.params.studentId})
        console.log("Student " + req.params.studentId + " deleted.")
        return res.status(200);
    } catch(err) {
        console.log("Deletion failed.");
        return res.status(500).json(err);
    }
});
//Update a student account
studentRouter.put( async (req, res) => {
    console.log("Updating student account " + req.params.studentId);
    try {
        await Student.findOne({email: req.body.email})
        .then((student) => {
            if(req.body.email != null) { student.email = req.body.email }
            if(req.body.firstName != null) { student.firstName = req.body.firstName }
            if(req.body.lastName != null) { student.lastName = req.body.lastName }
            if(req.body.password != null) { student.password = req.body.password }
        })
    } catch(err) {
        console.log("Update failed.");
        return res.status(500).json(err);
    }
});

//Get all student's courses
studentRouter.route("/:studentId/course")
.get( async (req, res) => {
    console.log("Getting all courses...");
    const courses = Student.course;
    
    try {    

        res.status(200).json(courses);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Get specific course
studentRouter.route("/:studentId/course/:courseId")
.get( async (req, res) => {
    console.log("Getting course with ID: " + req.params.courseId)
    const courses = Student.course;
    const courseId = req.params.courseId;
    
    try {    

        const course = courses.findbyId(courseId);
        res.status(200).json(course);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//update assignment submission
studentRouter.post("/:studentId/course/:courseID/assignment/:assignmentId/submissions", (req, res) => {
    try {
        const assignmentId = req.params.assignmentId;
        const submissions = Assignment.findById(assignmentId).submission;
        const submission = submissions.push({
            studentId: req.body.studentId,
            testCaseOutput: req.body.testCaseOutput,
            grade: req.body.grade,
            feedback: ""
        });

        res.status(200).send(submission);

    } catch (err) {
        res.status(500).json(err);
    }
});

//Get Specific Submission
studentRouter.get("/:studentId/courses/:courseID/assignment/:assignmentId/submissions/:studentId", (req, res) => {
    const assignmentId = req.params.assignmentId;
    const studentId = req.params.studentId;
    try {
        const assignment = Assignment.findById(assignmentId);
        //const student = Student.findById(studentId);
        const submissions = assignment.submission;
        const specSubmission = submissions.filter(submission => submission.studentId == studentId);

        res.status(200).send(specSubmission);

    } catch (err) {
        res.status(500).json(err);
    }
});

//update specific submission
studentRouter.put("/:studentId/courses/:courseID/assignment/:assignmentId/submissions/:studentId", (req, res) => {
    const assignmentId = req.params.assignmentId;
    const studentId = req.params.studentId;
    try {
        const assignment = Assignment.findById(assignmentId);
        const submissions = assignment.submission;

        const submission = submissions.findByIdAndUpdate(studentId, 
            {grade: grade}).then((course) => {
                res.status(200).json(course);
            });

    } catch (err) {
        res.status(500).json(err);
    }
});

//get test case output for assignment
studentRouter.get("/:studentId/courses/:courseID/assignment/:assignmentId/submissions/:studentId/testCaseOutput", (req, res) => {
    const assignmentId = req.params.assignmentId;
    const studentId = req.params.studentId;
    try {
        const assignment = Assignment.findById(assignmentId);
        //const student = Student.findById(studentId);
        const submissions = assignment.submission;
        const specSubmission = submissions.filter(submission => submission.studentId == studentId);

        res.status(200).send(specSubmission.testCaseOutput);

    } catch (err) {
        res.status(500).json(err);
    }
});

//get due date
studentRouter.get("/:studentId/courses/:courseID/assignment/:assignmentId/dueDate", (req, res) => {
    const assignmentId = req.params.assignmentId;

    try {
        const assignment = Assignment.findById(assignmentId);

        res.status(200).send(assignment.dueDate);

    } catch (err) {
        res.status(500).json(err);
    }
});

// Logout
studentRouter.post("/logout", async (req, res) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
    });
    res.send({message: "Successfully logged out"});
});

// Get User by UserId
studentRouter.get("/get-user/:studentId", async (req, res) => {
    try {
        const studentId = req.params.studentId;
        Student.findById(studentId).then((student) => {
            res.status(200).send(student);
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = studentRouter;