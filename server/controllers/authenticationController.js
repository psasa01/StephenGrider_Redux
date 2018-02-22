const jwt = require('jwt-simple');
const config = require('../config');

const tokenForUser = (user) => {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret); // sub = subject, iat = issuedAtTime
}

const User = require('../models/user');

exports.signup = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        return res.status(422).send({ error: 'You must provide email and password!'});
    }

    // check if a user exists
    const existingUser = await User.findOne({ email });


        // if a user exists, return an error
        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' })
        }

        // if a user doesn't exist, create and save new user
        const user = new User({ email, password });
        await user.save();

        // respond to request, user created
        res.json({ token: tokenForUser(user) });
            
};
    
