const express = require('express');
const router = express.Router();
const User = require('../models/user'); // redunant
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');


router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login) 
    // passport provides a middleware to autenticate (local/google/twitter) login. failureFlash: true (this flashes a message which is true or not)
    // at this point, passport sets the users authentication (i.e on the session)


router.get('/logout', users.logout)

module.exports = router; 