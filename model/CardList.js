const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,

  title: {
    type: String,
  },
  cards: [
    {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("list", ListSchema);
