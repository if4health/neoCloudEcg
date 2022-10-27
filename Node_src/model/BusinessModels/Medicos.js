const mongoose = require('mongoose');

module.exports = function () {
  const Medico = {
    id: {
      type: String,
      unique: true,
      index: true,
    },
    cpf: {
      type: String,
      required: true,
    },
    senha: {
      type: String,
      required: true,
    },
  };
  const MedicosSchema = new mongoose.Schema(Medico);

  const MedicoModel = mongoose.model('Medico', MedicosSchema);

  return MedicoModel;
};
