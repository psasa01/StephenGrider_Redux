const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    // verify email and password
    // call 'done' with the user if it is correct
    // otherwise, call 'done' with false
    User.findOne({ email }, (err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }

        // compare passwords - is 'password' = user.password?
        // we are never decrypting passwords - there is no such concept!!!
        user.comparePassword(password, (err, isMatched) => {
            if (err) { return done(err); }
            if (!isMatched) { return done(null, false); }

            return done(null, user);
        })
    })

})


// setup options for jwt strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
}

// create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    // payload = decoded jwt token (id(sub) + timestamp)

    // See if the user id and payload exist in db, 
    // if does, call 'done'. Otherwise call 'done' without user object
    User.findById(payload.sub, (err, user) => {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    })

})

// tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);