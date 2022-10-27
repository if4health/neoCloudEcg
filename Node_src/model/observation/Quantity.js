const mongoose = require('mongoose');
module.exports = new mongoose.Schema(
  {
    value: {
      type: Number,
      default: void 0,
    },
    comparator: {
      type: String,
      default: void 0,
    },
    unit: {
      type: String,
      default: void 0,
    },
    system: {
      type: String,
      default: void 0,
    },
    code: {
      type: String,
      default: void 0,
    },
  },
  {
    _id: false,
  }
);
