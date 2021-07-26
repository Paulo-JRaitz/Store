const Product = require('../models/product');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs')

module.exports = {
  async index(request, response) {
    const products = await Product.find().sort('-createdAt');
    return response.json({ products })
  },
  async store(request, response) {
    const { name, city, storage, description, price, likes } = request.body;
    const { filename: image } = request.file;

    await sharp(request.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(request.file.destination, 'resized', image));
    fs.unlinkSync(request.file.path);
    const storeProduct = await Product.create(
      {
        name,
        city,
        storage,
        description,
        price,
        image,
        likes
      });
    return response.json({ storeProduct })
  }
}