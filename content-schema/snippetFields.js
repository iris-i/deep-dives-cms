import { documentField, categoriesUi } from "./commonFields"
import {
  text,
  image,
  relationship,
  timestamp
} from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { slugHooks } from '../utils/slugUtils';

export default snippetFields = {
  access: allowAll,
  fields: {
    title: text({ isRequired: true }),
    slug: text({ isUnique: true, isIndexed: 'unique' }),
    description: text({ isRequired: true }),
    body: documentField,
    publishedDate: timestamp(),
    categories: relationship({
      ref: 'Category.snippets',
      many: true,
      ui: categoriesUi,
    }),
  },
  hooks: slugHooks
}



