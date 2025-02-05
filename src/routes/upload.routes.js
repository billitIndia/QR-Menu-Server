const express = require("express");
const uploadController = require("../controllers/upload.controller");
const router = express.Router();
const { generatePresignedUrl } = require('../controllers/upload.controller');
const auth = require('../middleware/auth');

// router.use(auth);
router.post("/image", uploadController.uploadImage);
router.post('/presigned-url', generatePresignedUrl);

module.exports = router;
