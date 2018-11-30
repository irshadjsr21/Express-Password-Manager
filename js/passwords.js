let mongoose = require('mongoose');

//password schema

let passwordSchema = mongoose.Schema({
    site:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    }

});

let Passwords = module.exports = mongoose.model('Passwords', passwordSchema);