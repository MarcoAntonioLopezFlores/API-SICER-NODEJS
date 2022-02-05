const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('./../libs/sequelize');
const BaseRepository = require('./base.repository');

class ProductRepository extends BaseRepository {
  constructor() {
    super(models.Product);
  }

  async find(query) {
    return await models.Product.findAndCountAll({
      ...query,
      include: ['provider'],
      where: { active: true, stock: { [Op.gt]: 0 } },
    });
  }

  async findOne(id) {
    return await models.Product.findByPk(id, {
      include: ['provider'],
      where: { active: true },
    });
  }

  async findByProvider(query, id) {
    return await models.Product.findAndCountAll({
      ...query,
      where: { providerId: id, active: true, stock: { [Op.gt]: 0 } },
    });
  }

  async delete(id) {
    const product = await models.Product.findByPk(id);
    if (!product) throw boom.notFound('product was not found');

    product.active = false;

    product.save();
    return { id };
  }
}

module.exports = ProductRepository;
