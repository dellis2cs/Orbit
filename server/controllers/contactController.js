const pool = require("../db/db");

getAllContacts = async (req, res) => {
  try {
    const { sortField = "first_name", sortOrder = "DESC" } = req.query;

    //whitelist of allowed cols to prevent SQL injection
    const allowedColumns = ["first_name", "last_name", "email"];
    const orderBy = allowedColumns.includes(sortField)
      ? sortField
      : "first_name";

    // Validate sort order
    const validOrder = sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";
    const query = {
      text: `SELECT * FROM users ORDER BY ${orderBy} ${validOrder} LIMIT 10`,
      values: [],
    };
    const allContacts = await pool.query(query);
    res.json(allContacts.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllContacts,
};
