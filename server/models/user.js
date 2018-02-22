const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

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

// on save encrypt password
// DO NOT USE ARROW FUNCTION!!!
userSchema.pre('save', function (next) {
    const user = this;

    // generate the salt then run callback
    bcrypt.genSalt(10, function (err, salt) {
        if (err) { return next(err); }

        // hash password using salt
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) { return next(err); }

            // overwrite plain text password
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatched) {
        if (err) { return callback(err); }

        callback(null, isMatched);
    });
}

// create the model class
const modelClass = mongoose.model('User', userSchema);

// export the model
module.exports = modelClass;