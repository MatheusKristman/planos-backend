import Provider from "../models/Provider.js";
import InternetPlan from "../models/InternetPlan.js";
import CelPlan from "../models/CelPlan.js";
import TVPlan from "../models/TvPlan.js";
import dayjs from "dayjs";
import { model } from "mongoose";

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

  try {
    const planAlreadyExists = await InternetPlan.findOne({ title });
    const provider = await Provider.findOneAndUpdate(
      { _id: providerId },
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

  try {
    const planAlreadyExists = await InternetPlan.findOne({ title });

    console.log(planAlreadyExists?._id);

    if (planAlreadyExists) {
      if (!planAlreadyExists._id.equals(id)) {
        return res.status(405).json({ message: "Plano já existe" });
      }
    }

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
      },
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
  const { cep, provider, cost, download, technology } = req.body;

  try {
    const plans = await InternetPlan.find({
      cost: { $lt: cost + 1 },
      archived: false,
    });

    const plansDownloadFiltered = plans.filter((plan) => {
      if (
        parseInt(download.substring(0, download.length - 2)) > 500 &&
        plan.download.substring(
          plan.download.length - 2,
          plan.download.length,
        ) === "GB" &&
        parseInt(plan.download.substring(0, plan.download.length - 2)) <=
          parseInt(download.substring(0, download.length - 2))
      ) {
        return plan;
      }

      if (
        parseInt(download.substring(0, download.length - 2)) > 500 &&
        plan.download.substring(
          plan.download.length - 2,
          plan.download.length,
        ) === "MB" &&
        parseInt(plan.download.substring(0, plan.download.length - 2)) <=
          parseInt(download.substring(0, download.length - 2))
      ) {
        return plan;
      }

      if (
        parseInt(plan.download.substring(0, plan.download.length - 2)) <=
        parseInt(download.substring(0, download.length - 2))
      ) {
        return plan;
      }
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

    console.log("providerFiltered: ", providerFiltered);

    const plansProviderFilter = plansDownloadFiltered.filter((plan) => {
      return providerFiltered.some((prov) => {
        return prov._id.equals(plan.provider);
      });
    });

    const plansFiltered = plansProviderFilter.filter((plan) => {
      if (technology.length === 0) {
        return plan;
      }

      if (technology.includes(plan.technology)) {
        return plan;
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
    const planSelected = await InternetPlan.findById(id);

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
