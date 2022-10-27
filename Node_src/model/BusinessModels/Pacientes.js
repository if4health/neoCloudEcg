const mongoose = require('mongoose');

module.exports = function () {
  const Paciente = {
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
  const PacienteSchema = new mongoose.Schema(Paciente);

  const PacienteModel = mongoose.model('Paciente', PacienteSchema);

  return PacienteModel;
};
