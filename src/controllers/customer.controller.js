const CustomerService = require('../services/customer.service');

const service = new CustomerService();
class CustomerController {
  async findOne(req, res) {
    const { id } = req.params;
    const customer = await service.findOne(id);
    return res.send(customer);
  }

  async find(req, res) {
    const customers = await service.find(req.query);
    return res.send(customers);
  }

  async create(req, res) {
    const { body } = req;
    const customerCreated = await service.create(body);
    return res.status(201).send(customerCreated);
  }

  async update(req, res) {
    const { body } = req;
    const { id } = req.params;
    const updatedCustomer = await service.update(id, body);

    return res.send(updatedCustomer);
  }

  async delete(req, res) {
    const { id } = req.params;
    const deletedCustomer = await service.delete(id);

    return res.send(deletedCustomer);
  }
}

module.exports = CustomerController;
