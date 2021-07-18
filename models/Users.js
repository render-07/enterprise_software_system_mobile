const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const UsersSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },
    
    dateOfBirth:{
        type: Date,
        required: true
    },

    dateAdded:{
        type: Date,
        default: Date.now
    }
});

module.exports = Users = mongoose.model('users', UsersSchema);