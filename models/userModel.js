const { use } = require("passport");
const pool = require("../db/pool");

async function createUser(first_name, last_name, username, password) {
  await pool.query("INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)", [first_name, last_name, username, password]);
}

async function getUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  return rows[0];
}

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}

async function updateToMember(userId) {
  await pool.query("UPDATE users SET role = 'member' WHERE id = $1", [userId]);
}

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  updateToMember,
};
