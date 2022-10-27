const mongoose = require('mongoose');
const CodeableConcept = require('./CodeableConcept');
const Quantity = require('./Quantity');
const Range = require('./Range');
const Ratio = require('./Ratio');
const SampledData = require('./SampledData');
const Period = require('./Period');
const Observation_ReferenceRange = require('./Observation_ReferenceRange');
module.exports = new mongoose.Schema(
  {
    code: {
      type: CodeableConcept,
      default: void 0,
    },
    valueQuantity: {
      type: Quantity,
      default: void 0,
    },
    valueCodeableConcept: {
      type: CodeableConcept,
      default: void 0,
    },
    valueString: {
      type: String,
      default: void 0,
    },
    valueBoolean: {
      type: Boolean,
      default: void 0,
    },
    valueInteger: {
      type: Number,
      default: void 0,
    },
    valueRange: {
      type: Range,
      default: void 0,
    },
    valueRatio: {
      type: Ratio,
      default: void 0,
    },
    valueSampledData: {
      type: SampledData,
      default: void 0,
    },
    valueTime: {
      type: String,
      default: void 0,
    },
    valueDateTime: {
      type: String,
      default: void 0,
    },
    valuePeriod: {
      type: Period,
      default: void 0,
    },
    dataAbsentReason: {
      type: CodeableConcept,
      default: void 0,
    },
    interpretation: {
      type: [CodeableConcept],
      default: void 0,
    },
    referenceRange: {
      type: [Observation_ReferenceRange],
      default: void 0,
    },
  },
  {
    _id: false,
  }
);
