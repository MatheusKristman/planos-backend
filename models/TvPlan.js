import { Schema, model } from "mongoose";
import dayjs from "dayjs";

const tvPlanSchema = new Schema({
  provider: {
    type: Schema.Types.ObjectId,
    ref: "Provider",
  },
  providerIcon: {
    type: String,
    required: [true, "Icone da operadora é obrigatório"],
  },
  title: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  afterCost: {
    type: Number,
    default: 0,
  },
  periodToChangeCost: {
    type: Number,
    default: 0,
  },
  installationCost: {
    type: String,
    required: true,
  },
  devicesQuant: {
    type: Number,
    required: true,
  },
  benefits: {
    type: Array,
    default: [],
  },
  priority: {
    type: Number,
    required: true,
  },
  description: {
    type: Array,
    required: true,
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
  archivedAt: {
    type: String,
  },
  category: {
    type: String,
    default: "TV",
  },
});

const TVPlan = model("TVPlan", tvPlanSchema);

export default TVPlan;
