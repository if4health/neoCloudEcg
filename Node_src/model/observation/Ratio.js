const mongoose = require('mongoose');
const Quantity = require('./Quantity');
module.exports = new mongoose.Schema(
  {
    numerator: {
      type: Quantity,
      default: void 0,
    },
    denominator: {
      type: Quantity,
      default: void 0,
    },
  },
  {
    _id: false,
  }
);
