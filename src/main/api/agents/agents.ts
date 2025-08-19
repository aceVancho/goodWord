import { ChatOpenAI } from '@langchain/openai'
import { z } from 'zod'
import { prompts } from '../promps/prompts';

const synonymsSchema = z.object({
		veryCommon: z.array(z.string()).length(10),
		common: z.array(z.string()).length(10),
		uncommon: z.array(z.string()).length(10),
		rare: z.array(z.string()).length(10),
		archaic: z.array(z.string()).length(10)
});

const model = new ChatOpenAI({
	temperature: 0,
	model: 'gpt-4o',
  maxTokens: -1,
}).withStructuredOutput<typeof synonymsSchema._type>(synonymsSchema)

export const searchThesaurus = async (term: string) => (await model.invoke(prompts.thesaurus(term), { configurable: { thread_id: '420' } }))
