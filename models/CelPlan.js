import { Schema, model } from "mongoose";
import dayjs from "dayjs";

const celPlanSchema = new Schema({
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
  period: {
    type: String,
    required: [true, "Periodo de pagamento do plano é obrigatório!"],
  },
  franchise: {
    type: Number,
    required: [true, "Franquia de internet do plano é obrigatório!"],
  },
  lines: {
    type: Number,
    required: [true, "Numero de linhas do plano é obrigatório!"],
  },
  unlimitedApps: {
    type: Array,
    default: [],
  },
  unlimitedCall: {
    type: Boolean,
    required: [true, "Ligações ilimitadas do plano é obrigatório!"],
  },
  planType: {
    type: String,
    required: [true, "Tipo do plano é obrigatório!"],
  },
  priority: {
    type: Number,
    required: [true, "Numero da prioridade é obrigatório!"],
  },
  description: {
    type: String,
    required: [true, "descrição do plano é obrigatório!"],
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

const CelPlan = model("CelPlan", celPlanSchema);

export default CelPlan;
