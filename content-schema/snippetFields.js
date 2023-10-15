import { documentField, categoriesUi } from "./commonFields"
import {
  text,
  image,
  relationship,
} from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { slugifyTitle, validationError } from '../utils/slugUtils';

export default snippetFields = {
  access: allowAll,
  fields: {
    title: text({ isRequired: true }),
    slug: text({ isUnique: true }),
    description: text({ isRequired: true }),
    body: documentField,
    categories: relationship({
      ref: 'Category.snippets',
      many: true,
      ui: categoriesUi,
    }),
  },
  hooks: {
    // Generate a slug based on the title
    resolveInput: async ({ resolvedData, operation, inputData, context }) => {
      return slugifyTitle(resolvedData, inputData, operation);
    },
    // Validate manually-entered slug to ensure that it follows the regex pattern above.
    validateInput: async ({ resolvedData, addValidationError }) => {
      validationError(resolvedData, addValidationError);
    },
  }
}



