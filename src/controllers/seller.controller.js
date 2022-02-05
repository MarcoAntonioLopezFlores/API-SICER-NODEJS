const SellerService = require('../services/seller.service');

const service = new SellerService();
class SellerController {
  async findOne(req, res) {
    const { id } = req.params;
    const seller = await service.findOne(id);
    return res.send(seller);
  }

  async find(req, res) {
    const sellers = await service.find(req.query);
    return res.send(sellers);
  }

  async create(req, res) {
    const { body } = req;
    const sellerCreated = await service.create(body);
    return res.status(201).send(sellerCreated);
  }

  async update(req, res) {
    const { body } = req;
    const { id } = req.params;
    const updatedSeller = await service.update(id, body);

    return res.send(updatedSeller);
  }

  async delete(req, res) {
    const { id } = req.params;
    const deletedSeller = await service.delete(id);

    return res.send(deletedSeller);
  }
}

module.exports = SellerController;
