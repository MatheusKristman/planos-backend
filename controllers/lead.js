import Lead from "../models/Lead.js";
import Plan from "../models/Plan.js";

export const registerLead = async (req, res) => {
  try {
    const { name, cpf, dateOfBirth, motherName, cel, planId } = req.body;
    const regName = /^[A-Za-z]+(?:\s+[A-Za-z]+)+$/;

    if (!regName.test(name)) {
      return res
        .status(406)
        .json({ message: "Nome invalido", registered: false });
    }

    if (!regName.test(motherName)) {
      return res
        .status(406)
        .json({ message: "Nome da mãe invalido", registered: false });
    }

    const newLead = new Lead({
      name,
      cpf,
      dateOfBirth,
      motherName,
      cel,
      plan: planId,
    });

    await Plan.findOneAndUpdate(
      { _id: planId },
      {
        $inc: {
          contacts: 1,
        },
      }
    );

    await newLead.save();

    return res.status(200).json({ registered: true });
  } catch (err) {
    return res.status(400).json({ message: err.message, registered: false });
  }
};

export const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find();

    return res.status(200).json(leads);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};