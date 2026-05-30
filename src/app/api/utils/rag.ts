/**
 * Simple, highly efficient in-memory TF-IDF / Token-matching RAG utility
 * designed to split, index, and retrieve relevant parts of brand guidelines.
 */
export function retrieveBrandGuidelines(brandBook: string, query: string, maxChunks = 4): string {
  if (!brandBook || !brandBook.trim()) return '';
  if (!query || !query.trim()) return brandBook; // return all if no query

  // 1. Variable / Semantic Chunking: Split by double newlines, headers, or bullet groups
  const rawChunks = brandBook
    .split(/\n(?:[ \t]*\n|#+\s+|[ \t]*-\s+|[ \t]*\*\s+)/g)
    .map(c => c.trim())
    .filter(c => c.length > 20); // filter out tiny artifacts

  if (rawChunks.length <= maxChunks) {
    return brandBook; // Guideline is short, keep full context!
  }

  // 2. Tokenize and normalize query
  const queryTokens = new Set(
    query
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(t => t.length > 2)
  );

  // 3. Dynamic scoring based on Jaccard token overlap & density
  const scoredChunks = rawChunks.map((chunk, index) => {
    const chunkTokens = chunk
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(t => t.length > 2);

    let matchCount = 0;
    chunkTokens.forEach(token => {
      if (queryTokens.has(token)) matchCount++;
    });

    // Score is matching ratio + slight position bias to prefer introduction/core rules
    const score = matchCount / (queryTokens.size + 1) + (1.0 / (index + 5));

    return { chunk, score };
  });

  // 4. Sort and retrieve top matches
  const topChunks = scoredChunks
    .sort((a, b) => b.score - a.score)
    .slice(0, maxChunks)
    .map(item => item.chunk);

  return `[RETRIEVED BRAND GUIDELINES SECTIONS - SEMANTIC CONTEXTUAL RAG]:\n\n` + topChunks.join('\n\n--- Next Section ---\n\n');
}
