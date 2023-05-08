const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    course: {type: [mongoose.Schema.Types.ObjectId], required: false},
    isProfessor:{type: Boolean, required: true},
    isAdmin:{type: Boolean, required: true},
});

userSchema.plugin(passportLocalMongoose, {usernameField: "email"});

module.exports = mongoose.model("user", userSchema);