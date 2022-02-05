const { Address, AddressSchema } = require('./address.model');
const { Banner, BannerSchema } = require('./banner.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Form, FormSchema } = require('./form.model');
const { OrderProduct, OrderProductSchema } = require('./order-product.model');
const { Order, OrderSchema } = require('./order.model');
const { Product, ProductSchema } = require('./product.model');
const { Provider, ProviderSchema } = require('./provider.model');
const { Seller, SellerSchema } = require('./seller.model');
const { User, UserSchema } = require('./user.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Address.init(AddressSchema, Address.config(sequelize));
  Seller.init(SellerSchema, Seller.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Provider.init(ProviderSchema, Provider.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Form.init(FormSchema, Form.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));
  Banner.init(BannerSchema, Banner.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Seller.associate(sequelize.models);
  Provider.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
}

module.exports = setupModels;
