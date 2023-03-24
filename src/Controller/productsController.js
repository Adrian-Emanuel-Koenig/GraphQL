const { saveProduct, getProduct } = require("../Service/productsService");
const logger = require("../logs/logger.js");

const saveController = async (req, res) => {
  try {
    await saveProduct(req.body);
    res.status(201).json({
      status: true,
      message: "Product successfully saved",
    });
  } catch (error) {
    logger.error(error, `${error}`);
  }
};

const readController = async (req, res) => {
  try {
    const products = await getProduct();
    res.json({
      status: true,
      data: products,
    });
  } catch (error) {
    logger.error(error, `${error}`);
  }
};

module.exports = { saveController, readController };
