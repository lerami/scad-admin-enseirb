// Import dependencies
const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');

// Import routes
var transactions = require('./routes/transactions');

// Setting config
require('dotenv').config()

// Create the app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use routes
app.use('/transactions',transactions);

// Connect to the DB
mongoose.connect(process.env.DATABASE, { useMongoClient: true });


app.listen(3000, () => {
  console.log("En attente de requêtes...")
});


