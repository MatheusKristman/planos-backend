import Provider from "../models/Provider.js";
import TelephonePlan from "../models/TelephonePlan.js";

export const createPlan = async (req, res) => {
  const {
    providerId,
    title,
    cost,
    benefit,
    benefitDetails,
    unlimitedCall,
    priority,
    description,
  } = req.body;

  try {
    const planAlreadyExists = await TelephonePlan.findOne({ title });

    if (planAlreadyExists) {
      return res.status(405).json({ message: "Plano já existe" });
    }

    const newPlan = new TelephonePlan({
      provider: providerId,
      title,
      cost,
      benefit,
      benefitDetails,
      unlimitedCall,
      priority,
      description,
    });

    await newPlan.save();

    const plans = await TelephonePlan.find();

    return res.status(200).json(plans);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const editPlan = async (req, res) => {
  const {
    id,
    title,
    cost,
    benefit,
    benefitDetails,
    unlimitedCall,
    priority,
    description,
  } = req.body;

  try {
    const planSelected = await TelephonePlan.findOneAndUpdate(
      { _id: id },
      {
        title,
        cost,
        benefit,
        benefitDetails,
        unlimitedCall,
        priority,
        description,
      }
    );

    await planSelected.save();

    const plans = await TelephonePlan.find();

    return res.status(200).json(plans);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllPlans = async (req, res) => {
  try {
    const plans = await TelephonePlan.find();

    return res.status(200).json(plans);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const toggleArchivatedPlan = async (req, res) => {
  const { id } = req.body;

  try {
    const planSelected = await TelephonePlan.findById(id);

    if (!planSelected) {
      return res.status(404).json({ message: "Plano não encontrado" });
    }

    planSelected.archived = !planSelected.archived;

    await planSelected.save();

    const plans = await TelephonePlan.find();

    return res.status(200).json(plans);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const filterPlan = async (req, res) => {
  const { cep, provider, cost, unlimitedCall } = req.body;

  try {
    const plans = await TelephonePlan.find({
      cost: { $lt: cost + 1 },
      unlimitedCall,
    });

    const allProviders = await Provider.find();

    const providerFiltered = allProviders.filter((providerFilter) => {
      return (
        provider.includes(providerFilter.providerName) &&
        providerFilter.locations.includes(cep)
      );
    });

    const plansFiltered = plans.filter((plan) => {
      return providerFiltered.some((prov) => {
        return prov._id.equals(plan.provider);
      });
    });

    return res.status(200).json(plansFiltered);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
