const { Router } = require("express");
const routerProductos = new Router();
const routes = require("../Controller/productos.js");

routerProductos.get("/", routes.home);
routerProductos.post("/add-to-cart", routes.addToCart);
routerProductos.get("/cart", routes.getCart);
routerProductos.post("/comprar", routes.postCart);
routerProductos.post("/vaciar", routes.clearCart);
routerProductos.use("/api/nombre", routes.sessionName);
module.exports = routerProductos;
