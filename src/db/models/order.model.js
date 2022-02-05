const { Model, DataTypes, Sequelize } = require('sequelize');
const status = require('../../utils/enums/status-order.enum');
const { CUSTOMER_TABLE } = require('./customer.model');
const { SELLER_TABLE } = require('./seller.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  sellerId: {
    field: 'seller_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: SELLER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  paidAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'paid_at',
  },
  status: {
    type: DataTypes.ENUM([
      status.DELIVERED,
      status.PAID,
      status.SENT,
      status.EARRING,
      status.CANCELLED,
    ]),
    allowNull: false,
    defaultValue: status.EARRING,
  },
  methodPayment: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'method_payment',
    defaultValue: Sequelize.NOW,
  },
  subtotal: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.items && this.items.length > 0) {
        return this.items.reduce((total, item) => {
          return total + item.price * item.OrderProduct.amount;
        }, 0);
      }
      return 0;
    },
  },
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.items && this.items.length > 0) {
        return this.subtotal * 1.16;
      }
      return 0;
    },
  },
};

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Seller, {
      as: 'seller',
    });
    this.belongsTo(models.Customer, {
      as: 'customer',
    });
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false,
    };
  }
}

module.exports = { Order, OrderSchema, ORDER_TABLE };
