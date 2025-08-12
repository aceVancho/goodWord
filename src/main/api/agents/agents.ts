// npm install @langchain-anthropic
import { createReactAgent } from '@langchain/langgraph/prebuilt'
// import { tool } from '@langchain/core/tools'
import { ChatOpenAI } from '@langchain/openai'
import { z } from 'zod'
import { HumanMessage } from '@langchain/core/messages'

const schema: z.ZodSchema<any> = z.object({
	synonyms: z.array(z.string())
});

const agentModel = new ChatOpenAI({ temperature: 0, model: "gpt-4o" });
const agent = createReactAgent({
  llm: agentModel,
  tools: [],
  responseFormat: schema
});

// const model = new ChatOpenAI({
// 	temperature: 0,
// 	model: 'gpt-4o'
// }).withStructuredOutput(schema)

export const searchThesaurus = async (word: string) => {

	const response1 = await agent.invoke({messages: [new HumanMessage(`Give me synonyms for this word: ${word} `)]}, { configurable: { thread_id: "420" } })
	// const response2 = await model.invoke(
	// 	[new HumanMessage(`Give me synonyms for this word: ${word} `)],
	// 	{ configurable: { thread_id: '420' } }
	// )

	console.log(`\nRESPONSE1: ${JSON.stringify(response1)}\n`)
	// console.log(`\nRESPONSE2: ${JSON.stringify(response2)}\n`)
}
