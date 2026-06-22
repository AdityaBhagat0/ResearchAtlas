const mongoose = require("mongoose");

const collectionPaperSchema =
  new mongoose.Schema(
    {
      collectionId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Collection",
  required: true,
},

      paperId: String,

      title: String,

      authors: [String],

      source: String,

      year: Number,
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "CollectionPaper",
  collectionPaperSchema
);