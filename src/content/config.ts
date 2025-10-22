import { defineCollection, z } from "astro:content";

const writeups = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    summary: z.string(),
  }),
});

export const collections = { writeups };

