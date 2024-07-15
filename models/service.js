const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  duration: { type: Number, required: true }, // Duration in minutes
  price: { type: Number, required: true },
  providerId: {
    type: Schema.Types.ObjectId,
    ref: "ServiceProvider",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Service", serviceSchema);
