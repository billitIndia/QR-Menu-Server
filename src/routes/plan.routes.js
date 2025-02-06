const express = require("express");
const router = express.Router();
const planController = require("../controllers/plan.controller");
const adminAuth = require("../middleware/adminAuth");

router.get("/all", planController.getAllPlans);
router.post("/create", adminAuth, planController.createPlan);
router.get("/", adminAuth, planController.getPlans);
router.get("/:id", adminAuth, planController.getPlanById);
router.put("/:id", adminAuth, planController.updatePlan);
router.delete("/:id", adminAuth, planController.deletePlan);

module.exports = router;
