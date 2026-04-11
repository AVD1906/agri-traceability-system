const express = require('express');
const router = express.Router();
const certController = require('../controllers/certificationController');

router.post('/', certController.addCertification);
router.get('/:batchId', certController.getCertifications);

module.exports = router;