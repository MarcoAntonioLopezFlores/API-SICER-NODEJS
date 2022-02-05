const { Model, DataTypes, Sequelize } = require('sequelize');
const { compareSync, hashSync, genSaltSync } = require('bcryptjs');
const roles = require('../../utils/enums/role.enum');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.ENUM([
      roles.ADMIN,
      roles.SELLER,
      roles.CUSTOMER,
      roles.PROVIDER,
    ]),
    defaultValue: roles.CUSTOMER,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

const hooks = {
  beforeCreate(user) {
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt);
    user.password = hashedPassword;
  },
  beforeUpdate(user) {
    if (user._changed.has('password')) {
      const salt = genSaltSync(10);
      const hashedPassword = hashSync(user.password, salt);
      user.password = hashedPassword;
    }
  },
};
class User extends Model {
  static associate(models) {
    this.hasOne(models.Customer, { as: 'customer', foreignKey: 'userId' });
    this.hasOne(models.Provider, { as: 'provider', foreignKey: 'userId' });
    this.hasOne(models.Seller, { as: 'seller', foreignKey: 'userId' });
  }

  comparePasswords(password) {
    return compareSync(password, this.password);
  }

  static config(sequelize) {
    return {
      hooks,
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };
