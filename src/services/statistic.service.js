const boom = require('@hapi/boom');
const StatisticRepository = require('../repositories/statistic.repository');

const statisticRepository = new StatisticRepository();

class StatisticService {
  async findAmountProductSold(queryParams) {
    const { startDate, endDate, seller, provider, customer } = queryParams;

    const innerSeller = seller
      ? `INNER JOIN sellers s ON s.id = o.seller_id AND s.id = ${seller} `
      : '';
    const innerProvider = provider
      ? `INNER JOIN providers provider ON provider.id = p.provider_id AND provider.id = ${provider} `
      : '';
    const innerCustomer = customer
      ? `INNER JOIN customers c ON c.id = o.customer_id AND c.id = ${customer} `
      : '';
    const innerQuery = innerProvider + innerSeller + innerCustomer;

    return await statisticRepository.findAmountProductSold(
      innerQuery,
      startDate,
      endDate
    );
  }

  async findSalesByRole(role, queryParams) {
    const { startDate, endDate } = queryParams;

    if (role === 'seller') {
      return await statisticRepository.findSalesBySeller(startDate, endDate);
    } else if (role === 'provider') {
      return await statisticRepository.findSalesByProvider(startDate, endDate);
    } else {
      throw boom.badRequest("This role doesn't exist");
    }
  }

  async findPurchases(queryParams) {
    const { startDate, endDate, seller } = queryParams;

    const innerSeller = seller
      ? `INNER JOIN sellers s ON s.id = o.seller_id AND s.id = ${seller} `
      : '';

    return await statisticRepository.findPurchases(
      innerSeller,
      startDate,
      endDate
    );
  }
}

module.exports = StatisticService;
