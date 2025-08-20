import { ChatOpenAI } from '@langchain/openai'
import { z } from 'zod'
import { prompts } from '../promps/prompts'
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";

const synonymsSchema = z.object({
	veryCommon: z.array(z.string()),
	common: z.array(z.string()),
	uncommon: z.array(z.string()),
	rare: z.array(z.string()).min(3),
	archaic: z.array(z.string()).min(3),
})

const superThesaurusSchema = z.object({
  synonyms: z.array(z.string())
})

const model = new ChatOpenAI({
	temperature: .3,
  topP: 0.85,
  // frequencyPenalty: 0.6,
	model: 'gpt-4.1',
	maxTokens: -1
}).withStructuredOutput<typeof superThesaurusSchema._type>(superThesaurusSchema)
const model2 = new ChatOpenAI({
	temperature: .3,
  topP: 0.85,
  // frequencyPenalty: 0.6,
	model: 'gpt-4.1',
	maxTokens: -1
}).withStructuredOutput<typeof synonymsSchema._type>(synonymsSchema)

// export const searchThesaurus = async (term: string): Promise<typeof synonymsSchema._type> =>
// 	await model.invoke(prompts.thesaurus(term), {
// 		configurable: { thread_id: '420' }
// 	})

export const superSearchThesaurus = async (term: string): Promise<any> => {
  const levels = ['', 'very common', 'common', 'uncommon', 'rare', 'archaic']

  const results = await Promise.all(levels.map(level => {
    return model.invoke(prompts.superThesaurus(term, level), {
		configurable: { thread_id: '420' }
  })
  }))

  console.log('Before cleaned results:', results)

  const setResults = Array.from(new Set(results.map((result) => result.synonyms).flat()))

  console.log('Set Results:', setResults)
  const cleanedResults = await model2.invoke(prompts.categorizeThesaurusResults(setResults, term), {configurable: { thread_id: '420' }})

  console.log('cleanedResults:', cleanedResults)
  return cleanedResults
}

export const toneProfessional = async (text: string): Promise<typeof toneSchemas.professional._type | null> => {
  const openai = new OpenAI();

  const toneSchemas = {
    professional: z.object({
      output: z.array(z.string()).length(3),
    })
  }

  const response = await openai.responses.parse({
    model: "gpt-5",
    max_output_tokens: 25000,
    input: [
      { role: "system", content: "You are an AI word processing assistant. Your objective is to use the user provided text to improve its professional tone. You will respond in JSON format and provide 3 different responses." },
      {
        role: "user",
        content: `${text}`,
      },
    ],
    text: {
      format: zodTextFormat(toneSchemas.professional, "professional_tone"),
    },
      reasoning: {
    effort: "high"
  }

  });

  console.log('toneProfessional response:', response.output_parsed);
  return response.output_parsed;
}


