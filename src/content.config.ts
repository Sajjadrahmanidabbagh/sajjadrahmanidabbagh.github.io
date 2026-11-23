// Content collections: all personal content lives in src/data/ and src/content/.
// Layouts and components only read from these collections.
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { file, glob } from 'astro/loaders';

const link = z.object({ label: z.string(), url: z.string() });

const profile = defineCollection({
  loader: file('src/data/profile.yml'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      title: z.string(),
      tagline: z.string(),
      affiliation: z.string(),
      location: z.string(),
      email: z.string().optional(),
      links: z.array(link).default([]),
      intro: z.string(),
      contactText: z.string().optional(),
      summary: z.string(),
      interests: z.array(z.string()).default([]),
      photo: image(),
      photoAlt: z.string(),
      aboutImage: image().optional(),
      aboutImageAlt: z.string().optional(),
    }),
});

const entry = z.object({
  title: z.string(),
  org: z.string().optional(),
  location: z.string().optional(),
  period: z.string().optional(),
  details: z.string().optional(),
});

const experience = defineCollection({ loader: file('src/data/experience.yml'), schema: entry });
const awards = defineCollection({ loader: file('src/data/awards.yml'), schema: entry });
const certificates = defineCollection({ loader: file('src/data/certificates.yml'), schema: entry });

const skills = defineCollection({
  loader: file('src/data/skills.yml'),
  schema: z.object({ group: z.string(), items: z.array(z.string()) }),
});

const languages = defineCollection({
  loader: file('src/data/languages.yml'),
  schema: z.object({ language: z.string(), level: z.string() }),
});

// One .md file per education entry; each gets its own page at /education/<filename>/.
const education = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/education' }),
  schema: entry.extend({ order: z.number().default(0) }),
});

// Optional media shown when a project / paper / talk box is expanded.
const media = {
  youtubeId: z.string().optional(),
  video: z.string().optional(), // small local video in public/videos/, e.g. /videos/clip.mp4
  links: z.array(link).default([]),
  order: z.number().default(0),
};

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      period: z.string(),
      summary: z.string(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      ...media,
    }),
});

const papers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/papers' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    publisher: z.string().optional(),
    year: z.number().optional(),
    url: z.string().optional(),
    ...media,
  }),
});

const talks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/talks' }),
  schema: z.object({
    title: z.string(),
    event: z.string(),
    place: z.string(),
    year: z.number(),
    type: z.string(),
    ...media,
  }),
});

export const collections = {
  profile,
  education,
  experience,
  awards,
  certificates,
  skills,
  languages,
  projects,
  papers,
  talks,
};
