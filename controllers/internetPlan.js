import Provider from "../models/Provider.js";
import InternetPlan from "../models/InternetPlan.js";
import CelPlan from "../models/CelPlan.js";
import TVPlan from "../models/TvPlan.js";
import dayjs from "dayjs";

export const createPlan = async (req, res) => {
  const {
    providerId,
    title,
    cost,
    installationCost,
    download,
    upload,
    franchiseLimit,
    technology,
    hasWifi,
    benefits,
    priority,
    description,
  } = req.body;

  console.log(req.body);

  try {
    const planAlreadyExists = await InternetPlan.findOne({ title });
    const provider = await Provider.findById(providerId);

    if (planAlreadyExists) {
      return res.status(405).json({ message: "Plano já existe" });
    }

    const newPlan = new InternetPlan({
      provider: providerId,
      providerIcon: provider.providerLogo,
      title,
      cost,
      installationCost,
      download,
      upload,
      franchiseLimit,
      technology,
      hasWifi,
      benefits,
      priority,
      description,
    });

    await newPlan.save();

    const updatedInternetPlans = await InternetPlan.find();
    const updatedCelPlans = await CelPlan.find();
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
    installationCost,
    download,
    upload,
    franchiseLimit,
    technology,
    hasWifi,
    benefits,
    priority,
    description,
  } = req.body;

  const planAlreadyExists = await InternetPlan.findOne({ title });

  if (planAlreadyExists) {
    return res.status(405).json({ message: "Título desse plano já existe" });
  }

  console.log(req.body);

  try {
    await InternetPlan.findOneAndUpdate(
      { _id: id },
      {
        title,
        cost,
        installationCost,
        download,
        upload,
        franchiseLimit,
        technology,
        hasWifi,
        benefits,
        priority,
        description,
      }
    );

    const updatedInternetPlans = await InternetPlan.find();
    const updatedCelPlans = await CelPlan.find();
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
    planSelected.archivedAt = dayjs().format("DD/MM/YYYY");

    await planSelected.save();

    const updatedInternetPlans = await InternetPlan.find();
    const updatedCelPlans = await CelPlan.find();
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
  const {
    cep,
    provider,
    cost,
    download,
    upload,
    technology,
    hasWifi,
    benefits,
  } = req.body;

  try {
    const plans = await InternetPlan.find({
      cost: { $lt: cost + 1 },
      hasWifi,
      archived: false,
    });

    const plansDownloadAndUploadFiltered = plans.filter((plan) => {
      if (
        parseInt(plan.download.substring(0, plan.download.length - 2)) <
          parseInt(download.substring(0, download.length - 2)) &&
        parseInt(plan.upload.substring(0, plan.upload.length - 2)) <
          parseInt(upload.substring(0, upload.length - 2))
      ) {
        return plan;
      }
    });

    const allProviders = await Provider.find();

    const providerFiltered = allProviders.filter((providerFilter) => {
      return (
        provider.includes(providerFilter.providerName) &&
        providerFilter.locations.includes(cep)
      );
    });

    const plansProviderFilter = plansDownloadAndUploadFiltered.filter(
      (plan) => {
        return providerFiltered.some((prov) => {
          return prov._id.equals(plan.provider);
        });
      }
    );

    const plansFiltered = plansProviderFilter.filter((plan) => {
      if (technology.includes(plan.technology)) {
        return plan.benefits.some((el) => {
          if (benefits.includes(el)) {
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

  try {
    await InternetPlan.findOneAndDelete({ _id: id });

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
