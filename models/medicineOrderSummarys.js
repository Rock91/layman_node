const mongoose = require("mongoose");

const medicineOrderSummarysSchema = mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      ref: "medicalPatients",
    },
    medicalStore: {
      type: mongoose.Schema.Types.ObjectId,
      sparse: true,
      ref: "medicalStores",
    },
    medicine: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    GST: {
      type: Number,
      default: 0,
    },
    deliveryCharge: {
      type: Number,
      default: 0,
    },
    priceWithOutGST: {
      type: Number,
      default: 0,
    },
    finalPrice: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "created",
      enum: ["created", "checkout", "completed", "cancelled"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = medicineOrderSummarysSchema;
