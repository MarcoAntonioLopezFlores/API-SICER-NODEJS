const OrderService = require('../services/order.service');

const service = new OrderService();
class OrderController {
  async findOne(req, res) {
    const { id } = req.params;
    const order = await service.findOne(id);
    return res.send(order);
  }

  async find(req, res) {
    const orders = await service.find(req.query);
    return res.send(orders);
  }

  async findByCustomer(req, res) {
    const { id } = req.params;
    const orders = await service.findByCustomer(req.query, id);
    return res.send(orders);
  }

  async findByProvider(req, res) {
    const { id } = req.params;
    const orders = await service.findByProvider(req.query, id);
    return res.send(orders);
  }

  async findBySeller(req, res) {
    const { id } = req.params;
    const orders = await service.findBySeller(req.query, id);
    return res.send(orders);
  }

  async create(req, res) {
    const { body } = req;
    const orderCreated = await service.create(body);
    return res.status(201).send(orderCreated);
  }

  async updateAmountItem(req, res) {
    const { body } = req;
    const itemAdded = await service.updateAmountItem(body);
    return res.status(201).send(itemAdded);
  }

  async deleteItems(req, res) {
    const { orderId, productId } = req.body;
    const deletedItems = await service.deleteItems(orderId, productId);
    return res.status(201).send(deletedItems);
  }

  async update(req, res) {
    const { body } = req;
    const { id } = req.params;
    const updatedOrder = await service.update(id, body);
    return res.send(updatedOrder);
  }

  async cancel(req, res) {
    const { id } = req.params;
    const cancelledOrder = await service.cancel(id);
    return res.send(cancelledOrder);
  }

  async delete(req, res) {
    const { id } = req.params;
    const deletedOrder = await service.delete(id);

    return res.send(deletedOrder);
  }
}

module.exports = OrderController;
