const mongoose = require('mongoose');

// connection //
    mongoose.connect(process.env.DB_KEY ,{ useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false });

module.exports = mongoose;