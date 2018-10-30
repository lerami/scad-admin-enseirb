// Import dependencies
const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');

// Setting config
require('dotenv').config()

// Create the app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to the DB
mongoose.connect(process.env.DATABASE, { useMongoClient: true });


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
});


