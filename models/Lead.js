import { Schema, model } from "mongoose";

const leadScheme = new Schema({
  name: {
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
  cel: {
    type: String,
    required: true,
  },
  plan: {
    type: Schema.Types.ObjectId,
    ref: "CelPlan" || "InternetPlan" || "TelephonePlan",
  },
});

const Lead = model("Lead", leadScheme);

export default Lead;
