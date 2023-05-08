const express = require('express');
const router = express.Router();
const Course = require("../models/course");
const Assignment = require("../models/assignment");
const Verify = require("./verify");
const passport = require("passport");


//Get Assignments by courseId 
router.route("/course/:courseId")
.get( async (req, res) => {
   
    const students = req.params.studentIds;
    const studentId = students.match(studentId);
    
    try {  
        console.log(`Getting all courses for studentId: ${studentId}`);
        const assignments = await Assignment.find({assignmentId: assignmentId});  
        res.status(200).json(assignments);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// Get Assignment by AssignmentID
router.get("/get-assignment/:assignmentId", async (req,res) => {
    const assignmentId = req.params.assignmentId;
    console.log(`Getting intake with id: ${assignmentId}`);

    try {
        const assignment = await Course.findById(assignmentId);
        res.status(200).json(assignment);

    } catch (err) {
        res.status(500).json(err);
    }
});

//Create New Assignment
router.post("/:courseId/create-assignment", async (req, res) => {
    
    try {
        console.log("making assignment");
        const courseId = req.params.courseId;
        const newAssignment = new Assignment({
            assignmentContent: {
                title: req.body.title,
                dueDate: req.body.dueDate,
                testCase: req.body.testCase
            },
            submissions: []
        });
        const course = await Course.findByIdAndUpdate(courseId, {$push: {assignments: newAssignment.assignmentContent}},{returnDocument: 'after'}).then((result) => {
            console.log(result)});

        /*console.log("course found: " + course.data.courseContent.name + ":" + courseId);
        const newAssignment = new Assignment({
            assignmentContent: {
                title: req.body.title,
                dueDate: req.body.dueDate,
                testCase: req.body.testCase
            },
            submissions: []
        });
        console.log("assignment made");
        const assignment = course.courseContent.assignments.push(newAssignment);*/
        console.log("assignment pushed");

        res.status(200).send(course);

    } catch (err) {
        res.status(500).json(err);
    }
});

// Edit Assignment by AssignmentId
router.put("/:assignmentId/edit-assignment", async (req, res) => {
    
    try {
        const assignmentId = req.params.assignmentId;
        console.log(`Updating course: ${assignmentId}`);
        const assignment = Assignment.findByIdAndUpdate(assignmentId, {assignmentContent: req.body.newAssignmentContent});
        res.status(200).json(assignment);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete an Assignment by AssignmentId
router.delete("/:courseId", (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = Course.findByIdAndRemove(courseId);
        res.status(200).send(`Deleted course: ${courseId}`);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Assignment Data by AssignmentId
router.get("/:assignmentId/view-assignment", async (req, res) => {
    try {
        const assignmentId = req.params.assignmentId;
        console.log(assignmentId);
        const assignmentContent = await Assignment.findById(assignmentId);
        
        res.status(200).json(assignmentContent.assignmentContent);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;




