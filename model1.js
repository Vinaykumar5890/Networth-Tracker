const mongoose = require('mongoose');

const Customer= new mongoose.Schema({
  userid:{ type: String, required: true }, 
  name:    { type: String, required: true },
  phone:   { type: String, required: true, unique: true },
  trustScore: { type: Number, min: 0, max: 10},
  date:    { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', Customer);