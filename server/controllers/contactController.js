const pool = require("../db/db");

getAllContacts = async (req, res) => {
  try {
    const allContacts = await pool.query("SELECT * FROM users LIMIT 10");
    res.json(allContacts.rows);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getAllContacts,
};
