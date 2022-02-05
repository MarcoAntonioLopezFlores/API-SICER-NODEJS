const boom = require('@hapi/boom');
const { generateToken } = require('../helpers/jwt.helper');
const UserService = require('./user.service');

const service = new UserService();
class AuthService {
  constructor() {}

  async signUp(user) {
    const { email } = user;
    const userExist = await service.findUserByEmail(email);
    if (userExist) {
      throw boom.unauthorized('User already exists');
    }
    const newUser = await service.create(user);
    delete newUser.dataValues.password;
    return newUser;
  }

  async signIn(credentials) {
    const { email, password } = credentials;
    const userExist = await service.findUserByEmail(email);
    if (!userExist) {
      throw boom.notFound('User was not found');
    }

    const validPassword = userExist.comparePasswords(password);

    if (!validPassword) {
      throw boom.unauthorized('Invalid password');
    }

    const user = {
      email: userExist.email,
      id: userExist.id,
      role: userExist.role,
    };

    const token = generateToken(user);

    return { token, user };
  }
}

module.exports = AuthService;
