const PatientSchema = require('../model/patient/Patient');
const PractitionerSchema = require('../model/practitioner/Practitioner');

class PatientService {
  async createPatient(patient) {
    const result = await PatientSchema.create(patient);
    return result;
  }

  async findOne(query) {
    return await PatientSchema.findOne(query);
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

  async getPatientById(id) {
    const result = await PatientSchema.findById(id).exec();
    return result;
  }

  async update(id, patient) {
    const updated = await PatientSchema.findByIdAndUpdate(
      { _id: id },
      patient
    ).exec();
    return updated;
  }

  async delete(id) {
    const deleted = await PatientSchema.findByIdAndDelete(id).exec();
    return deleted;
  }
}

module.exports = new PatientService();
