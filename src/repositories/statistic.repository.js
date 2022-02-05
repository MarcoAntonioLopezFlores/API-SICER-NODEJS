const { QueryTypes } = require('sequelize');
const sequelize = require('./../libs/sequelize');

class StatisticRepository {
  async findAmountProductSold(innerQuery, startDate, endDate) {
    const query = `SELECT op.product_id, p.sku, SUM(op.amount) as amount_total FROM orders o 
    INNER JOIN orders_products op ON o.id = op.order_id and  o.status = 'Pagado' 
    INNER JOIN products p on op.product_id = p.id ${innerQuery}
    WHERE TO_CHAR(o.created_at, 'yyyy-mm-dd') >= '${startDate}' AND TO_CHAR(o.created_at, 'yyyy-mm-dd') <= '${endDate}'
    GROUP BY op.product_id, p.sku LIMIT 10;`;

    return await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
  }

  async findSalesBySeller(startDate, endDate) {
    const query = `SELECT s.id, s.name, SUM((product.price + (product.price * 0.16)) * op.amount) as total FROM orders o 
    INNER JOIN orders_products op ON o.id = op.order_id and o.status = 'Pagado' 
    INNER JOIN products product on op.product_id = product.id INNER JOIN sellers s ON s.id = o.seller_id
    WHERE TO_CHAR(o.created_at, 'yyyy-mm-dd') >= '${startDate}' AND TO_CHAR(o.created_at, 'yyyy-mm-dd') <= '${endDate}' 
    GROUP BY s.id LIMIT 10;`;

    return await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
  }

  async findSalesByProvider(startDate, endDate) {
    const query = `SELECT provider.id, provider.name, SUM((product.price + (product.price * 0.16)) * op.amount) as total FROM orders o 
    INNER JOIN orders_products op ON o.id = op.order_id and o.status = 'Pagado' 
    INNER JOIN products product on op.product_id = product.id INNER JOIN providers provider on product.provider_id = provider.id
    WHERE TO_CHAR(o.created_at, 'yyyy-mm-dd') >= '${startDate}' AND TO_CHAR(o.created_at, 'yyyy-mm-dd') <= '${endDate}' 
    GROUP BY provider.id LIMIT 10;`;

    return await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
  }

  async findPurchases(innerQuery, startDate, endDate) {
    const query = `SELECT c.id, c.name, SUM((product.price + (product.price * 0.16)) * op.amount) as total FROM orders o 
    INNER JOIN orders_products op ON o.id = op.order_id and o.status = 'Pagado'
    INNER JOIN products product on op.product_id = product.id INNER JOIN customers c ON c.id = o.customer_id ${innerQuery}
    WHERE TO_CHAR(o.created_at, 'yyyy-mm-dd') >= '${startDate}' AND TO_CHAR(o.created_at, 'yyyy-mm-dd') <= '${endDate}' 
    GROUP BY c.id LIMIT 10;`;

    return await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
  }
}

module.exports = StatisticRepository;
