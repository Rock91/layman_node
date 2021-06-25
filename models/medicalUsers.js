const mongoose = require("mongoose");

const medicalUsersSchema = mongoose.Schema(
  {
    mobileNumber: {
      type: Number,
      trim: true,
      lowercase: true,
      index: true,
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
    firstName: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },
    lastName: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },
    role: {
      type: String,
      index: true,
      default: "admin",
      enum: ["admin", "manager"],
    },
    medicalStore: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "medicalStores",
    },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "medicalUsers" },
    iseDelete: {
      type: Boolean,
      default: false,
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

module.exports = medicalUsersSchema;
