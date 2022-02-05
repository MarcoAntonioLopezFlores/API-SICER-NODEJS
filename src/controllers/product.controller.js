const ProductService = require('../services/product.service');
const service = new ProductService();

class ProductController {
  async findOne(req, res) {
    const { id } = req.params;
    const product = await service.findOne(id);
    return res.send(product);
  }

  async find(req, res) {
    const products = await service.find(req.query);
    return res.send(products);
  }

  async findByProvider(req, res) {
    const { id } = req.params;
    const products = await service.findByProvider(req.query, id);
    return res.send(products);
  }

  async create(req, res) {
    const { body, file } = req;
    body.image = file ? file.filename : 'default.png';
    const productCreated = await service.create(body);
    return res.status(201).send(productCreated);
  }

  async update(req, res) {
    const { body } = req;
    const { id } = req.params;
    const updatedProduct = await service.update(id, body);
    return res.send(updatedProduct);
  }

  async delete(req, res) {
    const { id } = req.params;
    const deletedProduct = await service.delete(id);

    return res.send(deletedProduct);
  }
}

module.exports = ProductController;
