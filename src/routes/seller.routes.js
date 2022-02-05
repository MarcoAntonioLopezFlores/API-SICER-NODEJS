const express = require('express');
const passport = require('passport');
const SellerController = require('../controllers/seller.controller');
const { checkRoles } = require('../middlewares/role.middleware');

const validatorHandler = require('../middlewares/validator.middleware');
const roles = require('../utils/enums/role.enum');
const {
  updateSellerSchema,
  createSellerSchema,
  getSellerSchema,
} = require('./../schemas/seller.schema');

const sellerController = new SellerController();
const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.ADMIN),
  sellerController.find
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.ADMIN, roles.SELLER),
  sellerController.findOne
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.ADMIN),
  sellerController.create
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.ADMIN, roles.SELLER),
  sellerController.update
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.ADMIN),
  sellerController.delete
);

module.exports = router;
