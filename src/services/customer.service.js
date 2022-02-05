const CustomerRepository = require('../repositories/customer.repository');
const BaseService = require('./base.service');

const customerRepository = new CustomerRepository();
class CustomerService extends BaseService {
  constructor() {
    super(customerRepository);
  }

  async create(entity) {
    const customer = await this.repository.create(entity);
    delete customer.user.dataValues.password;
    return customer;
  }
}

module.exports = CustomerService;
