const pool = require("../db/db");
const { faker } = require("@faker-js/faker");

//Number of contacts per batch
const BATCH_SIZE = 10;
//Total number of contacts to insert
const TOTAL_CONTACTS = 100;

async function generateContacts(batchSize) {
  const contacts = [];
  for (let i = 0; i < batchSize; i++) {
    contacts.push([
      faker.person.firstName(),
      faker.person.lastName(),
      faker.internet.email(),
    ]);
  }
  return contacts;
}

async function insertContacts(contacts) {
  const client = await pool.connect();
  try {
    const query =
      "INSERT INTO users (first_name, last_name, email) VALUES ($1, $2, $3)";
    const promises = contacts.map(
      (contact) => client.query(query, contact) // Fixed: Passing contact array as parameters
    );

    await Promise.all(promises);
  } catch (err) {
    console.error(err.message);
  } finally {
    client.release();
  }
}

async function seedDatabase() {
  try {
    for (let i = 0; i < TOTAL_CONTACTS; i += BATCH_SIZE) {
      const batchSize = Math.min(BATCH_SIZE, TOTAL_CONTACTS - i);
      const contacts = await generateContacts(batchSize);
      await insertContacts(contacts);
    }
    console.log("Database seeding complete");
  } catch (err) {
    console.error(err.message);
  }
}
seedDatabase();
