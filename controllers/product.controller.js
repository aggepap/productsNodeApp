const Product = require("../models/product.model");

exports.findAll = async (req, res) => {
  console.log("Find All products");

  try {
    const result = await Product.find({});
    res.json({ status: true, data: result });
  } catch (err) {
    res.json({ status: false, data: err });
  }
};

exports.findOne = async (req, res) => {
  const productID = req.params.id;
  console.log(`Find the product with id : ${productID} `);

  try {
    const results = await Product.findOne({ _id: `${productID}` });
    console.log(results);

    res.json({ status: true, data: results });
  } catch (err) {
    res.json({ status: false, data: err });
  }
};

exports.create = async (req, res) => {
  const product = new Product({
    product: req.body.product,
    cost: req.body.cost,
    description: req.body.description,
    quantity: req.body.quantity,
  });

  console.log(`insert Product: ${product.product}`);

  try {
    const results = await product.save();
    res.json({ status: true, data: results });
  } catch (err) {
    res.json({ status: false, data: err });
  }
};

exports.update = async (req, res) => {
  const productID = req.params.id;
  console.log(`update product with id ${productID}`);
  const updateProduct = {
    product: req.body.product,
    cost: req.body.cost,
    description: req.body.description,
    quantity: req.body.quantity,
  };

  try {
    const result = await Product.findOneAndUpdate(
      { _id: productID },
      updateProduct,
      { returnDocument: "after" }
    );
    res.json({ status: true, data: result });
  } catch (err) {
    res.json({ status: false, data: err });
  }
};

exports.delete = async (req, res) => {
  const productID = req.params.id;
  console.log(`Delete product ${productID}`);

  try {
    const result = await Product.findOneAndDelete({ _id: productID });
    res.json({ status: true, data: result });
  } catch (err) {
    res.json({ status: false, data: err });
  }
};
