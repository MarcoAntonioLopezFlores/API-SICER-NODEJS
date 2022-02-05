const express = require('express');
const passport = require('passport');
const FormController = require('../controllers/form.controller');
const { checkRoles } = require('../middlewares/role.middleware');

const validatorHandler = require('../middlewares/validator.middleware');
const roles = require('../utils/enums/role.enum');
const {
  updateFormSchema,
  createFormSchema,
  getFormSchema,
} = require('./../schemas/form.schema');

const formController = new FormController();
const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.ADMIN),
  formController.find
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.ADMIN),
  formController.findOne
);

router.post('/', formController.create);
router.patch('/:id', formController.update);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.ADMIN),
  formController.delete
);

module.exports = router;
