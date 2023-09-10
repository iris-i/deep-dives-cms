import { componentBlocks } from '../component-blocks/component-blocks';
import {
  text,
  image,
  relationship,
  timestamp,
  select,
} from '@keystone-6/core/fields';

import { allowAll } from '@keystone-6/core/access';
import { documentField, categoriesUi } from './commonFields';


export default postFields = {
  access: allowAll,
  fields: {
    title: text({ isRequired: true }),
    intro: text({
      isRequired: true,
      ui: {
        displayMode: 'textarea',
      },
    }),
    publishedDate: timestamp(),
    // image: image({ storage: 'local' }),
    // Add document field here
    body: documentField,
    author: relationship({
      ref: 'User.posts',
      ui: {
        displayMode: 'cards',
        cardFields: ['name', 'email'],
        linkToItem: true,
        inlineConnect: true,
      },
    }),
    status: select({
      options: [
        { label: 'Draft', value: 'draft', isDefault: true },
        { label: 'Published', value: 'published' },
      ],
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'hidden' },
      },
    }),
    categories: relationship({
      ref: 'Category.posts',
      many: true,
    }),
    learningJourneys: relationship({
      ref: 'LearningJourney.posts'
    }),
  },
  ui: {
    listView: {
      initialColumns: ['title', 'status', 'author', 'publishedDate'],
    },
  },
}
