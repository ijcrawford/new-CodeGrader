const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const professorSchema = new mongoose.Schema({
    email: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    course: {type: [mongoose.Schema.Types.ObjectId], required:true}
});

professorSchema.plugin(passportLocalMongoose, {usernameField: "email"});

module.exports = mongoose.model("Professor", professorSchema);