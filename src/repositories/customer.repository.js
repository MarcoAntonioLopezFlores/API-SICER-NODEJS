const boom = require('@hapi/boom');
const sequelize = require('./../libs/sequelize');
const { models } = require('./../libs/sequelize');
const BaseRepository = require('./base.repository');
class CustomerRepository extends BaseRepository {
  constructor() {
    super(models.Customer);
  }

  async create(data) {
    return sequelize.transaction(
      async (transaction) =>
        await models.Customer.create(data, {
          include: ['user', 'address'],
          transaction,
        })
    );
  }

  async find(query) {
    return await models.Customer.findAndCountAll({
      ...query,
      include: [
        {
          association: 'user',
          where: { active: true },
          attributes: { exclude: ['password'] },
        },
        'address',
      ],
    });
  }

  async findOne(id) {
    return await models.Customer.findByPk(id, {
      include: [
        {
          association: 'user',
          where: { active: true },
          attributes: { exclude: ['password'] },
        },
        'address',
      ],
    });
  }

  async delete(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) throw boom.notFound('customer was not found');
    const user = await models.User.findByPk(customer.userId);
    user.active = false;

    user.save();
    return { id };
  }

  async update(id, changes) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) throw boom.notFound('customer was not found');

    if (changes.user) {
      const user = await models.User.findByPk(customer.userId);
      await user.update(changes.user);
    }

    if (changes.address) {
      const address = await models.Address.findByPk(customer.addressId);
      await address.update(changes.address);
    }
    await customer.update(changes);
    return await this.findOne(id);
  }
}

module.exports = CustomerRepository;
