const express = require('express');
const passport = require('passport');
const ProviderController = require('../controllers/provider.controller');
const { checkRoles } = require('../middlewares/role.middleware');

const validatorHandler = require('../middlewares/validator.middleware');
const roles = require('../utils/enums/role.enum');
const {
  updateProviderSchema,
  createProviderSchema,
  getProviderSchema,
} = require('./../schemas/provider.schema');

const providerController = new ProviderController();
const router = express.Router();

router.get('/', providerController.find);
router.get('/:id', providerController.findOne);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.ADMIN),
  providerController.create
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.ADMIN, roles.PROVIDER),
  providerController.update
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.ADMIN),
  providerController.delete
);

module.exports = router;
