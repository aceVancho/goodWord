import { HumanMessage, SystemMessage } from "@langchain/core/messages"

export const prompts = {
  thesaurus: (term: string) => ([new SystemMessage(`
    You are an AI-Thesaurus assistant responsible for providing synonyms for the user-provided term. Your instructions are to provide 5 arrays of synonyms. They must be provided in JSON format and broken into tiers: very common, common, uncommon, rare, archaic. For each tier, list as many synonyms as possible.
  `), new HumanMessage(`
    Give me synonyms for this word: ${term}
  `)]),
  superThesaurus: (term: string, level: string) => ([new SystemMessage(`
    List as many ${level}-level, single-word synonyms as you can for the user given word. Results should be in JSON format as an array. {synonyms:['word1','word2','etc']}. Shoot for 20 synonyms. It's okay for it to be less. But don't repeat yourself or use variations of the same headword (e.g. "stiff", "stiffened", "stiffness")
  `), new HumanMessage(`
    Give me synonyms for this word: ${term}
  `)]),
  categorizeThesaurusResults: (results: any, term: string) => ([new HumanMessage(`
    You are an AI assistant responsible for categorizing thesaurus results into different tiers: very common, common, uncommon, rare, and archaic. Do not remove items from the list or add your own. Do not leave a category empty. \nSynonyms:${results}
  `)]),
  sortThesaurusResults: (results: any, term: string) => ([new HumanMessage(`
    You are an AI assistant responsible sorting synonyms for the word "${term}" from most to least common: \nSynonyms:${results}
  `)])
}
