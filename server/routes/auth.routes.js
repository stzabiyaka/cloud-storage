const express = require('express');
const controller = require('../controllers/auth');
const authSchemas = require('../schemas/auth');
const { validateBody } = require('../middlewares');
const { controllerWrapper } = require('../helpers');

const router = express.Router();

router.post(
  '/signup',
  validateBody(authSchemas.signUpSchema),
  controllerWrapper(controller.signUp)
);

router.post(
  '/signin',
  validateBody(authSchemas.signInSchema),
  controllerWrapper(controller.signIn)
);

module.exports = router;
