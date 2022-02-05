const express = require('express');
const passport = require('passport');
const StatisticController = require('../controllers/statistic.controller');
const { checkRoles } = require('../middlewares/role.middleware');
const roles = require('../utils/enums/role.enum');

const statisticController = new StatisticController();
const router = express.Router();

router.get(
  '/product',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.ADMIN, roles.PROVIDER, roles.SELLER),
  statisticController.findAmountProductSold
);

router.get(
  '/sales/:role',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.ADMIN, roles.PROVIDER, roles.SELLER),
  statisticController.findSalesByRole
);

router.get(
  '/purchases',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.ADMIN, roles.PROVIDER, roles.SELLER),
  statisticController.findPurchases
);

module.exports = router;
