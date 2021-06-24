const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
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
  },
  { _id: false }
);
const medicalStoreSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 50,
      // default: ''
    },
    lastName: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 50,
      // default: ''
    },
    storeName: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },
    address: {
      type: addressSchema,
      default: [],
    },
    mobileNumber: {
      type: Number,
      trim: true,
      lowercase: true,
      index: true,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      trim: true,
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
  },
  {
    timestamps: true,
  }
);

module.exports = medicalStoreSchema;
