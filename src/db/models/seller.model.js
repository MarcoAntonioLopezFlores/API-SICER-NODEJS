const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const SELLER_TABLE = 'sellers';

const SellerSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Seller extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SELLER_TABLE,
      modelName: 'Seller',
      timestamps: false,
    };
  }
}

module.exports = { SELLER_TABLE, SellerSchema, Seller };
