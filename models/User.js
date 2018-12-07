const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
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
    return jwt.sign(this._id, JWT_SECRET);
  };

User.methods.checkPassword = function(password) {
    
}

/*
Static methods
 */

User.statics.getByToken = function(token, callback){
    jwt.verify(token, JWT_SECRET, function(err, id){
      if (err) {
        return callback(err);
      }
      this.findOne({_id: id}, callback);
    }.bind(this));
  };
  


//module.exports = mongoose.model('User', User);