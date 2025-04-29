const Product = require('../models/Product');
const Cart = require('../models/cart');
const store = require('../store/products');

module.exports = {
  addProductToCart: (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).send('Product name is required');
      }

      const product = store.getByName(name);
      if (!product) {
        return res.status(404).send('Product not found');
      }

      Cart.add(name);
      res.redirect('/products/new');
    } catch (err) {
      res.status(500).send('Something went wrong');
    }
  },

  getProductsCount: (req, res) => {
    const count = Cart.getProductsQuantity();
    res.status(200).json({ count });
  }
};
