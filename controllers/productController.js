const { products, Product } = require('../models/ProductModel');

// Add Product
exports.addProduct = (req, res) => {
  const { id, name, price } = req.body;
  const product = new Product(id, name, price);
  products.push(product);
  res.status(201).json(product);
};
