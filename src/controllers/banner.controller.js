const BannerService = require('../services/banner.service');
const service = new BannerService();

class BannerController {
  async findOne(req, res) {
    const { id } = req.params;
    const banner = await service.findOne(id);
    return res.send(banner);
  }

  async find(req, res) {
    const banners = await service.find(req.query);
    return res.send(banners);
  }

  async create(req, res) {
    const { file, body } = req;
    body.name = file.filename;
    const bannerCreated = await service.create(body);
    return res.status(201).send(bannerCreated);
  }

  async delete(req, res) {
    const { id } = req.params;
    const deletedBanner = await service.delete(id);

    return res.send(deletedBanner);
  }
}

module.exports = BannerController;
