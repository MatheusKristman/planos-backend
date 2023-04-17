import mongoose from 'mongoose';
import dayjs from 'dayjs';

const planScheme = new mongoose.Schema(
    {
        city: {
            type: String,
            required: true,
        },
        provider: {
            type: String,
            required: true,
        },
        providerLogo: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        cost: {
            type: Number,
            required: true,
        },
        period: {
            type: String,
            required: true,
        },
        franchise: {
            type: Number,
            required: true,
        },
        unlimitedApps: {
            type: Array,
            default: [],
        },
        unlimitedCall: {
            type: Boolean,
            default: false,
        },
        planType: {
            type: String,
            required: true,
        },
        priority: {
            type: Number,
            default: 1,
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
            default: dayjs().format('DD/MM/YYYY'),
        },
        lines: {
            type: Number,
            required: true,
        },
        archived: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Plan = mongoose.model('Plan', planScheme);

export default Plan;
