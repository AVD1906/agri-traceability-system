const pool = require('../config/db');

const addCertification = async (cert) => {
  const { cert_id, batch_id, issued_by, issue_date, status } = cert;

  const [result] = await pool.query(
    `INSERT INTO Certifications (cert_id, batch_id, issued_by, issue_date, status)
     VALUES (?, ?, ?, ?, ?)`,
    [cert_id, batch_id, issued_by, issue_date, status]
  );

  return result;
};

const getCertificationsByBatch = async (batchId) => {
  const [rows] = await pool.query(
    `SELECT * FROM Certifications WHERE batch_id = ?`,
    [batchId]
  );
  return rows;
};

module.exports = {
  addCertification,
  getCertificationsByBatch,
};