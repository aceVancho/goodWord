import { HumanMessage, SystemMessage } from "@langchain/core/messages"

export const prompts = {
  searchThesaurus: (term: string, level: string): [SystemMessage, HumanMessage] => ([new SystemMessage(`
    List as many ${level}-level, single-word synonyms as you can for the user given word. Results should be in JSON format as an array. {synonyms:['word1','word2','etc']}. Shoot for 20 synonyms. It's okay for it to be less. But don't repeat yourself or use variations of the same headword (e.g. "stiff", "stiffened", "stiffness")
  `), new HumanMessage(`
    Give me synonyms for this word: ${term}
  `)]),
  cleanThesaurusResults: (term: string, results: string[]): [HumanMessage]  => ([new HumanMessage(`
    You are an AI-assistant responsible for cleaning thesaurus results for the word "${term}". Ensure that the results are relevant, removing only phrases/words/synonyms that are not applicable. You will respond in JSON format: { synonyms: string[] }. The results are:\n${JSON.stringify(results)}
  `)]),
  categorizeThesaurusResults: (term: string, results: string[]): [HumanMessage]  => ([new HumanMessage(`
    You are an AI assistant responsible for categorizing thesaurus results into different tiers: very common, common, uncommon, rare, and obscure for the word "${term}". Do not remove items from the list or add your own. Do not leave a category empty. \nSynonyms:${results}
  `)])
}
