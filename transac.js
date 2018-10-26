const bodyParser = require('body-parser')
var fs = require('fs');
var express = require("express")
const mongoose = require('mongoose');
const URI = "mongodb://teamscad:!teamscad2018@scad-shard-00-00-nayx1.mongodb.net:27017,scad-shard-00-01-nayx1.mongodb.net:27017,scad-shard-00-02-nayx1.mongodb.net:27017/test?replicaSet=scad-shard-0&ssl=true";

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect(URI, { useMongoClient: true });

app.post("/transactions", function (req, res) {

  if (req.body.action == "Ajout") {
    var read_string = fs.readFile('test.txt', 'utf-8', function (err, data) {
      if (err) {
        return console.error(err);
      }
      console.log(data);
      fs.writeFile('test.txt', data + "\n [AJOUT] " + req.body.name, function (err, data) {
        if (err) {
          return console.error(err);
        }
        console.log('file is written asynchronously');
      })
    })
    res.send("Sucess")
  }
  else if (req.body.action == "Delete") {
    var read_string = fs.readFile('test.txt', 'utf-8', function (err, data) {
      if (err) {
        return console.error(err);
      }
      console.log(data);
      fs.writeFile('test.txt', data + "\n [DELETE] " + req.body.name, function (err, data) {
        if (err) {
          return console.error(err);
        }
        console.log('file is written asynchronously');
      })
    })
    res.send("Sucess")
  }
  else {
    res.send("erreur")
  }
})


app.listen(3000, () => {
  console.log("En attente de requêtes...")
})


