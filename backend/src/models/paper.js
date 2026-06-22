const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },

    abstract: {
        type: String,
        required: true
    },

    authors: [{
        type: String
    }],

    keywords: [{
        type: String
    }],

    publicationYear: {
        type: Number
    },

    researchDomain: {
        type: String
    },

    pdfPath: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "Paper",
    paperSchema
);