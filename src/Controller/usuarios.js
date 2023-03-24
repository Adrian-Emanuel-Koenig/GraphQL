const email = require("../Service/notification/emails.js");
const logger = require("../logs/logger.js");
const Usuarios = require("../DAO/models/users.js");
const whatsapp = require("../Service/notification/whatsapp.js");
const User = require("../DAO/daos/users.js");
let cartItems = [];

const home = (req, res) => {
  if (req.session?.username) {
    res.render("home", { username: req.session?.username });
  } else {
    res.redirect("/login");
  }
};

const getLogin = (req, res) => {
  res.render("login", { login: true });
};

const postLogin = (req, res) => {
  req.session.username = req.body.username;
  if (User.read(req.body.username)) {
    logger.log("info", req.session.username + " login");
    if (req.body.username == false) {
      res.render("login", { login: true })
    } else {
      res.redirect("/");
    }
  } else {
    res.render("login", { login: true });
  }
};

const renderizar = (req, res, next) => {
  res.render("logout");
  next();
};

const logout = (req, res) => {
  cartItems = [];
  const nombre = req.session.nombre;
  console.log(cartItems);
  setTimeout(() => {
    req.session.destroy((err) => {
      if (err) {
        logger.error("Error al desloguear");
      } else {
        logger.info(nombre + " deslogueado");
      }
    });
  }, 2000);
};

const getSignIn = (req, res) => {
  res.render("signup");
};

const postSignIn = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const avatar = req.body.avatar;
  const name = req.body.name;
  const surname = req.body.surname;
  const age = req.body.age;
  const address = req.body.address;
  const number = req.body.number;
  logger.info(username + " Registrado");
  /* ------------------------------ Sin Passport ------------------------------ */
  User.create({
    username,
    password,
    avatar,
    name,
    surname,
    age,
    address,
    number,
  });
  /* -------------------------------------------------------------------------- */
  email("nuevo registro", JSON.stringify(req.body));
  res.render("login", {
    username,
    password,
    avatar,
    name,
    surname,
    age,
    address,
    number,
  });
};

const failureLogin = (req, res) => {
  res.render("failureLogin");
};

const failureSignin = (req, res) => {
  res.render("failureSignin");
};

module.exports = {
  home,
  getLogin,
  postLogin,
  renderizar,
  logout,
  getSignIn,
  postSignIn,
  failureLogin,
  failureSignin,
};
