const { models } = require('./../libs/sequelize');
const BaseRepository = require('./base.repository');

class BannerRepository extends BaseRepository {
  constructor() {
    super(models.Banner);
  }
}

module.exports = BannerRepository;
