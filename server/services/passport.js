const passport = require('passport');
const User = require ('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


// setup options for jwt strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
}

// create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){ 
    // payload = decoded jwt token (id(sub) + timestamp)

    // See if the user id and payload exist in db, 
    // if does, call 'done'. Otherwise call 'done' without user object
    User.findById(payload.sub, function(err, user) {
        if(err) { return done(err, false); }

        if(user) {
            done(null, user);
        } else {
            done(null, false);
        }
    })

})

// tell passport to use this strategy
passport.use(jwtLogin);