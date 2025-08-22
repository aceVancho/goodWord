import { z } from 'zod'

export const zodSchemas = {
  thesaurusSchemas: {
    synonyms: z.object({
      veryCommon: z.array(z.string()),
      common: z.array(z.string()),
      uncommon: z.array(z.string()),
      rare: z.array(z.string()).min(3),
      obscure: z.array(z.string()).min(3)
    }),
    thesaurus: z.object({
      synonyms: z.array(z.string())
    }),
  },
	toneSchemas: {
		professional: z.object({
			output: z.array(z.string()).length(3)
		})
	}
}
