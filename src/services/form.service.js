const FormRepository = require('../repositories/form.repository');
const BaseService = require('./base.service');

const formRepository = new FormRepository();
class FormService extends BaseService {
  constructor() {
    super(formRepository);
  }
}

module.exports = FormService;
