const pool = require("../db/db");

async function testConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO users (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *",
      ["Test", "User", "test@example.com"]
    );
    console.log("Insert successful:", result.rows[0]);
    client.release();
  } catch (err) {
    console.error("Error:", err.message);
    console.log("Environment variables:", {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      // Don't log the password!
    });
  }
}

testConnection();
