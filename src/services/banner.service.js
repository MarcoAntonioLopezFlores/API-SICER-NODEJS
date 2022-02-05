const path = require('path');
const fs = require('fs');
const BannerRepository = require('../repositories/banner.repository');
const BaseService = require('./base.service');

const bannerRepository = new BannerRepository();
class BannerService extends BaseService {
  constructor() {
    super(bannerRepository);
  }

  async delete(id) {
    const banner = await this.findOne(id);
    await banner.destroy();
    fs.unlinkSync(
      path.join(__dirname, `../../public/banner/images/${banner.name}`)
    );
    return { id };
  }
}

module.exports = BannerService;
