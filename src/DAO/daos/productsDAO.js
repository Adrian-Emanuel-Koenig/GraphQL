const { config } = require("dotenv").config();
const MemoryCrud = require("../../Service/container/memory");
const MongoCrud = require("../../Service/container/mongodb");
const prodSchema = require("../models/products.js");

let ProductsDAO;
let mode = process.env.DB;

if (mode == "mongo") {
  console.log("DB: mongo");
  class ProdDaosModel extends MongoCrud {
    constructor() {
      super(prodSchema);
    }
  }
  ProductsDAO = new ProdDaosModel();
}

if (mode == "memory") {
  console.log("DB: memory");
  class ProdDaosModel extends MemoryCrud {
    constructor() {
      super(prodSchema);
    }
  }
  ProductsDAO = new ProdDaosModel();
}

if (!mode) {
  throw new Error("No database Selected");
}

module.exports = ProductsDAO;
