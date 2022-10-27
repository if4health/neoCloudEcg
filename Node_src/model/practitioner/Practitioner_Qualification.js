const mongoose = require('mongoose');
const Identifier = require('./Identifier');
const CodeableConcept = require('./CodeableConcept');
const Period = require('./Period');
const Reference = require('./Reference');
module.exports = new mongoose.Schema(
  {
    identifier: {
      type: [Identifier],
      default: void 0,
    },
    code: {
      type: CodeableConcept,
      default: void 0,
    },
    period: {
      type: Period,
      default: void 0,
    },
    issuer: {
      type: Reference,
      default: void 0,
    },
  },
  {
    _id: false,
  }
);
