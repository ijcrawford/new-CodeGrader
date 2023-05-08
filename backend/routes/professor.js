const express = require('express');
const professorRouter = express.Router();
const Professor = require("../models/professor");
const Assignment = require("../models/assignment");
const Course = require("../models/course");
const Student = require("../models/student");
const Verify = require("./verify");
const passport = require("passport");

//Create professor account - GOOD
professorRouter.route('/')
.post( async (req,res) => {
    console.log("Creating a new account...");
    console.log(req.body);

    await Professor.register(new Professor({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName}), 
        req.body.password)
        .then((professor) => {
            passport.authenticate("local")(req, res, () => {
                const token = Verify.getToken(professor);
                return res
                .status(200)
                .header("x-access-token", token)
                .header("access-control-expose-headers", "x-access-token")
                .send(professor);
            })
        });
});

//Login
professorRouter.route('/login')
.post(passport.authenticate("local"), async (req, res) => {
    try {    
        console.log("Logging in...")
        await Professor.findOne({email: req.body.email})
        .then((professor) => {
            const token = Verify.getToken(professor);
            return res.status(200).send(token);
        });
    } catch(err) {
        console.log("Login failed.");
        return res.status(500).json(err);
    }
});

//Delete/Update a professor account - NEEDS FIXING
professorRouter.route("/:professorId")
.delete( async (req, res) => {
    console.log("Deleting professor account " + req.params.professorId);
    try {
        const prof = await Professor.findByIdAndRemove(req.params.professorId);
        //console.log("professor " + req.params.professorId + " deleted.")
        res.status(200).send(`Deleted professor with id ${req.params.professorId}`);
    } catch(err) {
        console.log("Deletion failed.");
        return res.status(500).json(err);
    }
})
.put( async (req, res) => { //GOOD
    console.log("Updating professor account " + req.params.professorId);
    try {
        const professor = await Professor.findByIdAndUpdate(req.params.professorId, {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        });
        console.log("successful update for professor with id " + req.params.professorId);
        res.status(200).send(professor);
        /*.then((professor) => {
            if(req.body.email != null) { professor.email = req.body.email }
            if(req.body.firstName != null) { professor.firstName = req.body.firstName }
            if(req.body.lastName != null) { professor.lastName = req.body.lastName }
            if(req.body.password != null) { professor.password = req.body.password }
            console.log("successful update");
            res.status(200).json(professor);
        });*/
    } catch(err) {
        console.log("Update failed.");
        return res.status(500).json(err);
    }
});

