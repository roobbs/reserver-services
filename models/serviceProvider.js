const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const providerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: String,
  location: String,
  contactInfo: String,
  availability: [String],
  ratings: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, min: 1, max: 5 },
      comment: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  servicesOffered: [{ type: Schema.Types.ObjectId, ref: "Service" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ServiceProvider", providerSchema);
