const mongoose = require('mongoose');
const Quantity = require('./Quantity');
module.exports = new mongoose.Schema(
  {
    low: {
      type: Quantity,
      default: void 0,
    },
    high: {
      type: Quantity,
      default: void 0,
    },
  },
  {
    _id: false,
  }
);
