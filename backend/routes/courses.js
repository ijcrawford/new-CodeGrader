const express = require('express');
const router = express.Router();
const Course = require("../models/course");
const User = require("../models/user");
const Verify = require("./verify");
const passport = require("passport");


//Get Courses by studentId 
router.route("/student/:studentIds/:studentId")
.get( async (req, res) => {
   
    const students = req.params.studentIds;
    const studentId = req.params.studentId;
    
    try {  
        console.log(`Getting all courses for studentId: ${studentId}`);
        const courses = await Course.find({studentId: students.find(studentId)});  
        res.status(200).json(courses);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Get Courses by professorId 
router.route("/professor/:professorId")
.get( async (req, res) => {
   
    const professorId = req.params.professorId;
    
    try {  
        console.log(`Getting all courses for professorId: ${professorId}`);
        const courses = await Course.find({professorId: professorId});
        res.status(200).json(courses);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get Course by CourseID
router.get("/get-course/:courseId", async (req,res) => {
    const courseId = req.params.courseId;
    console.log(`Getting intake with id: ${courseId}`);

    try {
        const course = await Course.findById(courseId);
        res.status(200).json(course);

    } catch (err) {
        res.status(500).json(err);
    }
});

//Create New Course
router.put("submit-course", async(req,res) => {
    try{
        const courseId = req.body.courseId;
        const professorId = req.body.professorId;

        const newCourse = new Course({
            constContent:{
               name: req.body.name,
               beginningDate: req.body.beginningDate,
               endingDate: req.body.endingDate,
               assignments:[]
            },
            
            professorId: professorId,
            studentIds:[],
           
        });
        const savedCourse = await newCourse.save();
        res.status(200).send(savedCourse);

    }catch(err){
        res.status(500).json(err);
    }
});

// Edit Course by CourseId
router.put("/:courseId/edit-course", async (req, res) => {
   
    try {
        const courseId = req.params.courseId;
        console.log(`Updating course: ${courseId}`);
        const course = await Course.findByIdAndUpdate(courseId, {courseContent: req.body.newCourseContent});
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete a Course by CourseId
professorRouter.delete("/:courseId", (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = Course.findByIdAndRemove(courseId);
        res.status(200).send(`Deleted course: ${courseId}`);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Course Data by CourseId
router.get("/:courseId/view-course", async (req, res) => {
    try {
        const courseId = req.params.courseId;
        console.log(courseId);
        const courseContent = await Course.findById(courseId);
        
        res.status(200).json(courseContent.courseContent);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Add Students to Course
router.put("/add-students/:courseId", async (req, res) => {
    try {
        console.log('test');
        const courseId = req.params.courseId;
        const studentIds = req.body.studentIds;
        console.log(studentIds);
        Course.findByIdAndUpdate(courseId, {
            studentIds: studentIds
        }, {new: true}).then((result) => {
            console.log(result);
            res.status(200).send(result);
        })

    } catch (err) {
        res.status(500).json(err);
    }
})




