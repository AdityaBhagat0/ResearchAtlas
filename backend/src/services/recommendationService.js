const axios = require("axios");
const {
  calculateScore,
} = require("../utils/scoring");
const getRecommendations = async (title) => {
  try {
    // Search the original paper
    const searchResponse = await axios.get(
      `https://api.openalex.org/works`,
      {
        params: {
          search: title,
          per_page: 1,
        },
      }
    );

    const paper = searchResponse.data.results[0];

    if (!paper) {
      return [];
    }

    // Extract top concepts
    const concepts = paper.concepts
      ?.slice(0, 3)
      .map((c) => c.display_name)
      .join(" ");

    if (!concepts) {
      return [];
    }

    // Search using concepts
    const recommendationResponse = await axios.get(
      `https://api.openalex.org/works`,
      {
        params: {
          search: concepts,
          per_page: 10,
          sort: "cited_by_count:desc",
        },
      }
    );

    const recommendations =
  recommendationResponse.data.results
    .filter((p) => p.id !== paper.id)
    .map((p) => ({
      id: p.id,
      title: p.title,
      year: p.publication_year,
      citations: p.cited_by_count,
      source:
        p.primary_location?.source?.display_name ||
        "Unknown",
      authors:
        p.authorships?.map(
          (a) => a.author.display_name
        ) || [],
      score: calculateScore(p),
      openAlexUrl: p.id,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
    return recommendations;

  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

module.exports = {
  getRecommendations,
};