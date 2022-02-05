const AuthService = require('../services/auth.service');

const service = new AuthService();

class AuthController {
  async signUp(req, res) {
    const { body } = req;
    const userCreated = await service.signUp(body);
    return res.status(201).send(userCreated);
  }

  async signIn(req, res) {
    const { body } = req;
    const credentials = await service.signIn(body);
    return res.send(credentials);
  }
}

module.exports = AuthController;
