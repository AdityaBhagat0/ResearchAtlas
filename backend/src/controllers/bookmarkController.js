const Bookmark = require("../models/Bookmark");

const addBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.create({
      user: req.user.id,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      bookmark,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBookmarks = async (req, res) => {
  try {
    const bookmarks =
      await Bookmark.find({
        user: req.user.id,
      });

    res.status(200).json({
      success: true,
      bookmarks,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBookmark = async (req, res) => {
  try {
    await Bookmark.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Bookmark deleted",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addBookmark,
  getBookmarks,
  deleteBookmark,
};