import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const entry = defineCollection({

	loader: glob({
    base: './src/content/entry',
    pattern: '**/*.{md,mdx}'
  }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()).optional(),
		cover: z.string().optional().default(''),
		language: z.string().optional().default('en'),
		published: z.boolean().optional().default(false),
	}),
});

const sandbox = defineCollection({
  loader: glob({
    base: './src/content/sandbox',
    pattern: '**/*.{md,mdx}'
  }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
  }),
});


export const collections = { entry, sandbox };
