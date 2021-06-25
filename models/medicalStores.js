const mongoose = require("mongoose");

const proofSchema = mongoose.Schema({
  type: {
    type: String,
    index: true,
    default: "card",
    enum: ["card", "gst", "certificate", "electricCityProf"],
  },
  source: {
    type: String,
  },
});
const medicalStoreSchema = mongoose.Schema(
  {
    storeName: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },
    address1: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
    },
    address2: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
    },
    area: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
    },
    pincode: {
      type: Number,
      trim: true,
      minlength: 1,
      maxlength: 7,
    },
    city: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
    },
    state: {
      type: String,
      trim: true,
      lowercase: true,
    },
    country: {
      type: String,
      trim: true,
      lowercase: true,
    },
    ownerName: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },
    ownerDOB: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },
    proof: [proofSchema],
    email: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },
    mobileNumber: {
      type: Number,
      trim: true,
      lowercase: true,
      index: true,
      unique: true,
      sparse: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isRejected: {
      type: Boolean,
      default: false,
    },
    rejectionReason: {
      type: String,
      default: "",
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    crby: { type: mongoose.Schema.Types.ObjectId, ref: "medicalUsers" },
  },
  {
    timestamps: true,
  }
);

module.exports = medicalStoreSchema;
