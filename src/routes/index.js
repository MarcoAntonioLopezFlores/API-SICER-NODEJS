const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../../swagger-output.json');

require('express-async-errors');

const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const customerRoutes = require('./customer.routes');
const providerRoutes = require('./provider.routes');
const sellerRoutes = require('./seller.routes');
const formRoutes = require('./form.routes');
const productRoutes = require('./product.routes');
const orderRoutes = require('./order.routes');
const bannerRoutes = require('./banner.routes');
const statisticRoutes = require('./statistic.routes');

function routerApi(app) {
  const router = express.Router();

  app.use('/v1/api', router);

  router.use('/auth', authRoutes);
  router.use('/user', userRoutes);
  router.use('/customer', customerRoutes);
  router.use('/provider', providerRoutes);
  router.use('/seller', sellerRoutes);
  router.use('/form', formRoutes);
  router.use('/product', productRoutes);
  router.use('/order', orderRoutes);
  router.use('/banner', bannerRoutes);
  router.use('/statistic', statisticRoutes);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
}

module.exports = routerApi;
