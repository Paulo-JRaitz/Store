const { Schema, model } = require('mongoose');

module.exports = model('Product', Product = Schema({
  name: String,
  city: String,
  storage: String,
  description: String,
  price: Number,
  image: String,
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
}));