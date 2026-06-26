function calculateScore(paper) {
  const currentYear = new Date().getFullYear();

  // Citation score (max 50 points)
  const citationScore = Math.min(
    paper.cited_by_count / 100,
    50
  );

  // Recency score (max 30 points)
  const age = currentYear - (paper.publication_year || currentYear);
  const recencyScore = Math.max(30 - age, 0);

  // Open access bonus
  const openAccessScore =
    paper.open_access?.is_oa ? 20 : 0;

  return (
    citationScore +
    recencyScore +
    openAccessScore
  );
}

module.exports = {
  calculateScore,
};