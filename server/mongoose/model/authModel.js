const mongoose = require('../index');
const { loginSchema } = require('../schema/authSchema');

exports.loginModel = mongoose.model("login",loginSchema);