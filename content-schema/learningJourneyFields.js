import { allowAll } from '@keystone-6/core/access';
import { documentField } from './commonFields';
import { slugHooks } from '../utils/slugUtils';
// Import more keystone fields here
import {
  text,
  image,
  relationship,
} from '@keystone-6/core/fields';

export default learningJourneyFields = {
  access: allowAll,
  fields: {
    name: text({ isRequired: true }),
    slug: text({ isUnique: true, isIndexed: 'unique' }),
    description: documentField,
    posts: relationship({
      ref: 'Post.learningJourneys',
      many: true,
    }),
    categories: relationship({
      ref: 'Category.learningJourneys',
      many: true,
      ui: {
        displayMode: 'select',
        cardFields: ['name'],
        linkToItem: false,
        inlineConnect: true,
      },
    }),
  },
  hooks: slugHooks
}
