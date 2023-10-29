import { allowAll } from '@keystone-6/core/access';
import { slugHooks } from '../utils/slugUtils';
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
    slug: text({ isUnique: true, isIndexed: 'unique' }),
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
  // @tod not working, fix later.
  // hooks: slugHooks
}
