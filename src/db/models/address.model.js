const { Model, DataTypes } = require('sequelize');

const ADDRESS_TABLE = 'addresses';

const AddressSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  province: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'MXN',
    validate: {
      notEmpty: true,
    },
  },
  zip: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^\d{5}([-]|\s*)?(\d{4})?$/,
    },
  },
  street1: {
    type: DataTypes.STRING(200),
    allowNull: false,
    field: 'street_1',
    validate: {
      notEmpty: true,
    },
  },
  street2: {
    type: DataTypes.STRING(200),
    allowNull: false,
    field: 'street_2',
    validate: {
      notEmpty: true,
    },
  },
};

class Address extends Model {
  static associations(models) {
    this.hasOne(models.Customer, { as: 'customer', foreignKey: 'addressId' });
    this.hasOne(models.Provider, { as: 'provider', foreignKey: 'addressId' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: ADDRESS_TABLE,
      modelName: 'Address',
      timestamps: false,
    };
  }
}

module.exports = { ADDRESS_TABLE, AddressSchema, Address };
