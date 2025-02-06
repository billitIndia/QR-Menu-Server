const Plan = require("../models/plan.model");

exports.createPlan = async (planData) => {
    const plan = await Plan.create(planData);
    return plan;
};

exports.getAllPlans = async () => {
    const plans = await Plan.find();
    return plans;
};

exports.getPlans = async () => {
    const plans = await Plan.find({ isActive: true });
    return plans;
};


exports.getPlanById = async (id) => {
    const plan = await Plan.findById(id);
    return plan;
};

exports.updatePlan = async (id, planData) => {
    const plan = await Plan.findByIdAndUpdate(id, planData, { new: true });
    return plan;
};

exports.deletePlan = async (id) => {
    await Plan.findByIdAndDelete(id);
};

module.exports = exports;