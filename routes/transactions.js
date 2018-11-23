var express = require('express');
var router = express.Router();
const fs = require('fs');
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// home page

//ADD-POST
router.post('/', function (req, res) {
      var read_string = fs.readFile('test.txt', 'utf-8', function (err, data) {
        var reference =new Date(); 
        var year = reference.getFullYear(); 
        var month =reference.getMonth()+1; // date.getMonth retourne un entier entre 0 et 11 donc il faut ajouter 1
        var day = reference.getDate(); 
          if (err) {
            return console.error(err);
          }
          console.log(data);
          fs.writeFile('test.txt', data + '\n [AJOUT] ' + req.body.name +' at  ' + day +'/' + month + '/' + year +'-'+reference.getHours()+":"+reference.getMinutes()+":"+reference.getSeconds()+'\n', function (err, data) {
            if (err) {
              return console.error(err);
            }
          })
      })
      res.send('Success')
   
  })

//DELETE-delete
  router.delete('/', function (req, res) {
      var read_string = fs.readFile('test.txt', 'utf-8', function (err, data) {
        var reference =new Date(); 
        var year = reference.getFullYear(); 
        var month =reference.getMonth()+1; // date.getMonth retourne un entier entre 0 et 11 donc il faut ajouter 1
        var day = reference.getDate(); 
        if (err) {
          return console.error(err);
        }
        console.log(data);
        fs.writeFile('test.txt', data + '\n [DELETE] ' + req.body.name +' at  ' + day +'/' + month + '/' + year +'-'+reference.getHours()+":"+reference.getMinutes()+":"+reference.getSeconds()+'\n', function (err, data) {
          if (err) {
            return console.error(err);
          }
        })
      })
      res.send('Success')
    
  })

module.exports = router;