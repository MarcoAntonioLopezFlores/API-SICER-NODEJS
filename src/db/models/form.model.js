const { Model, DataTypes, Sequelize } = require('sequelize');

const FORM_TABLE = 'forms';

const FormSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
};

class Form extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: FORM_TABLE,
      modelName: 'Form',
      timestamps: false,
    };
  }
}

module.exports = { FORM_TABLE, FormSchema, Form };
