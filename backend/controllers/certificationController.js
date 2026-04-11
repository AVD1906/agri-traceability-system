const certModel = require('../models/certificationModel');

// ADD
exports.addCertification = async (req, res) => {
  try {
    const result = await certModel.addCertification(req.body);

    res.status(201).json({
      message: 'Certification added',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET by batch
exports.getCertifications = async (req, res) => {
  try {
    const data = await certModel.getCertificationsByBatch(req.params.batchId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};