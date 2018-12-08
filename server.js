// Import dependencies
const express = require("express");
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

// Import routes
var transactions = require('./routes/transactions');

// Setting config
require('dotenv').config()

// Create the app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})

// Use routes
app.use('/transactions',transactions);

// Connect to the DB
mongoose.connect(process.env.DATABASE, { useMongoClient: true });


app.listen(3000, () => {
  console.log("En attente de requêtes...")
});


