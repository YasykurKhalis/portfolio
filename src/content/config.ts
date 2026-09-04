import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()),
    repoUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { projects };
