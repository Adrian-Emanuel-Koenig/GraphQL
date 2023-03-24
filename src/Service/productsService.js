const ProductsDAO = require("../DAO/daos/productsDAO");

const saveProduct = async (data) => {
  try {
    if (data.nombre && data.precio && data.stock && data.img) {
      await ProductsDAO.create(data);
    }
  } catch (error) {
    console.log(error);
  }
};

const getProduct = async (data) => {
  try {
    return await ProductsDAO.getAllProducts();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { saveProduct, getProduct };
