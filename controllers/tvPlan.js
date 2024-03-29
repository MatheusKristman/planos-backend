import Provider from "../models/Provider.js";
import TVPlan from "../models/TvPlan.js";
import InternetPlan from "../models/InternetPlan.js";
import CelPlan from "../models/CelPlan.js";
import dayjs from "dayjs";

export const createPlan = async (req, res) => {
  try {
    const planAlreadyExists = await TVPlan.findOne({ title: req.body.title });
    const provider = await Provider.findOneAndUpdate(
      { _id: req.body.providerId },
      {
        $inc: {
          plansQuant: 1,
        },
      },
      {
        new: true,
      },
    );

    if (planAlreadyExists) {
      return res.status(405).json({ message: "Plano já existe" });
    }

    const newPlan = await TVPlan.create({
      provider: req.body.providerId,
      providerIcon: provider.providerLogo,
      title: req.body.title,
      cost: req.body.cost,
      afterCost: req.body.afterCost || null,
      periodToChangeCost: req.body.periodToChangeCost || null,
      installationCost: req.body.installationCost,
      devicesQuant: req.body.devicesQuant,
      benefits: req.body.benefits || null,
      priority: req.body.priority,
      description: req.body.description,
    });

    await newPlan.save();

    const updatedTvPlans = await TVPlan.find();
    const updatedInternetPlans = await InternetPlan.find();
    const updatedCelPlans = await CelPlan.find();

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
  try {
    const planSelected = await TVPlan.findOneAndUpdate(
      { _id: req.body.id },
      {
        title: req.body.title,
        cost: req.body.cost,
        afterCost: req.body.afterCost,
        periodToChangeCost: req.body.periodToChangeCost,
        installationCost: req.body.installationCost,
        devicesQuant: req.body.devicesQuant,
        benefits: req.body.benefits,
        priority: req.body.priority,
        description: req.body.description,
      },
    );

    const updatedTvPlans = await TVPlan.find();
    const updatedInternetPlans = await InternetPlan.find();
    const updatedCelPlans = await CelPlan.find();

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
    const plans = await TVPlan.find();

    return res.status(200).json(plans);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const toggleArchivatedPlan = async (req, res) => {
  const { id, isAll } = req.body;

  try {
    const planSelected = await TVPlan.findById(id);

    if (!planSelected) {
      return res.status(404).json({ message: "Plano não encontrado" });
    }

    planSelected.archived = !planSelected.archived;
    planSelected.archivedAt = dayjs().format("DD/MM/YYYY");

    await planSelected.save();

    const updatedTvPlans = await TVPlan.find();
    const updatedInternetPlans = await InternetPlan.find();
    const updatedCelPlans = await CelPlan.find();

    const allUpdatedPlans = [
      ...updatedInternetPlans,
      ...updatedCelPlans,
      ...updatedTvPlans,
    ];

    if (isAll) {
      return res.status(200).json(allUpdatedPlans);
    }

    return res.status(200).json(updatedTvPlans);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const filterPlan = async (req, res) => {
  const { cep, provider, cost, devicesQuant } = req.body;

  // TODO check if error on cep filter
  try {
    const plans = await TVPlan.find({
      cost: { $lt: cost + 1 },
      devicesQuant,
      archived: false,
    });

    const allProviders = await Provider.find();

    const providerFiltered = allProviders.filter((providerFilter) => {
      if (provider?.length === 0 && providerFilter.locations.includes(cep)) {
        return providerFilter;
      }

      return (
        provider.includes(providerFilter.providerName) &&
        providerFilter.locations.includes(cep)
      );
    });

    const plansProviderFiltered = plans.filter((plan) => {
      return providerFiltered.some((prov) => {
        return prov._id.equals(plan.provider);
      });
    });

    const plansFiltered = plansProviderFiltered.filter((plan) => {
      return plan;
    });

    return res.status(200).json(plansFiltered);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deletePlan = async (req, res) => {
  const { id, isAll } = req.body;

  try {
    const planSelected = await TVPlan.findById(id);

    await Provider.findOneAndUpdate(
      {
        _id: planSelected.provider,
      },
      {
        $inc: {
          plansQuant: -1,
        },
      },
    );

    await TVPlan.findOneAndDelete({ _id: id });

    const updatedCelPlans = await CelPlan.find();
    const updatedInternetPlans = await InternetPlan.find();
    const updatedTvPlans = await TVPlan.find();

    const allUpdatedPlans = [
      ...updatedInternetPlans,
      ...updatedCelPlans,
      ...updatedTvPlans,
    ];

    if (isAll) {
      return res.status(200).json(allUpdatedPlans);
    }

    return res.status(200).json(updatedTvPlans);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
