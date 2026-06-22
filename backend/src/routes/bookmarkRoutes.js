const express = require("express");

const {
  addBookmark,
  getBookmarks,
  deleteBookmark,
} = require("../controllers/bookmarkController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Add Bookmark
router.post(
  "/",
  protect,
  addBookmark
);

// Get All Bookmarks of Logged-in User
router.get(
  "/",
  protect,
  getBookmarks
);

// Delete Bookmark
router.delete(
  "/:id",
  protect,
  deleteBookmark
);

module.exports = router;