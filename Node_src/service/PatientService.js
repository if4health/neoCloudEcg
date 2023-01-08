const PatientSchema = require("../model/patient/Patient");
const PractitionerSchema = require('../model/practitioner/Practitioner');
const ObservationSchema = require("../model/observation/Observation");
const mongoose = require('mongoose');

class PatientService {

    async createPatient(patient) {
        const result = await PatientSchema.create(patient);
        return result;
    }

    async getPatientById(id) {
        const result = await this.findById(id);
        return result;
    }

    async findPatientByPractitioner(medico) {
      const practitioner = await PractitionerSchema.findOne({
        'identifier.value': medico,
        'identifier.system': 'own',
      });
      if (!practitioner) return [];
      const patients = await PatientSchema.find({
        'generalPractitioner.reference': `local/${practitioner.id}`,
      });
      const pacientes = patients.map((patient) => ({
        id: patient._id,
        name: `${patient.name[0].use} ${patient.name[0].family}`,
      }));
      return pacientes;
    }

    async findById(id) {
        if (mongoose.Types.ObjectId.isValid(id)) {
            const patient = await PatientSchema.findById(id).exec();
            if (!patient) {
                throw new HttpError('Patient not found!', 404);
            }
            return patient;
        } else {
            throw new HttpError('Patient not found!', 404);
        }
    }

    async update(id, patient) {
        const updated = await PatientSchema.findByIdAndUpdate({ _id: id }, patient).exec();
        return updated;
    }

    async delete(id) {
        const deleted = await PatientSchema.findByIdAndDelete(id).exec();
        return deleted;
    }
}

class HttpError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = new PatientService();