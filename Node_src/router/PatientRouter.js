const router = require('express').Router();
const PatientController = require('../controller/PatientController');

router.post('/', PatientController.createPatient);

router.get('/:id', PatientController.getPatientById);

router.delete('/:id', PatientController.deletePatient);

router.put('/:id', PatientController.updatePatient);

module.exports = router;
