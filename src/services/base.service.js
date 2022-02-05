const boom = require('@hapi/boom');
const {
  getPagination,
  getPagingData,
} = require('../helpers/pagination.helper');
class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async findOne(id) {
    if (!id) {
      throw boom.badRequest('id must be sent');
    }
    const currentEntity = await this.repository.findOne(id);

    if (!currentEntity) {
      throw boom.notFound('entity does not found');
    }

    return currentEntity;
  }

  async find(queryParams) {
    const { pageSize, pageNumber } = queryParams;
    const query = getPagination(pageSize, pageNumber);
    const data = await this.repository.find(query);
    return getPagingData(data, pageNumber, pageSize);
  }

  async create(entity) {
    return await this.repository.create(entity);
  }

  async update(id, entity) {
    if (!id) {
      throw boom.badRequest('id must be sent');
    }

    const updatedEntity = await this.repository.update(id, entity);
    return updatedEntity;
  }

  async delete(id) {
    if (!id) {
      throw boom.badRequest('id must be sent');
    }
    return await this.repository.delete(id);
  }
}

module.exports = BaseService;
