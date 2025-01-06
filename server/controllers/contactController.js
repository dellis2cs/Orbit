const pool = require("../db/db");

getAllContacts = async (req, res) => {
  try {
    const {
      sortField = "first_name",
      sortOrder = "ASC",
      currentPage = "",
    } = req.query;

    //whitelist of allowed cols to prevent SQL injection
    const allowedColumns = ["first_name", "last_name", "email"];
    const orderBy = allowedColumns.includes(sortField)
      ? sortField
      : "first_name";

    // Validate sort order
    const validOrder = sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";
    const query = {
      text: `SELECT * FROM user_data ORDER BY ${orderBy} ${validOrder} LIMIT 10 OFFSET ${currentPage} ROWS`,
      values: [],
    };
    const allContacts = await pool.query(query);
    res.json(allContacts.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

getTotalContacts = async (req, res) => {
  try {
    const totalContacts = await pool.query("SELECT COUNT(*) FROM user_data");
    res.json(totalContacts);
  } catch (err) {
    console.error(err.message);
  }
};

createContact = async (req, res) => {
  try {
    const { userId, first_name, last_name, email } = req.body;
    const newContact = await pool.query(
      "INSERT INTO user_data (first_name, last_name, email, user_id) VALUES ($1, $2, $3, $4)",
      [first_name, last_name, email, userId]
    );
    res.json(newContact);
  } catch (err) {
    console.error(err.message);
  }
};

deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteQuery = pool.query(
      `DELETE FROM user_data WHERE contact_id = ${id}`
    );
    res.status(200).json({ success: true, message: "Contact deleted" });
  } catch (err) {
    console.error(err.message);
  }
};

getContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await pool.query(
      "SELECT * FROM user_data WHERE contact_id = $1",
      [id]
    );
    res.json(contact.rows);
  } catch (err) {
    err.message;
  }
};

updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email } = req.body;
    const updateContact = await pool.query(
      "UPDATE user_data SET first_name = $1, last_name = $2, email = $3 WHERE contact_id = $4",
      [first_name, last_name, email, id]
    );
    res.json(updateContact);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  getAllContacts,
  getTotalContacts,
  updateContact,
  getContact,
  createContact,
  deleteContact,
};
