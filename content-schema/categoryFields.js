import { allowAll } from '@keystone-6/core/access';
// Import more keystone fields here
import {
  text,
  image,
  relationship,
  timestamp,
  password,
  select,
} from '@keystone-6/core/fields';

export default categoryFields = {
  access: allowAll,
  fields: {
    name: text({ isRequired: true }),
    posts: relationship({
      ref: 'Post.categories',
      many: true,
    }),
    snippets: relationship({
      ref: 'Snippet.categories',
      many: true,
    }),
    learningJourneys: relationship({
      ref: 'LearningJourney.categories',
      many: true,
    }),
  },
}
