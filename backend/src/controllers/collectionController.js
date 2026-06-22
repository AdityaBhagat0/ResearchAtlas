const Collection = require("../models/Collection");
const CollectionPaper = require("../models/CollectionPaper");

// Create Collection
const createCollection = async (req, res) => {
  try {
    const { name, description } = req.body;

    const collection = await Collection.create({
      user: req.user.id,
      name,
      description,
    });

    res.status(201).json({
      success: true,
      collection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get User Collections
const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find({
      user: req.user.id,
    });

    res.status(200).json({
      success: true,
      collections,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Collection
const deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(
      req.params.id
    );

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    if (
      collection.user.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await Collection.findByIdAndDelete(
      req.params.id
    );

    await CollectionPaper.deleteMany({
      collection: req.params.id,
    });

    res.status(200).json({
      success: true,
      message: "Collection deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Paper To Collection
const addPaperToCollection = async (
  req,
  res
) => {
  try {
    const collection =
      await Collection.findById(
        req.params.id
      );

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    const paper =
      await CollectionPaper.create({
        collectionId: req.params.id,
        ...req.body,
      });

    res.status(201).json({
      success: true,
      paper,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Papers In Collection
const getCollectionPapers = async (
  req,
  res
) => {
  try {
    const papers =
      await CollectionPaper.find({
        collectionId: req.params.id,
      });

    res.status(200).json({
      success: true,
      papers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCollection,
  getCollections,
  deleteCollection,
  addPaperToCollection,
  getCollectionPapers,
};