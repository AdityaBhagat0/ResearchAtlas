const axios = require("axios");

const searchOpenAlex = async ({
  query,
  page = 1,
  limit = 10,
  sort = "relevance",
}) => {
  try {
    const params = {
      search: query,
      page,
      per_page: limit,
    };

    if (sort === "citations") {
      params.sort = "cited_by_count:desc";
    }

    if (sort === "year") {
      params.sort = "publication_year:desc";
    }

    const response = await axios.get(
      "https://api.openalex.org/works",
      { params }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = searchOpenAlex;