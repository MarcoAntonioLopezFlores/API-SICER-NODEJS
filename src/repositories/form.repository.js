const { models } = require('./../libs/sequelize');
const BaseRepository = require('./base.repository');

class FormRepository extends BaseRepository {
  constructor() {
    super(models.Form);
  }
}

module.exports = FormRepository;
