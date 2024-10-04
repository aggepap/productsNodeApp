const Product = require("../models/product.model");

findLastInsertedProduct = async () => {
  console.log("find last inserted product");

  try {
    const res = await Product.find({}).sort({ _id: -1 }).limit(1);
    return res[0];
  } catch (err) {
    console.log("could not return last inserted product");
  }
};
module.exports = { findLastInsertedProduct };
