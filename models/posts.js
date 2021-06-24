const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  type: { type: String, default: "Point" },
  coordinates: [Number],
});
const postSchema = mongoose.Schema(
  {
    crby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    location2: locationSchema,
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
postSchema.index({ "location.coordinates": "2d" });
postSchema.index({ location2: "2dsphere" });

module.exports = postSchema;
