var express = require('express');
var router = express.Router();
const fs = require('fs');
const UserController = require('../controllers/UserController');

function getToken(req) {
    return req.headers['x-access-token'];
}

function isAdmin(req, res, next) {
    let token = getToken(req);
    UserController.getByToken(token, (err, user) => {
        if (err) return res.send(500).send(err);

        if (user && user.admin) {
            req.user = user;
            return next();
        }

        return res.status(401).send({
            message: 'You no admin , you refused fool!'
        })
    })
}

router.post('/uploadFile', function (req, res) {
    let id = req.params.id;

    if (!req.files) {
        return res.status(400).send('No files uploaded');
    }

    UserController.uploadFile(id, req.files, (err,user) => {
        if (err) return res.status(400).send(err);
        return res.send();
    })

})

router.get('/downloadFile', function (req, res) {

})

module.exports = router;