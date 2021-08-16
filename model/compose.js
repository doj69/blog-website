const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema Model
const publishSchema = new Schema({
  title: {
    type: String,
    required: [true, "The title can't be empty"],
  },
  content: {
    type: String,
    required: [true, "The content can't be empty"],
  },
});

const Publish = mongoose.model("Publish", publishSchema);
module.exports = Publish;
