const User = require('../models/User');
const validator = require('validator');

var UserController = {};

/**
 * Login a user given a token
 * @param  {String}   token    auth token
 * @param  {Function} callback args(err, token, user)
 */
UserController.loginWithToken = function (token, callback) {
    User.getByToken(token, function (err, user) {
        return callback(err, token, user);
    });
};

/**
 * Login a user given an email and password.
 * @param  {String}   email    Email address
 * @param  {String}   password Password
 * @param  {Function} callback args(err, token, user)
 */
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
        .select('password')
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

/**
 * Create a new user given an email and a password.
 * @param  {String}   email    User's email.
 * @param  {String}   password [description]
 * @param  {Function} callback args(err, user)
 */
UserController.createUser = function (email, password, callback) {

    if (typeof email !== "string") {
        return callback({
            message: "Email must be a string."
        });
    }

    email = email.toLowerCase();

    // Check that there isn't a user with this email already.
    User
        .findOneByEmail(email)
        .exec(function (err, user) {

            if (err) {
                return callback(err);
            }

            if (user) {
                return callback({
                    message: 'An account for this email already exists.'
                });
            } else {

                // Make a new user
                var newUser = new User();
                newUser.email = email;
                newUser.password = User.generateHash(password);
                newUser.save(function (err) {
                    if (err) {
                        return callback(err);
                    } else {
                        // yay! success.
                        var token = newUser.generateAuthToken();

                        return callback(
                            null,
                            {
                                token: token,
                                user: newUser
                            }
                        );
                    }

                });

            }

        });
};

UserController.getByToken = function (token, callback) {
    User.getByToken(token, callback);
};

UserController.getById = function (id, callback) {
    User.findById(id, callback);
};

module.exports = UserController;