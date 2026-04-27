const pool = require("../db/pool");

async function createMessage(title, text, user_id) {
  await pool.query("INSERT INTO messages (title, text, user_id) VALUES ($1, $2, $3)", [title, text, user_id]);
}

async function getAllMessage() {
  const { rows } = await pool.query(`
    SELECT messages.*, users.first_name, users.username 
    FROM messages 
    JOIN users ON messages.user_id = users.id 
    ORDER BY added_at DESC
  `);
  return rows;
}
module.exports = {
  createMessage,
  getAllMessage,
};
