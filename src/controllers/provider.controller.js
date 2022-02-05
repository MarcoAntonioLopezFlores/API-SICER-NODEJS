const ProviderService = require('../services/provider.service');

const service = new ProviderService();
class ProviderController {
  async findOne(req, res) {
    const { id } = req.params;
    const provider = await service.findOne(id);
    return res.send(provider);
  }

  async find(req, res) {
    const providers = await service.find(req.query);
    return res.send(providers);
  }

  async create(req, res) {
    const { body } = req;
    const providerCreated = await service.create(body);
    return res.status(201).send(providerCreated);
  }

  async update(req, res) {
    const { body } = req;
    const { id } = req.params;
    const updatedProvider = await service.update(id, body);

    return res.send(updatedProvider);
  }

  async delete(req, res) {
    const { id } = req.params;
    const deletedProvider = await service.delete(id);

    return res.send(deletedProvider);
  }
}

module.exports = ProviderController;
