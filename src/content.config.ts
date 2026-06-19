import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    category: z.enum([
      'threat-intelligence',
      'vulnerabilities',
      'security-news',
      'tutorials',
      'tools-reviews',
      'data-breaches',
    ]),
    tags: z.array(z.string()).default([]),
    author: z.string().default('SunTechLand Staff'),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    source: z.string().optional(),
  }),
});

export const collections = { posts };
