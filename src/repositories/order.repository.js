const { models } = require('./../libs/sequelize');
const BaseRepository = require('./base.repository');

class OrderRepository extends BaseRepository {
  constructor() {
    super(models.Order);
  }

  async updateAmountItem(data) {
    const orderProductFound = await models.OrderProduct.findOne({
      where: {
        orderId: data.orderId,
        productId: data.productId,
      },
    });

    if (!orderProductFound) {
      const item = await models.OrderProduct.create(data);
      return { item, created: true };
    } else {
      const item = await orderProductFound.update(data);
      return { item, created: false };
    }
  }

  async deleteItems(orderId, productId) {
    const orderProductFound = await models.OrderProduct.findOne({
      where: {
        orderId,
        productId,
      },
    });

    await orderProductFound.destroy();
    return true;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: [{ association: 'address' }],
        },
        {
          association: 'seller',
        },
        'items',
      ],
    });
    return order;
  }

  async find(query) {
    return await models.Order.findAndCountAll({
      ...query,
      distinct: true,
      order: [['created_at', 'DESC']],
      include: [
        {
          association: 'customer',
          include: [{ association: 'address' }],
        },
        {
          association: 'seller',
        },
        {
          required: false,
          association: 'items',
        },
      ],
    });
  }

  async findBySeller(query, id) {
    return await models.Order.findAndCountAll({
      ...query,
      distinct: true,
      order: [['created_at', 'DESC']],
      include: [
        {
          association: 'customer',
          include: [{ association: 'address' }],
        },
        {
          required: false,
          association: 'items',
        },
      ],
      where: { sellerId: id },
    });
  }

  async findByCustomer(query, id) {
    return await models.Order.findAndCountAll({
      ...query,
      distinct: true,
      order: [['created_at', 'DESC']],
      include: [
        {
          association: 'seller',
        },
        {
          required: false,
          association: 'items',
        },
      ],
      where: { customerId: id },
    });
  }

  async findByProvider(query, id) {
    return await models.Order.findAndCountAll({
      ...query,
      distinct: true,
      order: [['created_at', 'DESC']],
      include: [
        {
          association: 'seller',
        },
        {
          required: false,
          association: 'items',
          where: { providerId: id },
        },
      ],
    });
  }
}

module.exports = OrderRepository;
