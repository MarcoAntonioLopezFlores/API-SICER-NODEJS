const { models } = require('./../libs/sequelize');
const BaseRepository = require('./base.repository');

class UserRepository extends BaseRepository {
  constructor() {
    super(models.User);
  }

  async findUserByEmail(email) {
    return await models.User.findOne({
      where: {
        email: email,
      },
    });
  }
}

module.exports = UserRepository;
