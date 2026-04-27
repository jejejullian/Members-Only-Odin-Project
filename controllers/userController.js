const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const signUpGet = (req, res) => res.render("sign-up");

const signUpPost = async (req, res, next) => {
  const { first_name, last_name, username, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return res.send("Error: Password dan Konfirmasi Password tidak cocok!");
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await userModel.createUser(first_name, last_name, username, hashedPassword);

    res.redirect("/");
  } catch (err) {
    err.customMessage = "Gagal mendaftar";
    next(err);
  }
};

const logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};

const joinClubPost = async (req, res, next) => {
  const { passcode } = req.body;
  const SECRET_CODE = "memberLohYa";

  try {
    if (passcode === SECRET_CODE) {
      await userModel.updateToMember(req.user.id);
      res.redirect("/");
    } else {
      res.send("Kode salah! Anda tetap rakyat jelata.");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signUpGet,
  signUpPost,
  logOut,
  joinClubPost,
};
