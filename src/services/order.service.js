const boom = require('@hapi/boom');
const {
  getPagination,
  getPagingData,
} = require('../helpers/pagination.helper');
const OrderRepository = require('../repositories/order.repository');
const ProductRepository = require('../repositories/product.repository');

const BaseService = require('./base.service');

const orderRepository = new OrderRepository();
const productRepository = new ProductRepository();

class OrderService extends BaseService {
  constructor() {
    super(orderRepository);
  }

  async updateAmountItem(data) {
    const productFound = await productRepository.findOne(data.productId);
    if (!productFound) {
      throw boom.notFound('Product was not found');
    }

    if (data.operation === 'add') {
      if (productFound.stock <= 0) {
        throw boom.notFound('Product does not have existences');
      }
      productFound.stock = productFound.stock - 1;
    } else {
      productFound.stock = productFound.stock + 1;
    }

    await productFound.save();
    return await orderRepository.updateAmountItem(data);
  }

  async deleteItems(orderId, productId) {
    const productFound = await productRepository.findOne(productId);
    if (!productFound) {
      throw boom.notFound('Product was not found');
    }

    productFound.stock = productFound.stock + data.amount;
    await productFound.save();
    return await orderRepository.deleteItems(orderId, productId);
  }

  async cancel(id) {
    const orderFound = await orderRepository.findOne(id);
    console.log(orderFound);
  }

  async findBySeller(queryParams, id) {
    if (!id) {
      throw boom.badRequest('id of seller must be sent');
    }
    const { pageSize, pageNumber } = queryParams;
    const query = getPagination(pageSize, pageNumber);
    const data = await orderRepository.findBySeller(query, id);
    return getPagingData(data, pageNumber, pageSize);
  }

  async findByCustomer(queryParams, id) {
    if (!id) {
      throw boom.badRequest('id of customer must be sent');
    }
    const { pageSize, pageNumber } = queryParams;
    const query = getPagination(pageSize, pageNumber);
    const data = await orderRepository.findByCustomer(query, id);
    return getPagingData(data, pageNumber, pageSize);
  }

  async findByProvider(queryParams, id) {
    if (!id) {
      throw boom.badRequest('id of provider must be sent');
    }
    const { pageSize, pageNumber } = queryParams;
    const query = getPagination(pageSize, pageNumber);
    const data = await orderRepository.findByProvider(query, id);
    return getPagingData(data, pageNumber, pageSize);
  }
}

module.exports = OrderService;
