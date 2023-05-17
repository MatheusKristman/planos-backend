import Provider from "../models/Provider.js";
import InternetPlan from "../models/InternetPlan.js";

export const createPlan = async (req, res) => {
  const {
    providerId,
    title,
    cost,
    download,
    upload,
    franchiseLimit,
    tecnology,
    hasWifi,
    priority,
    description,
  } = req.body;

  try {
    const planAlreadyExists = await InternetPlan.findOne({ title });

    if (planAlreadyExists) {
      return res.status(405).json({ message: "Plano já existe" });
    }

    const newPlan = new InternetPlan({
      provider: providerId,
      title,
      cost,
      download,
      upload,
      franchiseLimit,
      tecnology,
      hasWifi,
      priority,
      description,
    });

    await newPlan.save();

    const plans = await InternetPlan.find();

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
    download,
    upload,
    franchiseLimit,
    tecnology,
    hasWifi,
    priority,
    description,
  } = req.body;

  try {
    await InternetPlan.findOneAndUpdate(
      { _id: id },
      {
        title,
        cost,
        download,
        upload,
        franchiseLimit,
        tecnology,
        hasWifi,
        priority,
        description,
      }
    );

    const plans = await InternetPlan.find();

    return res.status(200).json(plans);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllPlans = async (req, res) => {
  try {
    const plans = await InternetPlan.find();

    return res.status(200).json(plans);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const toggleArchivatedPlan = async (req, res) => {
  const { id } = req.body;

  try {
    const planSelected = await InternetPlan.findById(id);

    if (!planSelected) {
      return res.status(404).json({ message: "Plano não encontrado" });
    }

    planSelected.archived = !planSelected.archived;

    await planSelected.save();

    const plans = await InternetPlan.find();

    return res.status(200).json(plans);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const filterPlan = async (req, res) => {
  const { cep, provider, cost, download, upload, tecnology, hasWifi } =
    req.body;

  try {
    const plans = await InternetPlan.find({
      cost: { $lt: cost + 1 },
      download: { $lt: download + 1 },
      upload: { $lt: upload + 1 },
      hasWifi,
    });

    const allProviders = await Provider.find();

    const providerFiltered = allProviders.filter((providerFilter) => {
      return (
        provider.includes(providerFilter.providerName) &&
        providerFilter.locations.includes(cep)
      );
    });

    const plansProviderFilter = plans.filter((plan) => {
      return providerFiltered.some((prov) => {
        return prov._id.equals(plan.provider);
      });
    });

    const plansFiltered = plansProviderFilter.filter((plan) => {
      return tecnology.includes(plan.tecnology);
    });

    return res.status(200).json(plansFiltered);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
