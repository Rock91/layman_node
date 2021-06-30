const mongoose = require("mongoose");

const medicineCartSchema = mongoose.Schema(
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
    medicalUser: {
      type: mongoose.Schema.Types.ObjectId,
      sparse: true,
      ref: "medicalUsers",
    },
    medicine: {
      type: String,
      trim: true,
    },
    componeyName: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      index: true,
      default: "Tablet",
      enum: [
        "Liquid",
        "Tablet",
        "Capsules",
        "Topical medicines",
        "Suppositories",
        "Drops",
        "Inhalers",
        "Injections",
      ],
    },
    quantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    GST: {
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

module.exports = medicineCartSchema;
