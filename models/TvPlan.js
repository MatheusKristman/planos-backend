import { Schema, model } from "mongoose";
import dayjs from "dayjs";

const tvPlanSchema = new Schema({
  provider: {
    type: Schema.Types.ObjectId,
    ref: "Provider",
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
    type: String,
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
});

const TVPlan = model("TVPlan", tvPlanSchema);

export default TVPlan;
