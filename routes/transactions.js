var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// home page
router.post('/', function (req, res) {

    if (req.body.action == 'Ajout') {
      var read_string = fs.readFile('test.txt', 'utf-8', function (err, data) {
        if (err) {
          return console.error(err);
        }
        console.log(data);
        fs.writeFile('test.txt', data + '\n [AJOUT] ' + req.body.name, function (err, data) {
          if (err) {
            return console.error(err);
          }
          console.log('file is written asynchronously');
        })
      })
      res.send('Success')
    }
    else if (req.body.action == 'Delete') {
      var read_string = fs.readFile('test.txt', 'utf-8', function (err, data) {
        if (err) {
          return console.error(err);
        }
        console.log(data);
        fs.writeFile('test.txt', data + '\n [DELETE] ' + req.body.name, function (err, data) {
          if (err) {
            return console.error(err);
          }
          console.log('file is written asynchronously');
        })
      })
      res.send('Success')
    }
    else {
      res.send('error')
    }
  })

module.exports = router;