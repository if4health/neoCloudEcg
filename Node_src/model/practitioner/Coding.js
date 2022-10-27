const mongoose = require('mongoose');
module.exports = new mongoose.Schema(
  {
    system: {
      type: String,
      default: void 0,
    },
    version: {
      type: String,
      default: void 0,
    },
    code: {
      type: String,
      default: void 0,
    },
    display: {
      type: String,
      default: void 0,
    },
    userSelected: {
      type: Boolean,
      default: void 0,
    },
  },
  {
    _id: false,
  }
);
