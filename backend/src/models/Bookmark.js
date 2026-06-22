const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    paperId: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    authors: [String],

    source: String,

    year: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Bookmark",
  bookmarkSchema
);