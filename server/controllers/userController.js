const pool = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const signupQuery = await pool.query(
      "INSERT INTO users (username, password) VALUES($1, $2)",
      [username, hashedPassword]
    );
    res.json(signupQuery);
  } catch (err) {
    console.error(err.message);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Fetch user from the database
    const loginQuery = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (loginQuery.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = loginQuery.rows[0];

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the response with the user data
    res.status(200).json({
      message: "Login successful",
      token, // Include the token
      user_id: user.user_id, // Include the user ID
      username: user.username, // Include the username
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { login, signup };
