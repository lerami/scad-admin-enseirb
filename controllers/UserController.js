const User = require('../models/User');
const validator = require('validator');

var UserController = {};

UserController.loginWithToken = function (token, callback) {
    User.getByToken(token, function (err, user) {
        return callback(err, token, user);
    });
};

UserController.loginWithPassword = function (email, password, callback) {

    if (!password || password.length === 0) {
        return callback({
            message: 'Please enter a password'
        });
    }

    if (!validator.isEmail(email)) {
        return callback({
            message: 'Invalid email'
        });
    }

    User
        .findOneByEmail(email)
        .select('+password')
        .exec(function (err, user) {
            if (err) {
                return callback(err);
            }
            if (!user) {
                return callback({
                    message: "We couldn't find you!"
                });
            }
            if (!user.checkPassword(password)) {
                return callback({
                    message: "That's not the right password."
                });
            }

            // yo dope nice login here's a token for your troubles
            var token = user.generateAuthToken();

            var u = user.toJSON();

            delete u.password;

            return callback(null, token, u);
        });
};