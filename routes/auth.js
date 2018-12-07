var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController');


/**
 * Login with an email or token
 * body {
 *  email,
 *  password,
 *  token
 * }
 */
router.post('/login', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var token = req.body.token;

    if (token) {
        UserController.loginWithToken(token,
            function (err, token, user) {
                if (err || !user) {
                    return res.status(400).send(err);
                }
                return res.json({
                    token: token,
                    user: user
                });
            });
    } else {
        UserController.loginWithPassword(email, password,
            function (err, token, user) {
                if (err || !user) {
                    return res.status(400).send(err);
                }
                return res.json({
                    token: token,
                    user: user
                });
            });
    }
});

/**
 * Register with email and password
 * body {
 *  email,
 *  password
 * }
 */
router.post('/register', function (req, res, next) {
    // Register with an email and password
    var email = req.body.email;
    var password = req.body.password;

    UserController.createUser(email, password,
        function (err, user) {
            if (err) {
                return res.status(400).send(err);
            }
            return res.json(user);
        });
});


module.exports = router;