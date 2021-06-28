const mongoose = require("mongoose");

const medicineSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },
    componeyName: {
      type: String,
      trim: true,
      index: true,
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
    isVerify: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = medicineSchema;
