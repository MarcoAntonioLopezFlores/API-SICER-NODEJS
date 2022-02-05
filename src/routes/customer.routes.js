const express = require('express');
const passport = require('passport');
const CustomerController = require('../controllers/customer.controller');
const { checkRoles } = require('../middlewares/role.middleware');

const validatorHandler = require('../middlewares/validator.middleware');
const roles = require('../utils/enums/role.enum');
const {
  updateCustomerSchema,
  createCustomerSchema,
  getCustomerSchema,
} = require('./../schemas/customer.schema');

const customerController = new CustomerController();
const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.ADMIN),
  customerController.find
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.ADMIN, roles.CUSTOMER, roles.SELLER),
  customerController.findOne
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.ADMIN, roles.SELLER),
  customerController.create
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.ADMIN, roles.SELLER, roles.CUSTOMER),
  customerController.update
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.ADMIN, roles.SELLER),
  customerController.delete
);

module.exports = router;
