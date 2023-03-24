const { Router } = require("express");
const routerUsuarios = new Router();
const routes = require("../Controller/usuarios.js");

routerUsuarios.get("/", routes.home);
routerUsuarios.get("/login", routes.getLogin);
routerUsuarios.get("/signup", routes.getSignIn);
routerUsuarios.post("/login", routes.postLogin);
routerUsuarios.post("/signup", routes.postSignIn);
routerUsuarios.get("/failureLogin", routes.failureLogin);
routerUsuarios.get("/failureSignin", routes.failureSignin);
routerUsuarios.get("/logout", routes.renderizar, routes.logout);
module.exports = routerUsuarios