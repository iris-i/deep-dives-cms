import { allowAll } from '@keystone-6/core/access';
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
    categories: relationship({
      ref: 'Category.learningJourneys',
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['name'],
        linkToItem: false,
        inlineConnect: true,
      },
    }),
  }
}
