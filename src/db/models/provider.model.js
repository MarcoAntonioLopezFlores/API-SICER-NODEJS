const { Model, DataTypes } = require('sequelize');
const { ADDRESS_TABLE } = require('./address.model');
const { USER_TABLE } = require('./user.model');

const PROVIDER_TABLE = 'providers';

const ProviderSchema = {
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
  addressId: {
    field: 'address_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: ADDRESS_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Provider extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    this.belongsTo(models.Address, { foreignKey: 'addressId', as: 'address' });
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'providerId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROVIDER_TABLE,
      modelName: 'Provider',
      timestamps: false,
    };
  }
}

module.exports = { PROVIDER_TABLE, ProviderSchema, Provider };
