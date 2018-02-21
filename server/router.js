const authenticationController = require('./controllers/authenticationController');

// export the function, import it into index.js, pass app into function :)
module.exports = (app) => {
    app.post('/signup', authenticationController.signup);
}; 