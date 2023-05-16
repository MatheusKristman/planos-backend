import { Schema, model } from "mongoose";
import dayjs from "dayjs";

const telephonePlanSchema = new Schema({
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
  benefit: {
    type: String,
    required: [true, "Beneficio do plano é obrigatório!"],
  },
  benefitDetails: {
    type: String,
    required: [true, "Detalhes do beneficio do plano é obrigatório!"],
  },
  unlimitedCall: {
    type: Boolean,
    required: [
      true,
      "Confirmação de ligações ilimitadas do plano é obrigatório!",
    ],
  },
  priority: {
    type: Number,
    required: [true, "Numero de prioridade do plano é obrigatório!"],
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

const TelephonePlan = model("TelephonePlan", telephonePlanSchema);

export default TelephonePlan;
