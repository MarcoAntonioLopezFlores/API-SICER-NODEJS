const boom = require('@hapi/boom');
const UserRepository = require('../repositories/user.repository');
const BaseService = require('./base.service');

const userRepository = new UserRepository();
class UserService extends BaseService {
  constructor() {
    super(userRepository);
  }

  async findUserByEmail(email) {
    if (!email) {
      throw boom.badRequest('Email must be sent');
    }

    const user = await userRepository.findUserByEmail(email);

    return user;
  }
}

module.exports = UserService;
