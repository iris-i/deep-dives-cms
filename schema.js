
import { list } from '@keystone-6/core';

// Content type fields
import {
  userSchema,
  postSchema,
  snippetSchema,
  learningJourneySchema,
  categorySchema
} from './content-schema';

export const lists = {
  User: list({
    ...userSchema
  }),

  Post: list({
    ...postSchema
  }),

  Snippet: list({
    ...snippetSchema
  }),

  LearningJourney: list({
    ...learningJourneySchema
  }),

  Category: list({
    ...categorySchema
  })
}
