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
      summary: z.string(),
      interests: z.array(z.string()).default([]),
      photo: image(),
      photoAlt: z.string(),
      highlights: z
        .array(
          z.object({
            title: z.string(),
            text: z.string(),
            image: image(),
            imageAlt: z.string(),
            href: z.string().optional(),
          }),
        )
        .default([]),
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

const education = defineCollection({ loader: file('src/data/education.yml'), schema: entry });
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

const publications = defineCollection({
  loader: file('src/data/publications.yml'),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    publisher: z.string().optional(),
    year: z.number().optional(),
    url: z.string().optional(),
    selected: z.boolean().default(false),
  }),
});

const talks = defineCollection({
  loader: file('src/data/talks.yml'),
  schema: z.object({
    event: z.string(),
    place: z.string(),
    year: z.number(),
    type: z.string(),
    title: z.string(),
  }),
});

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
      youtubeId: z.string().optional(),
      links: z.array(link).default([]),
      order: z.number().default(0),
    }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/news' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.number(),
      order: z.number().default(0),
      image: image().optional(),
      imageAlt: z.string().optional(),
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
  publications,
  talks,
  projects,
  news,
};
