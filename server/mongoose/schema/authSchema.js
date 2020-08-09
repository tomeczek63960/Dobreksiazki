const mongoose = require('../index');

const loginSchema = mongoose.Schema({
    
    email: String,
    password: String,
    confirmPassword: String

},{collection: "users"});

exports.loginSchema = loginSchema;