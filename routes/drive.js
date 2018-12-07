var express = require('express');
var router = express.Router();
const fs = require('fs');

router.post('/upload', function (req, res) {
    if(!req.files) {
        return res.status(400).send('No files uploaded');
    }
 
})

router.get('/download', function (req, res) {

})