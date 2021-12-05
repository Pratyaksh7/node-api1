const mongoose = require('mongoose');

const registerUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password1: {
        type: String,
        required: true
    },
    password2: {
        type: String,
        required: true
    }
})

const Register = new mongoose.model("Register",registerUserSchema);

module.exports = Register;