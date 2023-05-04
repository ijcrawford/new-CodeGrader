const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseContent:{
        name: {type: String, required: true},
        beginningDate: {type: Date, required: true},
        endingDate: {type: Date, required: true},
        assignments: {type:[mongoose.Schema.Types.ObjectId], required: true}
    },   
    professorId: {type: mongoose.Schema.Types.ObjectId, required: true}, 
    studentIds: {type:[mongoose.Schema.Types.ObjectId], required: true},
});

module.exports = mongoose.model("Course", courseSchema);