import { documentField, categoriesUi } from "./commonFields"
import {
  text,
  image,
  relationship,
} from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

export default snippetFields = {
  access: allowAll,
  fields: {
    title: text({ isRequired: true }),
    description: text({ isRequired: true }),
    body: documentField,
    categories: relationship({
      ref: 'Category.snippets',
      many: true,
      ui: categoriesUi,
    }),
  },
}
