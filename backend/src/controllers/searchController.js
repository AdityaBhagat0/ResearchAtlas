const searchOpenAlex = require("../services/openAlexService");

const searchResearch = async (req, res) => {
  try {
    const {
      q,
      page = 1,
      limit = 10,
      sort = "relevance",
    } = req.query;

    // Validate search query
    if (!q || q.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search query required",
      });
    }

    // Fetch data from OpenAlex
    const data = await searchOpenAlex({
      query: q,
      page,
      limit,
      sort,
    });

    const currentYear = new Date().getFullYear();

    // Format results and remove future-year papers
    const formattedPapers = data.results
      .filter(
        (paper) =>
          paper.publication_year &&
          paper.publication_year <= currentYear
      )
      .map((paper) => ({
        id: paper.id,

        title: paper.display_name,

        year: paper.publication_year,

        citations: paper.cited_by_count || 0,

        authors:
          paper.authorships?.map(
            (author) => author.author.display_name
          ) || [],

        doi: paper.doi,

        source:
          paper.primary_location?.source
            ?.display_name || null,

        pdfUrl:
          paper.primary_location?.pdf_url || null,

        openAlexUrl: paper.id,
      }));

    res.status(200).json({
      success: true,

      totalResults:
        data.meta?.count || formattedPapers.length,

      currentPage: Number(page),

      resultsPerPage: Number(limit),

      papers: formattedPapers,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  searchResearch,
};