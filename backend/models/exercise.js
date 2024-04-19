const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const exerciseSchema = new Schema({
 title: { type: String, trim: true, required: true },
 description: { type: String, trim: true, required: true },
 reps: { type: Number, required: true },
 rest: {type: String, trim: true, required: true}
});

module.exports = mongoose.model("exercise", exerciseSchema);
