const PacientesDatabase = require('../model/BusinessModels/Pacientes')();

class PacientesService {
  async create(Paciente) {
    try {
      if (!Paciente.cpf) {
        return {
          code: 400,
          message: 'Campo CPF Obrigatório!',
        };
      }

      const find = await PacientesDatabase.find({
        cpf: Paciente.cpf,
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
      Paciente.senha = randomPassword;
      const result = await PacientesDatabase.create(Paciente);
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
      const result = await PacientesDatabase.find(query);
      return result;
    } catch (e) {
      return e;
    }
  }

  async findOne() {
    try {
      const result = await PacientesDatabase.findOne();
      return result;
    } catch (e) {
      return e;
    }
  }

  async findById(id) {
    try {
      const result = await PacientesDatabase.findOne({
        id,
      });
      return result;
    } catch (e) {
      return e;
    }
  }
  async remove(id) {
    try {
      const result = await PacientesDatabase.deleteOne(id);
      return result;
    } catch (e) {
      return e;
    }
  }
}

module.exports = new PacientesService();
