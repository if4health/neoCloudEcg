const router = require('express').Router();
const ObservationController = require('../controller/ObservationController');

router.post('/', ObservationController.createObeservation);

router.get('/:id', ObservationController.getObservationById);

router.get('/', ObservationController.getObservation);

router.patch('/:id', ObservationController.patchComponent);

router.put('/:id', ObservationController.updateObservation);

router.delete('/:id', ObservationController.deleteObservation);

module.exports = router;
