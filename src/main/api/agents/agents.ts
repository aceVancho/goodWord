import { ChatOpenAI } from '@langchain/openai'
import { z } from 'zod'
import { prompts } from '../promps/prompts'
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";

const synonymsSchema = z.object({
	veryCommon: z.array(z.string()).length(10),
	common: z.array(z.string()).length(10),
	uncommon: z.array(z.string()).length(10),
	rare: z.array(z.string()).length(10),
	archaic: z.array(z.string()).length(10)
})

const model = new ChatOpenAI({
	temperature: 0,
	model: 'gpt-4o',
	maxTokens: -1
}).withStructuredOutput<typeof synonymsSchema._type>(synonymsSchema)

export const searchThesaurus = async (term: string): Promise<typeof synonymsSchema._type> =>
	await model.invoke(prompts.thesaurus(term), {
		configurable: { thread_id: '420' }
	})

export const toneProfessional = async (text: string): Promise<typeof toneSchemas.professional._type | null> => {
  const openai = new OpenAI();

  const toneSchemas = {
    professional: z.object({
      output: z.array(z.string()).length(3),
    })
  }

  const response = await openai.responses.parse({
    model: "gpt-5-nano",
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
    effort: "minimal"
  }

  });

  console.log('toneProfessional response:', response.output_parsed);
  return response.output_parsed;
}


