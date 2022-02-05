const boom = require('@hapi/boom');
const {
  getPagination,
  getPagingData,
} = require('../helpers/pagination.helper');
const ProductRepository = require('../repositories/product.repository');
const BaseService = require('./base.service');

const productRepository = new ProductRepository();
class ProductService extends BaseService {
  constructor() {
    super(productRepository);
  }

  async findByProvider(queryParams, id) {
    if (!id) {
      throw boom.badRequest('id of provider must be sent');
    }
    const { pageSize, pageNumber } = queryParams;
    const query = getPagination(pageSize, pageNumber);
    const data = await productRepository.findByProvider(query, id);
    return getPagingData(data, pageNumber, pageSize);
  }
}

module.exports = ProductService;
