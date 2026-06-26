const express = require("express");

const {
  fetchRecommendations,
} = require(
  "../controllers/recommendationController"
);

const router = express.Router();

router.get("/", fetchRecommendations);

module.exports = router;