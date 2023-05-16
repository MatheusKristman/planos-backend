import { Schema, model } from "mongoose";

const providerSchema = new Schema({
  providerLogo: {
    type: String,
    required: [true, "Logo da operadora é obrigatório!"],
  },
  providerName: {
    type: String,
    required: [true, "Nome da operadora é obrigatório!"],
  },
  locations: {
    type: Array,
    required: [true, "Ceps de cobertura são obrigatórios!"],
  },
  plansQuant: {
    type: Number,
    default: 0,
  },
});

const Provider = model("Provider", providerSchema);

export default Provider;
