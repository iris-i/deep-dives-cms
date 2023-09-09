import { allowAll } from '@keystone-6/core/access';

// Import more keystone fields here
import {
  text,
  relationship,
  password,
} from '@keystone-6/core/fields';

export default userFields = {
  access: allowAll,
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true, isIndexed: 'unique' }),
    password: password({ validation: { isRequired: true } }),
    posts: relationship({
      ref: 'Post.author',
      many: true,
    }),
  }

};
