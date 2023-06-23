import ClientPF from "../models/ClientPF.js";
import CelPlan from "../models/CelPlan.js";
import InternetPlan from "../models/InternetPlan.js";
import TVPlan from "../models/TvPlan.js";

export const registerClient = async (req, res) => {
  try {
    const regName = /^[A-Za-zÀ-Úà-ú]+(?:\s+[A-Za-zÀ-Úà-ú]+)+$/;

    if (!regName.test(req.body.name)) {
      return res
        .status(406)
        .json({ message: "Nome invalido!", registered: false });
    }

    if (!regName.test(req.body.motherName)) {
      return res
        .status(406)
        .json({ message: "Nome da mãe invalido!", registered: false });
    }

    const newClient = new ClientPF({
      name: req.body.name,
      rg: req.body.rg || "",
      cpf: req.body.cpf,
      dateOfBirth: req.body.dateOfBirth,
      motherName: req.body.motherName,
      tel1: req.body.tel1,
      tel2: req.body.tel2 || "",
      state: req.body.state,
      city: req.body.city,
      cep: req.body.cep,
      address: req.body.address,
      addressNumber: req.body.addressNumber,
      complement: req.body.complement || "",
      paymentDate: req.body.paymentDate,
      paymentMethod: req.body.paymentMethod,
      bank: req.body.bank || "",
      agency: req.body.agency || "",
      bankAccount: req.body.bankAccount || "",
      accountOwner: req.body.accountOwner || "",
      installationDate1: req.body.installationDate1,
      installationDate2: req.body.installationDate2,
      installationPeriod: req.body.installationPeriod,
      plan: req.body.planId,
    });

    console.log(req.body.planType);

    if (req.body.planType === "internetPlan") {
      await InternetPlan.findOneAndUpdate(
        { _id: req.body.planId },
        {
          $inc: {
            contacts: 1,
          },
        }
      );
    }

    if (req.body.planType === "celPlan") {
      await CelPlan.findOneAndUpdate(
        { _id: req.body.planId },
        {
          $inc: {
            contacts: 1,
          },
        }
      );
    }

    if (req.body.planType === "tvPlan") {
      await TVPlan.findOneAndUpdate(
        { _id: req.body.planId },
        {
          $inc: {
            contacts: 1,
          },
        }
      );
    }

    await newClient.save();

    return res.status(200).json({ registered: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, registered: false });
  }
};

export const getAllClients = async (req, res) => {
  try {
    const clients = await ClientPF.find();

    return res.status(200).json(clients);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
