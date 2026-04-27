const db = require("../models/messageModel");

async function newMessageGet(req, res) {
  res.render("new-message");
}

async function newMessagePost(req, res) {
  const { title, text } = req.body;
  const userId = req.user.id;

  try {
    await db.createMessage(title, text, userId);

    res.redirect("/");
  } catch (err) {
    res.send("Gagal PPPPOOOSSSTTT bosss!");
  }
}

module.exports = {
  newMessageGet,
  newMessagePost,
};
