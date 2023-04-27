import Plan from '../models/Plan.js';

export const getAll = async (req, res) => {
    try {
        const plans = await Plan.find();

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
            return res.status(405).json({ message: 'Plano já criado' });
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

export const toggleArchivatedPlan = async (req, res) => {
    try {
        const { id } = req.body;
        const planSelected = await Plan.findOne({ _id: id });

        if (!planSelected) {
            return res.status(404).json({ message: 'Plano não encontrado' });
        }

        planSelected.archived = !planSelected.archived;

        await planSelected.save();

        const plans = await Plan.find();

        return res.status(200).json(plans);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

export const editPlan = async (req, res) => {
    try {
        const {
            id,
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

        await Plan.findOneAndUpdate(
            { _id: id },
            {
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
            }
        );

        const plans = await Plan.find();

        return res.status(200).json(plans);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

export const filterPlan = async (req, res) => {
    try {
        const {
            city,
            lines,
            cost,
            franchise,
            provider,
            planType,
            unlimitedApps,
        } = req.body;

        const plans = await Plan.find({
            city,
            lines,
            cost: { $lt: cost + 1 },
            franchise: { $lt: franchise + 1 },
            archived: false,
        });

        const planFiltered = plans.filter((plan) => {
            if (
                provider.includes(plan.provider) &&
                planType.includes(plan.planType)
            ) {
                return plan.unlimitedApps.filter((el) => {
                    if (unlimitedApps.includes(el)) {
                        return plan;
                    }
                });
            }
        });

        return res.status(200).json(planFiltered);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};
