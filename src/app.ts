import fs from 'node:fs';
import path from 'node:path';

import fastify from 'fastify';
import _ from 'lodash';
import { ZodError } from 'zod';

import { env } from './env';
import { appRoutes } from './http/routes';

export const app = fastify({ logger: true });

type Translations = Record<string, Record<string, string>>;

const translations: Translations = {};
const localesPath = path.join(path.dirname(''), './src/locales');

// Internacionalization/Translation
fs.readdirSync(localesPath).forEach((file) => {
  const locale = path.basename(file, '.json');
  const filePath = path.join(localesPath, file);
  translations[locale] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
});

app.addHook('preHandler', (req, _reply, done) => {
  const interpolate = (template: string, values: Record<string, string | number>): string => {
    return template.replace(/{{(.*?)}}/g, (_, key) => {
      const value = values[key.trim()];
      return value !== undefined ? String(value) : `{{${key}}}`;
    });
  };

  const lang = req.headers['accept-language']?.split(',')[0] || 'en';
  const currentTranslations = translations[lang] || translations['en'];

  req.t = (key: string, values: Record<string, string | number> = {}): string => {
    const template = _.get(currentTranslations, key);
    if (!template) {
      return key;
    }
    return interpolate(template, values);
  };

  done();
});

// Routes
app.register(appRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error.', fields: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // Log to an external tool.
  }

  return reply.status(500).send({ message: 'Internal server error.' });
});
