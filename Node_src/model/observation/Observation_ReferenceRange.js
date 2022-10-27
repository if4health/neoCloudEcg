const mongoose = require('mongoose');
const Quantity = require('./Quantity');
const CodeableConcept = require('./CodeableConcept');
const Range = require('./Range');
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
    type: {
      type: CodeableConcept,
      default: void 0,
    },
    appliesTo: {
      type: [CodeableConcept],
      default: void 0,
    },
    age: {
      type: Range,
      default: void 0,
    },
  },
  {
    _id: false,
  }
);
