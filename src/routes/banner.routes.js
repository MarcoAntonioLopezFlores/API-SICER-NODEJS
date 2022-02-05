const express = require('express');
const passport = require('passport');
const BannerController = require('../controllers/banner.controller');
const multer = require('../middlewares/multer.middleware');
const { checkRoles } = require('../middlewares/role.middleware');
const roles = require('../utils/enums/role.enum');

const bannerController = new BannerController();
const router = express.Router();

router.get('/', bannerController.find);
router.get('/:id', bannerController.findOne);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.ADMIN),
  multer.single('file'),
  bannerController.create
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(roles.ADMIN),
  bannerController.delete
);

module.exports = router;
