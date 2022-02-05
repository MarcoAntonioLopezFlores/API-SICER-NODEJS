const boom = require('@hapi/boom');
const sequelize = require('./../libs/sequelize');
const { models } = require('./../libs/sequelize');
const BaseRepository = require('./base.repository');
class ProviderRepository extends BaseRepository {
  constructor() {
    super(models.Provider);
  }

  async create(data) {
    return sequelize.transaction(
      async (transaction) =>
        await models.Provider.create(data, {
          include: ['user', 'address'],
          transaction,
        })
    );
  }

  async find(query) {
    return await models.Provider.findAndCountAll({
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
    return await models.Provider.findByPk(id, {
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
    const provider = await models.Provider.findByPk(id);
    if (!provider) throw boom.notFound('provider was not found');
    const user = await models.User.findByPk(provider.userId);
    user.active = false;

    user.save();
    return { id };
  }

  async update(id, changes) {
    const provider = await models.Provider.findByPk(id);
    if (!provider) throw boom.notFound('provider was not found');

    if (changes.user) {
      const user = await models.User.findByPk(provider.userId);
      await user.update(changes.user);
    }

    if (changes.address) {
      const address = await models.Address.findByPk(provider.addressId);
      await address.update(changes.address);
    }
    await provider.update(changes);
    return await this.findOne(id);
  }
}

module.exports = ProviderRepository;
