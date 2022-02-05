const sequelize = require('../libs/sequelize');

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return sequelize.transaction(
      async (transaction) => await this.model.create(data, { transaction })
    );
  }

  async find(query) {
    if (this.model.rawAttributes.createdAt) {
      query.order = [['created_at', 'DESC']];
    }
    return await this.model.findAndCountAll({
      ...query,
    });
  }

  async findOne(id) {
    return await this.model.findByPk(id);
  }

  async update(id, changes) {
    const entity = await this.model.findByPk(id);
    return await entity.update(changes);
  }

  async delete(id) {
    const entity = await this.findOne(id);
    await entity.destroy();
    return { id };
  }
}

module.exports = BaseRepository;
