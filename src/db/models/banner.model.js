const { Model, DataTypes } = require('sequelize');

const BANNER_TABLE = 'banners';

const BannerSchema = {
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
};

class Banner extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: BANNER_TABLE,
      modelName: 'Banner',
      timestamps: false,
    };
  }
}

module.exports = { BANNER_TABLE, BannerSchema, Banner };
