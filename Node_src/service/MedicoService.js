const MedicosDatabase = require('../model/BusinessModels/Medicos')();

class MedicosService {
  async create(Medico) {
    try {
      if (!Medico.cpf) {
        return {
          code: 400,
          message: 'Campo CPF Obrigatório!',
        };
      }

      const find = await MedicosDatabase.find({
        cpf: Medico.cpf,
      });
      if (find.length > 0) {
        return {
          code: 400,
          message: 'Já existe!',
        };
      }

      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let randomPassword = '';
      for (let i = 0; i < 16; i++) {
        const randomNumber = Math.random() * 35;
        randomPassword += chars.split('')[randomNumber];
      }
      Medico.senha = randomPassword;
      const result = await MedicosDatabase.create(Medico);
      return {
        type: {
          text: 'Documento de Identificação',
        },
        value: result.id,
        system: 'ECGRemote',
      };
    } catch (e) {
      return e;
    }
  }

  async find(query) {
    try {
      const result = await MedicosDatabase.find(query);
      return result;
    } catch (e) {
      return e;
    }
  }

  async findOne() {
    try {
      const result = await MedicosDatabase.findOne();
      return result;
    } catch (e) {
      return e;
    }
  }

  async findById(id) {
    try {
      const result = await MedicosDatabase.findOne({
        id,
      });
      return result;
    } catch (e) {
      return e;
    }
  }
  async remove(id) {
    try {
      const result = await MedicosDatabase.deleteOne(id);
      return result;
    } catch (e) {
      return e;
    }
  }
}

module.exports = new MedicosService();
