const mongoose = require('mongoose');

const dollsSchema = new mongoose.Schema({
  dollName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  salePrice: {
    type: Number,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  buyerName: {
    type: String,
    required: true
  },
  sold: {
    type: Boolean,
    default: false
  },
  buyerName: String,
  salePrice: Number
});

const Dolls = mongoose.model("Dolls", dollsSchema);

module.exports = Dolls;
