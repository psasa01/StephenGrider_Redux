const authenticationController = require('./controllers/authenticationController');
const passportService = require('./services/passport');
const passport = require('passport');

const errorHandler = (fn) => (req, res, next) => fn(req, res, next).catch(next);
// export the function, import it into index.js, pass app into function :)

// passport middleware, interceptor
// since using tokens we don't want session to be created
const requireAuth = passport.authenticate('jwt', { session: false })

// before even see authentication.signin they must run throught local strategy!
// if email and password are not correct, they are knocked out of flow!!!
const requireSignin = passport.authenticate('local', { session: false })

module.exports = (app) => {
    app.get('/', requireAuth, (req, res) => {
        res.send({ hi: 'there!' })
    });
    app.post('/signin', requireSignin, authenticationController.signin)
    app.post('/signup', errorHandler(authenticationController.signup));

}; 