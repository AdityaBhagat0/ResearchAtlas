const express = require("express");

const {
  searchResearch,
} = require("../controllers/searchController");

const router = express.Router();

router.get("/", searchResearch);

module.exports = router;