const ProviderRepository = require('../repositories/provider.repository');
const BaseService = require('./base.service');

const providerRepository = new ProviderRepository();
class ProviderService extends BaseService {
  constructor() {
    super(providerRepository);
  }

  async create(entity) {
    const provider = await this.repository.create(entity);
    delete provider.user.dataValues.password;
    return provider;
  }
}

module.exports = ProviderService;
