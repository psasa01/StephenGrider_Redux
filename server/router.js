const authenticationController = require('./controllers/authenticationController');
const passportService = require('./services/passport');
const passport = require('passport');

const errorHandler = (fn) => (req, res, next) => fn(req, res, next).catch(next);
// export the function, import it into index.js, pass app into function :)

// passport middleware, interceptor
// since using tokens we don't want session to be created
const requireAuth = passport.authenticate('jwt', { session: false })

module.exports = (app) => {
    app.post('/signup', errorHandler(authenticationController.signup));
    app.get('/', requireAuth, (req, res) => {
        res.send({ hi: 'there!'})
    })
}; 