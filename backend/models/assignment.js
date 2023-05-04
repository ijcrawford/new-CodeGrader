
const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    assignmentContent: {
        title: {type: String, required: true},
        dueDate: {type: Date, required: true},
        testCase: {type: String, required: true},
    },
    submission:[{
        studentId: {type: mongoose.Schema.Types.UUID},
        testCaseOutput: {type: String, required: true},
        grade: {type: Number, required: true},
        feedback: {type: String, required: false}
    }]
});

module.exports = mongoose.model("assignment", assignmentSchema);