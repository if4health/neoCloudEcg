const mongoose = require('mongoose');

module.exports = function () {
  const Dispositivos = {
    id: {
      type: String,
      unique: true,
      index: true,
    },
    name: {
      type: String,
    },
    client_id: {
      type: String,
      required: true,
    },
    client_secret: {
      type: String,
      required: true,
    },
  };
  const DispositivosSchema = new mongoose.Schema(Dispositivos);

  const DispositivosModel = mongoose.model('Dispositivos', DispositivosSchema);

  return DispositivosModel;
};
