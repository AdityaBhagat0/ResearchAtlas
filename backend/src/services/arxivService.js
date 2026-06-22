const axios = require("axios");
const xml2js = require("xml2js");

const searchArxiv = async (query) => {
  try {
    const response = await axios.get(
      `http://export.arxiv.org/api/query?search_query=all:${query}&start=0&max_results=20`
    );

    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(response.data);

    return result.feed.entry || [];
  } catch (error) {
    throw error;
  }
};

module.exports = searchArxiv;