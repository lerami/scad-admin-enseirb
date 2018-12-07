const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
var JWT_SECRET = process.env.JWT_SECRET || 'shhhhh';

/* 
Define User schema
 */

var User = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    
    admin: {
        type: Boolean,
        required: true,
        default: false
    },

    timestamp: {
        type: Number,
        required: true,
        default: Date.now(),
      },
    
      lastUpdated: {
        type: Number,
        default: Date.now(),
    }
})

/*
 User methods 
 */

User.methods.generateAuthToken = function(){
    return jwt.sign(this.id, JWT_SECRET);
  };

User.methods.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

/*
Static methods
 */

User.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

User.statics.findOneByEmail = function(email){
    return this.findOne({
      email: new RegExp('^' + email + '$', 'i')
    });
  };

User.statics.getByToken = function(token, callback){
    jwt.verify(token, JWT_SECRET, function(err, id){
      if (err) {
        return callback(err);
      }
      this.findOne({_id: id}, callback);
    }.bind(this));
  };
  


module.exports = mongoose.model('User', User);