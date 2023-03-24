const email = require("../Service/notification/emails.js");
const whatsapp = require("../Service/notification/whatsapp.js");
let cartItems = [];

const home = (req, res) => {
  if (req.session?.username) {
    res.render("home", { username: req.session?.username });
  } else {
    res.redirect("/login");
  }
};

const info = (req, res) => {
  res.json({
    "Nombre de la plataforma": process.platform,
    "Argumentos de entrada": process.argv,
    "Carpeta del proyecto": process.execPath,
    "Process id": process.pid,
    "Path de ejecución": process.cwd(),
    "Memoria total reservada": process.memoryUsage().rss,
    "Versión de node.js": process.version,
  });
};

const addToCart = (req, res) => {
  const { name, stock, price } = req.body;
  const product = {
    name,
    stock,
    price: parseFloat(price),
    quantity: 1,
  };
  console.log(product);
  const existingProductIndex = cartItems.findIndex(
    (item) => item.name === product.name
  );
  if (existingProductIndex !== -1) {
    cartItems[existingProductIndex].quantity++;
  } else {
    cartItems.push(product);
  }
  res.redirect("/");
};

const getCart = (req, res) => {
  console.log(cartItems);
  const total = cartItems.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  );
  res.render("cart", { cartItems, total });
};

const postCart = (req, res) => {
  const total = req.body.total;
  whatsapp(
    "Orden realizada, total a pagar: $" +
      total +
      ".Productos: " +
      JSON.stringify(cartItems)
  );
  email(
    "nuevo pedido de",
    JSON.stringify(cartItems) + "Total a pagar: " + total
  );
  res.redirect("/");
};

const clearCart = (req, res) => {
  cartItems = [];
  res.redirect("/");
};

const sessionName = (req, res) => {
  res.json(req.session.username);
};
module.exports = {
  home,
  info,
  addToCart,
  cartItems,
  getCart,
  postCart,
  clearCart,
  sessionName,
};
