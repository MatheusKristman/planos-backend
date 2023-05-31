import CelPlan from "../models/CelPlan.js";
import InternetPlan from "../models/InternetPlan.js";
import TVPlan from "../models/TvPlan.js";

export const getAllPlans = async (req, res) => {
  try {
    const celPlans = await CelPlan.find();
    const internetPlans = await InternetPlan.find();
    const tvPlans = await TVPlan.find();
    const allPlans = [...internetPlans, ...celPlans, ...tvPlans];

    return res.status(200).json(allPlans);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
