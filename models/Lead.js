import mongoose from "mongoose";

const leadScheme = new mongoose.Schema({
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
    type: String,
    required: true,
  },
});

const Lead = mongoose.model("Lead", leadScheme);

export default Lead;
