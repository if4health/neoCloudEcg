const mongoose = require('mongoose');
const Quantity = require('./Quantity');
module.exports = new mongoose.Schema(
  {
    origin: {
      type: Quantity,
      default: void 0,
    },
    period: {
      type: Number,
      default: void 0,
    },
    factor: {
      type: Number,
      default: void 0,
    },
    lowerLimit: {
      type: Number,
      default: void 0,
    },
    upperLimit: {
      type: Number,
      default: void 0,
    },
    dimensions: {
      type: Number,
      default: void 0,
    },
    data: {
      type: String,
      default: void 0,
    },
  },
  {
    _id: false,
  }
);
