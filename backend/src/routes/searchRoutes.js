const express = require("express");

const {
  searchResearch,
} = require("../controllers/searchController");
const {
  expandQuery,
} = require("../services/aiSearchService");
const router = express.Router();
const {
  semanticSearch,
} = require("../services/aiSearchService");
router.get("/semantic", async (req, res) => {
  try {
    const results = await semanticSearch(
      req.query.q
    );

    res.json({
      success: true,
      count: results.length,
      results,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
router.get("/", searchResearch);
router.get("/test-ai", async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: "Query parameter q is required"
            });
        }

        const expandedQueries = await expandQuery(q);

        res.status(200).json({
            success: true,
            originalQuery: q,
            expandedQueries
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
module.exports = router;