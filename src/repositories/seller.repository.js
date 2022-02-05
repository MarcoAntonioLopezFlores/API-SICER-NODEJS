const boom = require('@hapi/boom');
const sequelize = require('./../libs/sequelize');
const { models } = require('./../libs/sequelize');
const BaseRepository = require('./base.repository');
class SellerRepository extends BaseRepository {
  constructor() {
    super(models.Seller);
  }

  async create(data) {
    return sequelize.transaction(
      async (transaction) =>
        await models.Seller.create(data, {
          include: ['user'],
          transaction,
        })
    );
  }

  async find(query) {
    return await models.Seller.findAndCountAll({
      ...query,
      include: [
        {
          association: 'user',
          where: { active: true },
          attributes: { exclude: ['password'] },
        },
      ],
    });
  }

  async findOne(id) {
    return await models.Seller.findByPk(id, {
      include: [
        {
          association: 'user',
          where: { active: true },
          attributes: { exclude: ['password'] },
        },
      ],
    });
  }

  async delete(id) {
    const seller = await models.Seller.findByPk(id);
    if (!seller) throw boom.notFound('seller was not found');
    const user = await models.User.findByPk(seller.userId);
    user.active = false;

    user.save();
    return { id };
  }

  async update(id, changes) {
    const seller = await models.Seller.findByPk(id);
    if (!seller) throw boom.notFound('seller was not found');

    if (changes.user) {
      const user = await models.User.findByPk(seller.userId);
      await user.update(changes.user);
    }

    await seller.update(changes);
    return await this.findOne(id);
  }
}

module.exports = SellerRepository;
