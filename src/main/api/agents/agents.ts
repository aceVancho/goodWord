import { ChatOpenAI } from '@langchain/openai'
import { z } from 'zod'
import { prompts } from '../promps/prompts'
import OpenAI from 'openai'
import { zodTextFormat } from 'openai/helpers/zod'
import { zodSchemas } from '../schemas'
const moby = require('moby')

// TODO: Feature: Add ability to gather dictionary/thesaurus results for multiple meanings of the same word
// import natural from "natural"
// import * as wndb from "wordnet-db"
// import WordPOS from "wordpos"
// const wp = new WordPOS({ wordnetPath: (wndb as any).path })
// const wn = new natural.WordNet((wndb as any).path)
// console.log(await wp.lookupAdjective(term))
// console.log(await wp.lookup(term))



const createModelWithSchema = (schema: z.ZodTypeAny) => {
	return new ChatOpenAI({
		// temperature: 0.3,
		// topP: 0.85,
		// frequencyPenalty: 0.6,
		model: 'gpt-5-nano',
		maxTokens: -1
	}).withStructuredOutput<typeof schema._type>(schema)
}

type ThesaurusResultType = typeof zodSchemas.thesaurusSchemas.thesaurus._type

export const searchThesaurus = async (term: string): Promise<any> => {
	const openai = new OpenAI()

	const response = await openai.responses.parse({
		model: 'gpt-5-mini',
		max_output_tokens: 25000,
		input: [
			{
				role: 'system',
				content: prompts.searchThesaurus(term)[0].text
      },
			{
				role: 'user',
				content: `${term}`
			}
		],
		text: {
			format: zodTextFormat(zodSchemas.thesaurusSchemas.synonyms, 'professional_tone')
		},
		reasoning: {
			effort: 'low'
		}
	})

	console.log('AI response:', response.output_parsed)
	return response.output_parsed
}
// export const simpleSearchThesaurus = async (term: string): Promise<ThesaurusResultType[]> => {
// 	const thesaurusModel = createModelWithSchema(zodSchemas.thesaurusSchemas.synonyms)
// 	const result = await thesaurusModel.invoke(prompts.simpleSearchThesaurus(term), {
// 		configurable: { thread_id: '420' }
// 	})
// 	return result
// }

export const deepSearchThesaurus = async (term: string): Promise<ThesaurusResultType> => {
	const thesaurusModel = createModelWithSchema(zodSchemas.thesaurusSchemas.thesaurus)
	const synonymsModel = createModelWithSchema(zodSchemas.thesaurusSchemas.synonyms)
	const tiers = ['very common', 'common', 'uncommon', 'rare', 'obscure']
	const mobyResults = new Set(moby.search(term))
	const aiResults = await Promise.all(
		tiers.map(level => {
			return thesaurusModel.invoke(prompts.deepSearchThesaurus(term, level), {
				configurable: { thread_id: '420' }
			})
		})
	).then(results => results.map(result => result.synonyms).flat())

  // TODO — Feature — "Load More" button on the frontend. Application gets a quick result and is able to load batches on demand.
	const combinedResults = Array.from(new Set([...aiResults, ...mobyResults]))
  console.log(`Combined Results: ${combinedResults}`)
  const promises: Promise<any>[] = []
  const maxBatches = Math.ceil(combinedResults.length / 50)
  for (let i = 0; i < maxBatches; i++) {
    const batch = combinedResults.slice(i * 50, (i + 1) * 50)
    const promise = thesaurusModel
		.invoke(prompts.cleanThesaurusResults(term, batch), {
			configurable: { thread_id: '420' }
		})
    promises.push(promise)
  }

  const cleanedResults = await (await Promise.all(promises)).map(result => result.synonyms).flat()
	const categorizedResults = await synonymsModel.invoke(
		prompts.categorizeThesaurusResults(term, cleanedResults),
		{ configurable: { thread_id: '420' } }
	)

  categorizedResults.isDeepSearchComplete = true;
	return categorizedResults
}

type ToneProfessionalType = typeof zodSchemas.toneSchemas.professional._type
export const toneProfessional = async (
	text: string
): Promise<ToneProfessionalType | null> => {
	const openai = new OpenAI()

	const response = await openai.responses.parse({
		model: 'gpt-5',
		max_output_tokens: 25000,
		input: [
			{
				role: 'system',
				content:
					'You are an AI word processing assistant. Your objective is to use the user provided text to improve its professional tone. You will respond in JSON format and provide 3 different responses.'
			},
			{
				role: 'user',
				content: `${text}`
			}
		],
		text: {
			format: zodTextFormat(zodSchemas.toneSchemas.professional, 'professional_tone')
		},
		reasoning: {
			effort: 'low'
		}
	})

	console.log('toneProfessional response:', response.output_parsed)
	return response.output_parsed
}
