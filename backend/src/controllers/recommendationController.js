const {
  getRecommendations,
} = require("../services/recommendationService");

const fetchRecommendations = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const recommendations =
      await getRecommendations(title);

    res.status(200).json({
      success: true,
      count: recommendations.length,
      recommendations,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  fetchRecommendations,
};