import { Schema, model } from "mongoose";
import dayjs from "dayjs";

const internetPlanSchema = new Schema({
  provider: {
    type: Schema.Types.ObjectId,
    ref: "Provider",
  },
  title: {
    type: String,
    required: [true, "Titulo do plano é obrigatório!"],
  },
  cost: {
    type: Number,
    required: [true, "Valor do plano é obrigatório!"],
  },
  download: {
    type: String,
    required: [true, "Download de velocidade do plano é obrigatório!"],
  },
  upload: {
    type: String,
    required: [true, "Upload de velocidade do plano é obrigatório!"],
  },
  franchiseLimit: {
    type: String,
    required: [true, "Limite de Franquia do plano é obrigatório!"],
  },
  tecnology: {
    type: String,
    required: [true, "Tecnologia do plano é obrigatório!"],
  },
  hasWifi: {
    type: Boolean,
    required: [true, "Confirmação de wifi é obrigatório!"],
  },
  priority: {
    type: Number,
    required: [true, "Numero da prioridade é obrigatório!"],
  },
  description: {
    type: String,
    required: [true, "Descrição do plano é obrigatório!"],
  },
  contacts: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: String,
    default: dayjs().format("DD/MM/YYYY"),
  },
  archived: {
    type: Boolean,
    default: false,
  },
});

const InternetPlan = model("InternetPlan", internetPlanSchema);

export default InternetPlan;
