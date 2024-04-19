const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientProfileSchema = new Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  goals: { type: String, required: true },
  injuries: { type: String, required: true },
  preferences: { type: String, required: true },
  restrictions: { type: String, required: true },
});

module.exports = mongoose.model("clientProfile", clientProfileSchema);
