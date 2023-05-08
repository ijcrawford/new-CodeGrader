const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    name: {type: String, required: true},
    beginningDate: {type: Date, required: true},
    endingDate: {type: Date, required: true},
    assignedProfessor: {type: mongoose.Schema.Types.UUID, required: true},
    students: {type:[mongoose.Schema.Types.ObjectId], required: true},
    assignments: {type:[mongoose.Schema.Types.ObjectId], required: true}
});

module.exports = mongoose.model("Class", classSchema);