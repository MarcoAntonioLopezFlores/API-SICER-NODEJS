const FormService = require('../services/form.service');

const service = new FormService();
class FormController {
  async findOne(req, res) {
    const { id } = req.params;
    const form = await service.findOne(id);
    return res.send(form);
  }

  async find(req, res) {
    const forms = await service.find(req.query);
    return res.send(forms);
  }
  async create(req, res) {
    const { body } = req;
    const formCreated = await service.create(body);
    return res.status(201).send(formCreated);
  }
  async update(req, res) {
    const { body } = req;
    const { id } = req.params;
    const updatedForm = await service.update(id, body);
    return res.send(updatedForm);
  }

  async delete(req, res) {
    const { id } = req.params;
    const deletedForm = await service.delete(id);

    return res.send(deletedForm);
  }
}

module.exports = FormController;
