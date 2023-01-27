const express = require('express');
const controller = require('../controllers/user');
const schemas = require('../schemas/auth');
const { validateBody, authenticate } = require('../middlewares');
const { controllerWrapper } = require('../helpers');

const router = express.Router();

router.get('/', authenticate, controllerWrapper(controller.getCurrentUser));

module.exports = router;
