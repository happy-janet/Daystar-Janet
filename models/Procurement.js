const mongoose = require('mongoose');

const procurementSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  supplier: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Procurement', procurementSchema);
