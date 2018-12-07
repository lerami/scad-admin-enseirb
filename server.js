// Import dependencies
const express = require("express");
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var database = process.env.DATABASE || "mongodb://localhost:27017/test";

const User = require('./models/User');

// Import routes
const transactions = require('./routes/transactions');
const drive = require('./routes/drive');
const auth = require('./routes/auth');

// Setting config
require('dotenv').config()

// Create the app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use routes
app.use('/transactions', transactions);
app.use('/drive', drive);
app.use('/auth', auth);

// Connect to the DB
mongoose.connect(database, { useMongoClient: true });


app.listen(port, () => {
  console.log("En attente de requêtes...")
});


