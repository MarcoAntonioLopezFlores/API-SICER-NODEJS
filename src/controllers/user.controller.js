const UserService = require('../services/user.service');

const service = new UserService();
class UserController {
  async findOne(req, res) {
    const { id } = req.params;
    const user = await service.findOne(id);
    return res.send(user);
  }

  async findUserByEmail(req, res) {
    const { email } = req.params;
    const user = await service.findUserByEmail(email);
    return res.send(user);
  }

  async find(req, res) {
    const users = await service.find(req.query);
    return res.send(users);
  }

  async update(req, res) {
    const { body } = req;
    const { id } = req.params;
    const updatedUser = await service.update(id, body);
    delete updatedUser.dataValues.password;
    return res.send(updatedUser);
  }

  async delete(req, res) {
    const { id } = req.params;
    const deletedUser = await service.delete(id);

    return res.send(deletedUser);
  }
}

module.exports = UserController;
