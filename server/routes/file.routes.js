const express = require('express');
const { validateBody, authenticate } = require('../middlewares');
const controller = require('../controllers/file');
const { controllerWrapper } = require('../helpers');

const router = express.Router();

router.get('/', authenticate, controllerWrapper(controller.fetchFiles));
router.post('/', authenticate, controllerWrapper(controller.createDir));
router.post('/:parentId', authenticate, controllerWrapper(controller.uploadFile));
router.delete('/:fileId', authenticate, controllerWrapper(controller.deleteFile));
router.get('/:fileId', authenticate, controllerWrapper(controller.downloadFile));

module.exports = router;
