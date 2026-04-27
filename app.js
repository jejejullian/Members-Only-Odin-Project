const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const userModel = require("./models/userModel");
const messageModel = require('./models/messageModel')

const app = express();

const authRoutes = require("./routes/authUserRoutes");
const messageRoutes = require('./routes/messageRoutes')

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: "MembersJE1",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await userModel.getUserByUsername(username);

      if (!user) {
        return done(null, false, { message: "Username tidak ditemukan" });
      }
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: "Password salah" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", authRoutes);
app.use("/", messageRoutes);

app.get("/", async (req, res) => {
  try {
    const hasil_query = await messageModel.getAllMessage(); 
    
    res.render("index", {
      title: "Members Only",
      messages: hasil_query
    }); 
  } catch (err) {
    console.error(err);
    res.send("Gagal mengambil pesan");
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  const userMessage = err.customMessage || "Terjadi kesalahan sistem.";

  res.status(500).render("error-page", {
    message: userMessage,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server Members Only menyala di http://localhost:${PORT}`);
});
