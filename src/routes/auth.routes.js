const express = require('express');
const AuthController = require('../controllers/auth.controller');

const validatorHandler = require('../middlewares/validator.middleware');
const {
  updateUserSchema,
  createUserSchema,
  getUserSchema,
} = require('./../schemas/user.schema');

const authController = new AuthController();
const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);

module.exports = router;
