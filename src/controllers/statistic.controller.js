const StatisticService = require('../services/statistic.service');

const service = new StatisticService();

class StatisticController {
  async findAmountProductSold(req, res) {
    const statistics = await service.findAmountProductSold(req.query);
    return res.send(statistics);
  }

  async findSalesByRole(req, res) {
    const statistics = await service.findSalesByRole(role, req.query);
    return res.send(statistics);
  }

  async findPurchases(req, res) {
    const statistics = await service.findPurchases(req.query);
    return res.send(statistics);
  }
}

module.exports = StatisticController;
