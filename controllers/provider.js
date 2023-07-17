import Provider from "../models/Provider.js";
import InternetPlan from "../models/InternetPlan.js";
import CelPlan from "../models/CelPlan.js";
import TVPlan from "../models/TvPlan.js";

export const createProvider = async (req, res) => {
  const { providerName, locations } = req.body;

  try {
    const providerAlreadyExists = await Provider.findOne({ providerName });

    if (providerAlreadyExists) {
      return res.status(405).json({ message: "Operadora já existe" });
    }

    const newProvider = new Provider({
      providerLogo: req.file.filename,
      providerName,
      locations,
    });

    await newProvider.save();

    const providers = await Provider.find();

    return res.status(200).json(providers);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const editProvider = async (req, res) => {
  const { providerName, locations, providerId } = req.body;

  try {
    const providerNameAlreadyTaken = await Provider.findOne({ providerName });

    console.log(providerNameAlreadyTaken._id);
    console.log(providerId);

    if (!providerNameAlreadyTaken._id.equals(providerId)) {
      // verificar se o nome que achou tem o mesmo id
      return res.status(405).json({ message: "Nome já utilizado" });
    }

    const providerSelected = await Provider.findById(providerId);

    console.log(providerSelected);

    if (req.file) {
      providerSelected.providerLogo = req.file.filename;
    }

    providerSelected.providerName = providerName;
    providerSelected.locations = locations;

    await providerSelected.save();

    const providers = await Provider.find();

    return res.status(200).json(providers);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllProviders = async (req, res) => {
  try {
    const providers = await Provider.find();

    return res.status(200).json(providers);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteProvider = async (req, res) => {
  try {
    const { id } = req.params;

    await InternetPlan.deleteMany({ provider: id });
    await CelPlan.deleteMany({ provider: id });
    await TVPlan.deleteMany({ provider: id });
    await Provider.findByIdAndDelete(id);

    const providers = await Provider.find();

    return res.status(200).json(providers);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
