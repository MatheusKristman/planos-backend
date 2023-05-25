import Provider from '../models/Provider.js';
import TVPlan from '../models/TvPlan.js';

export const createPlan = async (req, res) => {
  try {
    const planAlreadyExists = await TVPlan.findOne({ title: req.body.title });

    if (planAlreadyExists) {
      return res.status(405).json({ message: 'Plano já existe' });
    }

    const newPlan = await TVPlan.create({
      provider: req.body.providerId,
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

    const plans = await TVPlan.find();

    return res.status(200).json(plans);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const editPlan = async (req, res) => {
  try {
    const planSelected = await TVPlan.findOneAndUpdate(
      { _id: req.body.providerId },
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
      }
    );

    const plans = await TVPlan.find();

    return res.status(200).json(plans);
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
  const { id } = req.body;

  try {
    const planSelected = await TVPlan.findById(id);

    if (!planSelected) {
      return res.status(404).json({ message: 'Plano não encontrado' });
    }

    planSelected.archived = !planSelected.archived;

    await planSelected.save();

    const plans = await TVPlan.find();

    return res.status(200).json(plans);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const filterPlan = async (req, res) => {
  const { cep, provider, cost, devicesQuant, benefits } = req.body;

  try {
    const plans = await TVPlan.find({
      cost: { $lt: cost + 1 },
      devicesQuant,
      archived: false,
    });

    const allProviders = await Provider.find();

    const providerFiltered = allProviders.filter((providerFilter) => {
      return (
        provider.includes(providerFilter.providerName) && providerFilter.locations.includes(cep)
      );
    });

    const plansProviderFiltered = plans.filter((plan) => {
      return providerFiltered.some((prov) => {
        return prov._id.equals(plan.provider);
      });
    });

    const plansFiltered = plansProviderFiltered.filter((plan) => {
      return plan.benefits.some((el) => {
        if (benefits.includes(el)) {
          return plan;
        }
      });
    });

    return res.status(200).json(plansFiltered);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
