const express = require('express');
const { validateBody, authenticate } = require('../middlewares');
const controller = require('../controllers/file');
const { controllerWrapper } = require('../helpers');

const router = express.Router();

router.get('/', authenticate, controllerWrapper(controller.fetchFiles));
router.post('/', authenticate, controllerWrapper(controller.createDir));
router.post('/upload/', authenticate, controllerWrapper(controller.uploadFile));

module.exports = router;
