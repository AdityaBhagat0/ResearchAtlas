const mongoose = require("mongoose");

const collectionSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      name: {
        type: String,
        required: true,
      },

      description: String,
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Collection",
  collectionSchema
);