//Get all professor's courses/Add professor to course
professorRouter.route("/:professorId/courses")
.get( async (req, res) => {
    console.log("Getting all courses...");
    const courses = professor.course;
    
    try {    

        res.status(200).json(courses);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Get specific course
professorRouter.route("/:professorId/courses/:courseId")
.get( async (req, res) => {
    console.log("Getting course with ID: " + req.params.courseId)
    const courses = professor.course;
    const courseId = req.params.courseId;
    
    try {    

        const course = courses.findbyId(courseId);
        res.status(200).json(course);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//create a course
professorRouter.route("/:professorId/courses")
.post(async (req, res) => {
    try {
        const course = await Class.register(new Class({
            name: req.body.name,
            beginningDate: req.body.beginDate,
            endingDate: req.body.endDate,
            assignedProfessor: req.params.professorId,
            students: req.body.students,
            assignments: []
        }));

        res.status(200).send(course);

    } catch (err) {
        res.status(500).json(err);
    }
});

//update a course
professorRouter.route("/:professorId/courses/:courseId")
.put(async (req, res) => {
    const courseId = req.params.courseId;
    console.log(`Updating course: ${courseId}`);
    
    try {
        const beginDate = req.body.beginDate;
        const endDate = req.body.endDate;
        const students = req.body.students;
        
        Class.findByIdAndUpdate(courseId, 
            {beginningDate: beginDate, endingDate: endDate, students: students}, 
            {$new: true}).then((course) => {
                res.status(200).json(course);
            });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//delete a course
//professorRouter
.delete(async (req, res) => {
    const courseId = req.params.courseId;
    try {
        const course = Class.findByIdAndRemove(courseId);
        res.status(200).send(`Deleted course: ${courseId}`);
    } catch (err) {
        res.status(500).json(err);
    }
});

//create a new assignment
professorRouter.route("/:professorId/courses/:courseId/assignments")
.post(async (req, res) => {
    const courseId = req.params.courseId;
    try {
        const course = Class.findById(courseId);
        const assignment = Class.assignments.push({
            name: req.body.name,
            dueDate: req.body.dueDate,
            assignmentContent: req.body.assignmentContent,
            testCase: req.body.testCase,
            submissions: []
        });

        res.status(200).send(assignment);

    } catch (err) {
        res.status(500).json(err);
    }
});

//get an assignment
professorRouter.route("/:professorId/courses/:courseId/assignments/:assignmentId")
.get(async (req, res) => {
    const courseId = req.params.courseId;
    try {
        const course = Class.findById(courseId);
        const assignment = Assignment.findById(course.assignmentId);

        res.status(200).send(assignment);

    } catch (err) {
        res.status(500).json(err);
    }
})
//update an assignment
//professorRouter
.put( (req, res) => {
    const courseId = req.params.courseId;
    const assignmentId = req.params.assignmentId;
    console.log(`Updating assignment: ${assignmentId}`);
    
    try {
        const dueDate = req.body.dueDate;
        const assignmentContent = req.body.assignmentContent;
        const testCase = req.body.testCase;
        const course = Class.findById(courseId);
        Assignment.findByIdAndUpdate(course.assignmentId, 
            {dueDate: dueDate, assignmentContent: assignmentContent, testCase: testCase}, 
            {$new: true}).then((course) => {
                res.status(200).json(course);
            });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//get all course grades
professorRouter.route("/:professorId/courses/:courseId/grades")
.get(async (req, res) => {
    var studentAverages = [];
    var studentGrades = [];
    const courseId = req.params.courseId;
    try {
        const course = Class.findById(courseId);
        const assignments = course.assignments;
        const students = course.students;
        students.foreach((student,index) => {
          assignments.forEach((assignment, index) => {
              const submissions = assignment.submission;
              const specSubmission = submissions.filter(submission => submission.studentId == student._id);
              studentGrades.push(specSubmission.grade);
            });
            avgGrade = studentGrades.reduce((sum, next) => sum + next) / studentGrades.length;
            studentAverages.push(avgGrade);
        });

        res.status(200).send(studentAverages);

    } catch (err) {
        res.status(500).json(err);
    }
});

//get a students course grade
professorRouter.route("/:professorId/courses/:courseId/grades/:studentId")
.get(async (req, res) => {
  var studentGrades = [];
  const courseId = req.params.courseId;
  const studentId = req.params.studentId;
  try {
      const course = Course.findById(courseId);
      const assignments = course.assignments;
      assignments.forEach((assignment, index) => {
        const submissions = assignment.submission;
        const specSubmission = submissions.filter(submission => submission.studentId == studentId);
        studentGrades.push(specSubmission.grade);
      });
      avgGrade = studentGrades.reduce((sum, next) => sum + next) / studentGrades.length;

      res.status(200).send(avgGrade);

  } catch (err) {
      res.status(500).json(err);
  }
});

//get all submissions for an assignment
professorRouter.route("/:professorId/courses/:courseId/assignments/:assignmentId/submissions")
.get(async (req, res) => {
    const assignmentId = req.params.assignmentId;
    try {
        const assignment = Assignment.findById(assignmentId);
        assignment.submission.forEach((submission, index) => {
            res.status(200).send(submission);
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

//get specific submission
professorRouter.route("/:professorId/courses/:courseId/assignments/:assignmentId/submissions/:studentId")
.get(async (req, res) => {
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

//update feedback on submission
professorRouter.route("/:professorId/courses/:courseId/assignments/:assignmentId/submissions/:studentId/feedback")
.put(async (req, res) => {
    const assignmentId = req.params.assignmentId;
    const studentId = req.params.studentId;
    try {
        const assignment = Assignment.findById(assignmentId);

        submission.findByIdAndUpdate(studentId, 
            {feedback: feedback}).then((course) => {
                res.status(200).json(course);
            });

    } catch (err) {
        res.status(500).json(err);
    }
});


// Get User by UserId
professorRouter.get("/get-user/:studentId", async (req, res) => {
    try {
        const studentId = req.params.studentId;
        Student.findById(studentId).then((student) => {
            res.status(200).send(student);
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = professorRouter;