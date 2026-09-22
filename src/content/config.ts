import { defineCollection, z } from "astro:content";

const writeups = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    summary: z.string(),
  }),
});

const works = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    summary: z.string(),
    status: z.enum(["draft", "published"]).default("published"),
  }),
});

export const collections = { writeups, works };
