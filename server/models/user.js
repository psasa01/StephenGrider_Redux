const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define model
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: {
        type: String
    }
});

// create the model class
const modelClass = mongoose.model('User', userSchema);

// export the model
module.exports = modelClass;