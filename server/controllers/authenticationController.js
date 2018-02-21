const User = require('../models/user');

exports.signup = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    // check if a user exists
    User.findOne({ email }, (err, existingUser) => {


        if (err) { return next(err); }

        // if a user exists, return an error
        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' })
        }

        // if a user doesn't exist, create and save new user
        const user = new User({ email, password });
        user.save((err) => {
            if (err) { return next(err); }

            // respond to request, user created
            res.json({ success: true });
        });
    });
}