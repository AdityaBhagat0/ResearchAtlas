const express = require("express");

const {
  createCollection,
  getCollections,
  deleteCollection,
  addPaperToCollection,
  getCollectionPapers,
} = require("../controllers/collectionController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Collections
router.post(
  "/",
  protect,
  createCollection
);

router.get(
  "/",
  protect,
  getCollections
);

router.delete(
  "/:id",
  protect,
  deleteCollection
);

// Collection Papers
router.post(
  "/:id/papers",
  protect,
  addPaperToCollection
);

router.get(
  "/:id/papers",
  protect,
  getCollectionPapers
);

module.exports = router;