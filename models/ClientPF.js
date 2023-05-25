import { Schema, model } from "mongoose";

const clientPFSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rg: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  tel1: {
    type: String,
    required: true,
  },
  tel2: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  cep: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  addressNumber: {
    type: String,
    required: true,
  },
  complement: {
    type: String,
    default: "",
  },
  paymentDate: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  bank: {
    type: String,
    default: "",
  },
  agency: {
    type: String,
    default: "",
  },
  bankAccount: {
    type: String,
    default: "",
  },
  accountOwner: {
    type: String,
    default: "",
  },
  installationDate1: {
    type: String,
    required: true,
  },
  installationDate2: {
    type: String,
    required: true,
  },
  installationPeriod: {
    type: String,
    required: true,
  },
  plan: {
    type: Schema.Types.ObjectId,
    ref: "CelPlan" || "InternetPlan" || "TelephonePlan",
  },
});

const ClientPF = model("ClientPF", clientPFSchema);

export default ClientPF;
