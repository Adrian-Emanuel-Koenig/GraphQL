const { Router } = require("express");
const {
  saveController,
  readController,
} = require("../Controller/productsController.js");
const testProductos = new Router();

testProductos.get("/api/productos", readController);
testProductos.post("/api/productos", saveController);
// testProductos.update("/api/productos", )
// testProductos.delete("/api/productos",)

module.exports = testProductos;
