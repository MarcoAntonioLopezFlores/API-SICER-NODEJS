const express = require('express');
const passport = require('passport');
const OrderController = require('../controllers/order.controller');
const { checkRoles } = require('../middlewares/role.middleware');

const validatorHandler = require('../middlewares/validator.middleware');
const roles = require('../utils/enums/role.enum');
const {
  updateOrderSchema,
  createOrderSchema,
  getOrderSchema,
} = require('./../schemas/order.schema');

const orderController = new OrderController();
const router = express.Router();

router.get(
  '/',
  //passport.authenticate('jwt', { session: false }),
  //checkRoles(roles.ADMIN),
  orderController.find
);

router.get(
  '/provider/:id',
  //passport.authenticate('jwt', { session: false }),
  //checkRoles(roles.CUSTOMER),
  orderController.findByProvider
);

router.get(
  '/customer/:id',
  //passport.authenticate('jwt', { session: false }),
  //checkRoles(roles.CUSTOMER),
  orderController.findByCustomer
);

router.get(
  '/seller/:id',
  //passport.authenticate('jwt', { session: false }),
  //checkRoles(roles.SELLER),
  orderController.findBySeller
);

router.get('/:id', orderController.findOne);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.SELLER, roles.CUSTOMER),
  orderController.create
);

router.post(
  '/product',
  ///passport.authenticate('jwt', { session: false }),
  //checkRoles(roles.SELLER, roles.CUSTOMER),
  orderController.updateAmountItem
);

router.delete(
  '/product',
  ///passport.authenticate('jwt', { session: false }),
  //checkRoles(roles.SELLER, roles.CUSTOMER),
  orderController.deleteItems
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.SELLER, roles.CUSTOMER),
  orderController.update
);

router.patch(
  '/cancel/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.SELLER, roles.CUSTOMER),
  orderController.cancel
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.SELLER, roles.CUSTOMER),
  orderController.delete
);

module.exports = router;
