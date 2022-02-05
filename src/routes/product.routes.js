const express = require('express');
const passport = require('passport');
const ProductController = require('../controllers/product.controller');
const multer = require('../middlewares/multer.middleware');
const { checkRoles } = require('../middlewares/role.middleware');

const validatorHandler = require('../middlewares/validator.middleware');
const roles = require('../utils/enums/role.enum');
const {
  updateProductSchema,
  createProductSchema,
  getProductSchema,
} = require('./../schemas/product.schema');

const productController = new ProductController();
const router = express.Router();

router.get('/', productController.find);
router.get('/provider/:id', productController.findByProvider);
router.get('/:id', productController.findOne);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.PROVIDER),
  multer.single('file'),
  productController.create
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.PROVIDER),
  productController.update
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.PROVIDER),
  productController.delete
);

module.exports = router;
