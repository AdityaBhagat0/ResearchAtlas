const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios=require("axios")
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});

const expandQuery = async (query) => {
  const prompt = `
You are an academic search assistant.

Expand the following research query into 5 related search terms.

Return ONLY a JSON array.

Query:
"${query}"

Example output:
[
  "deep learning in healthcare",
  "medical image analysis",
  "cnn for disease detection"
]
`;

  const result = await model.generateContent(prompt);

   const text = result.response
    .text()
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(text);
};
const semanticSearch = async (query) => {
  const expandedQueries = await expandQuery(query);

  const allPapers = [];

  for (const q of expandedQueries) {

    console.log("Searching:", q);

    try {

        const response = await axios.get(
            "https://api.openalex.org/works",
            {
                params: {
                    search: q,
                    per_page: 5,
                },
                headers: {
                    "User-Agent":
                        "ResearchAtlas/1.0 (your-email@gmail.com)",
                },
                timeout: 10000,
            }
        );

        allPapers.push(...response.data.results);

    } catch (error) {

        console.log(
            `Failed for "${q}":`,
            error.message
        );

    }
}

  // Remove duplicates
  const uniquePapers = [
    ...new Map(
      allPapers.map((paper) => [paper.id, paper])
    ).values(),
  ];

  // Sort by citations
  const originalQuery = query.toLowerCase();

function relevanceScore(paper) {
  let score = 0;

  const title = (paper.title || "").toLowerCase();

  // Exact keyword matches
  if (title.includes("plant")) score += 30;
  if (title.includes("disease")) score += 30;
  if (title.includes("crop")) score += 20;
  if (title.includes("agriculture")) score += 20;

  // Citations (max 20 bonus)
  score += Math.min(paper.cited_by_count / 500, 20);

  // Recency bonus
  const currentYear = new Date().getFullYear();
  score += Math.max(
    10 - (currentYear - paper.publication_year),
    0
  );

  return score;
}
uniquePapers.sort(
  (a, b) => relevanceScore(b) - relevanceScore(a)
);

  return uniquePapers.slice(0, 20).map((paper) => ({
    id: paper.id,
    title: paper.title,
    year: paper.publication_year,
    citations: paper.cited_by_count,
    authors:
      paper.authorships?.map(
        (a) => a.author.display_name
      ) || [],
    source:
      paper.primary_location?.source
        ?.display_name || "Unknown",
    openAlexUrl: paper.id,
  }));
};

module.exports = {
  expandQuery,
  semanticSearch,   
};