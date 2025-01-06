const pool = require("../db/db");

const login = async (req, res) => {
  try {
    const body = ({ username, password } = req.body);
    console.log("login initiated");
    const loginQuery = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );

    if (loginQuery.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const user = loginQuery.rows[0];
    return res.status(200).json({
      message: "Login successful",
      user_id: user.user_id,
      username: user.username,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Server error" });
  }
};

const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const signupQuery = await pool.query(
      "INSERT INTO users (username, password) VALUES($1, $2)",
      [username, password]
    );
    res.json(signupQuery);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { login, signup };
