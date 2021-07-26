const Product = require('../models/product');

module.exports = {
  async store(request, response) {

    const product = await Product.findById(request.params.id);
    product.likes += 1;
    await product.save()
    return response.json({ product })
  }
}