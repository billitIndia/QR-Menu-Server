const express = require("express");
const categoryController = require("../controllers/category.controller");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", categoryController.getAllCategories);

router.use(auth);
router.get("/owner", categoryController.getAllCategoriesForOwner);
router.post("/", categoryController.createCategory);
router.get("/:id", categoryController.getCategoryById);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
