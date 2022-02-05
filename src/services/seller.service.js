const SellerRepository = require('../repositories/seller.repository');
const BaseService = require('./base.service');

const sellerRepository = new SellerRepository();
class SellerService extends BaseService {
  constructor() {
    super(sellerRepository);
  }

  async create(entity) {
    const seller = await this.repository.create(entity);
    delete seller.user.dataValues.password;
    return seller;
  }
}

module.exports = SellerService;
