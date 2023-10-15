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
    slug: text({ isUnique: true, isIndexed: 'unique' }),
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
  hooks: {
    // Generate a slug based on the title
    resolveInput: async ({ resolvedData, operation, inputData, context }) => {
      if ((operation === 'create') && !inputData.slug) {
        return {
          ...resolvedData,
          slug: resolvedData.title
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, ''),
        };
      }
      return resolvedData;
    },
    // Validate manually-entered slug to ensure that it follows the regex pattern above.
    validateInput: async ({ resolvedData, addValidationError }) => {
      if (resolvedData.slug && !isValidSlug(resolvedData.slug)) {
        addValidationError('The slug must consist of lowercase letters and hyphens only and must not start or end with a hyphen.');
      }
    },    
  }
}

function isValidSlug(slug) {
  // Check if the slug is not empty
  if (!slug) {
    return false;
  }

  // Check if the slug consists of lowercase letters and hyphens only
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return false;
  }

  // Check if the slug does not start or end with a hyphen
  if (slug.startsWith('-') || slug.endsWith('-')) {
    return false;
  }

  return true;
}
