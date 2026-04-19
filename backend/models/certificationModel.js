const pool = require('../config/db');

// ================= ADD =================
const addCertification = async (cert) => {
  const { batch_id, name } = cert;

  const [result] = await pool.query(
    `INSERT INTO Certifications (batch_id, issued_by, issue_date, status)
     VALUES (?, ?, CURDATE(), 'Valid')`,
    [
      batch_id,
      name // ✅ store name into issued_by
    ]
  );

  return result;
};

// ================= GET =================
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