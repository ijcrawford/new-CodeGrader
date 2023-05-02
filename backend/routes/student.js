const express = require('express');
const studentRouter = express.Router();
const student = require("../models/student");
const Course = require("../models/class");
const Assignment = require("../models/assignment");
const Verify = require("./verify");
const passport = require("passport");

//Create student account
studentRouter.route('/')
.post( async (req,res) => {
    console.log("Creating a new account...");
    console.log(req.body);

    await student.register(new student({
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
        await student.findOne({email: req.body.email})
        .then((student) => {
            const token = Verify.getToken(student);
            return res.status(200).send(token);
        });
    } catch(err) {
        console.log("Login failed.");
        return res.status(500).json(err);
    }
});

//Delete/Update a student account
studentRouter.route("/:studentId")
.delete( async (req, res) => {
    console.log("Deleting student account " + req.params.studentId);
    try {
        await student.deleteOne({studentID: req.params.studentId})
        console.log("Student " + req.params.studentID + " deleted.")
        return res.status(200);
    } catch(err) {
        console.log("Deletion failed.");
        return res.status(500).json(err);
    }
})
.put( async (req, res) => {
    console.log("Updating student account " + req.params.studentId);
    try {
        await student.findOne({email: req.body.email})
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

//Get all student's courses/Add student to course
studentRouter.route("/:studentId/courses")
.get( async (req, res) => {
    console.log("Getting all courses...");
    const courses = student.course;
    
    try {    

        res.status(200).json(courses);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Get specific course
studentRouter.route("/:studentId/courses/:courseId")
.get( async (req, res) => {
    console.log("Getting course with ID: " + req.params.courseId)
    const courses = student.course;
    const courseId = req.params.courseId;
    
    try {    

        const course = courses.findbyId(courseId);
        res.status(200).json(course);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

studentRouter.post("/:studentId/courses/:courseID/assignment/:assignmentId/submissions", (req, res) => {
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

        submission.findByIdAndUpdate(studentId, 
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

module.exports = studentRouter;