import Plan from "../models/Plan.js";

export const getAll = async (req, res) => {
  try {
    const plans = await Plan.find({});

    return res.status(200).json({ plans: plans });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const createPlan = async (req, res) => {
  try {
    const {
      city,
      provider,
      title,
      cost,
      period,
      franchise,
      unlimitedApps,
      unlimitedCall,
      planType,
      priority,
      description,
      lines,
    } = req.body;

    const planSelected = await Plan.findOne({ title });

    if (planSelected) {
      return res.status(405).json({ message: "Plano já criado" });
    }

    const newPlan = new Plan({
      city,
      provider,
      providerLogo: req.file.filename,
      title,
      cost,
      period,
      franchise,
      unlimitedApps,
      unlimitedCall,
      planType,
      priority,
      description,
      lines,
    });

    await newPlan.save();

    const plans = await Plan.find();

    return res.status(200).json(plans);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
