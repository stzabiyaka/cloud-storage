const express = require('express');
const controller = require('../controllers/auth');
const schemas = require('../schemas/auth');
const { validateBody, authenticate } = require('../middlewares');
const { controllerWrapper } = require('../helpers');

const router = express.Router();

router.post('/signup', schemas.signUpSchema, validateBody(), controllerWrapper(controller.signUp));

router.post('/signin', schemas.signInSchema, validateBody(), controllerWrapper(controller.signIn));

module.exports = router;
