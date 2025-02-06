const planService = require("../services/plan.service");

exports.createPlan = async (req, res, next) => {
    try {
        const plan = await planService.createPlan(req.body);
        res.status(201).json({ success: true, plan });
    } catch (error) {
        next(error);
    }
};

exports.getAllPlans = async (req, res, next) => {
    try {
        const plans = await planService.getAllPlans();
        res.status(200).json({ success: true, plans });
    } catch (error) {
        next(error);
    }
};

exports.getPlans = async (req, res, next) => {
    try {
        const plans = await planService.getPlans();
        res.status(200).json({ success: true, plans });
    } catch (error) {
        next(error);
    }
};

exports.getPlanById = async (req, res, next) => {
    try {
        const plan = await planService.getPlanById(req.params.id);
        res.status(200).json({ success: true, plan });
    } catch (error) {
        next(error);
    }
};

exports.updatePlan = async (req, res, next) => {
    try {
        const plan = await planService.updatePlan(req.params.id, req.body);
        res.status(200).json({ success: true, plan });
    } catch (error) {
        next(error);
    }
};

exports.deletePlan = async (req, res, next) => {
    try {
        await planService.deletePlan(req.params.id);
        res.status(200).json({ success: true, message: "Plan deleted successfully" });
    } catch (error) {
        next(error);
    }
};
