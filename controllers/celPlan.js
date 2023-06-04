import Provider from "../models/Provider.js";
import CelPlan from "../models/CelPlan.js";
import InternetPlan from "../models/InternetPlan.js";
import TVPlan from "../models/TvPlan.js";
import dayjs from "dayjs";

export const createPlan = async (req, res) => {
  const {
    providerId,
    title,
    cost,
    franchise,
    unlimitedApps,
    unlimitedCall,
    planType,
    priority,
    description,
  } = req.body;

  try {
    const planAlreadyExists = await CelPlan.findOne({ title });
    const provider = await Provider.findById(providerId);

    if (planAlreadyExists) {
      return res.status(405).json({ message: "Plano já existe" });
    }

    const newPlan = new CelPlan({
      provider: providerId,
      providerIcon: provider.providerLogo,
      title,
      cost,
      franchise,
      unlimitedApps,
      unlimitedCall,
      planType,
      priority,
      description,
    });

    await newPlan.save();

    const updatedCelPlans = await CelPlan.find();
    const updatedInternetPlans = await InternetPlan.find();
    const updatedTvPlans = await TVPlan.find();

    const allUpdatedPlans = [
      ...updatedInternetPlans,
      ...updatedCelPlans,
      ...updatedTvPlans,
    ];

    return res.status(200).json(allUpdatedPlans);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const editPlan = async (req, res) => {
  const {
    id,
    title,
    cost,
    franchise,
    unlimitedApps,
    unlimitedCall,
    planType,
    priority,
    description,
  } = req.body;

  const planAlreadyExists = await CelPlan.findOne({ title });

  if (planAlreadyExists) {
    return res.status(405).json({ message: "Plano já existe" });
  }

  try {
    await CelPlan.findOneAndUpdate(
      { _id: id },
      {
        title,
        cost,
        franchise,
        unlimitedApps,
        unlimitedCall,
        planType,
        priority,
        description,
      }
    );

    const updatedCelPlans = await CelPlan.find();
    const updatedInternetPlans = await InternetPlan.find();
    const updatedTvPlans = await TVPlan.find();

    const allUpdatedPlans = [
      ...updatedInternetPlans,
      ...updatedCelPlans,
      ...updatedTvPlans,
    ];

    return res.status(200).json(allUpdatedPlans);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllPlans = async (req, res) => {
  try {
    const plans = await CelPlan.find();

    return res.status(200).json(plans);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const toggleArchivatedPlan = async (req, res) => {
  const { id } = req.body;

  try {
    const planSelected = await CelPlan.findById(id);

    if (!planSelected) {
      return res.status(404).json({ message: "Plano não encontrado" });
    }

    planSelected.archived = !planSelected.archived;
    planSelected.archivedAt = dayjs().format("DD/MM/YYYY");

    await planSelected.save();

    const updatedCelPlans = await CelPlan.find();
    const updatedInternetPlans = await InternetPlan.find();
    const updatedTvPlans = await TVPlan.find();

    const allUpdatedPlans = [
      ...updatedInternetPlans,
      ...updatedCelPlans,
      ...updatedTvPlans,
    ];

    return res.status(200).json(allUpdatedPlans);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const filterPlan = async (req, res) => {
  const { cep, cost, franchise, provider, planType, unlimitedApps } = req.body;

  try {
    const plans = await CelPlan.find({
      cost: { $lt: cost + 1 },
      archived: false,
    });

    const allProviders = await Provider.find();

    const providerFiltered = allProviders.filter((providerFilter) => {
      return (
        provider.includes(providerFilter.providerName) &&
        providerFilter.locations.includes(cep)
      );
    });

    const planWithFranchiseFiltered = plans.filter((plan) => {
      if (
        parseInt(plan.franchise.substring(0, plan.franchise.length - 2)) <
        parseInt(franchise.substring(0, franchise.length - 2))
      ) {
        return plan;
      }
    });

    const plansProviderFilter = planWithFranchiseFiltered.filter((plan) => {
      return providerFiltered.some((prov) => {
        return prov._id.equals(plan.provider);
      });
    });

    const plansFiltered = plansProviderFilter.filter((plan) => {
      if (planType.includes(plan.planType)) {
        return plan.unlimitedApps.some((el) => {
          if (unlimitedApps.includes(el)) {
            return plan;
          }
        });
      }
    });

    return res.status(200).json(plansFiltered);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deletePlan = async (req, res) => {
  const { id } = req.params;

  console.log(id);

  try {
    await CelPlan.findOneAndDelete({ _id: id });

    const updatedCelPlans = await CelPlan.find();
    const updatedInternetPlans = await InternetPlan.find();
    const updatedTvPlans = await TVPlan.find();

    const allUpdatedPlans = [
      ...updatedInternetPlans,
      ...updatedCelPlans,
      ...updatedTvPlans,
    ];

    return res.status(200).json(allUpdatedPlans);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
