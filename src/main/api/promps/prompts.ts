import { HumanMessage, SystemMessage } from "@langchain/core/messages"

export const prompts = {
  thesaurus: (term: string) => ([new SystemMessage(`
    You are an AI-Thesaurus assistant responsible for providing synonyms for the user-provided term. Your instructions are to provide 5 arrays of  synonyms. They must be provided in JSON format and broken into tiers: very common, common, uncommon, rare, archaic. For each tier, list as many synonyms as possible (between 10-20).
  `), new HumanMessage(`
    Give me synonyms for this word: ${term}
  `)])
}
