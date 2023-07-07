import { allowAll } from '@keystone-6/core/access';
import { list } from '@keystone-6/core';
// Import more keystone fields here
import {
  text,
  image,
  relationship,
  timestamp,
  select
} from '@keystone-6/core/fields';

export const lists = {
  User: list({
    access: allowAll,
    fields: {
      name: text({ isRequired: true }),
      email: text({ isRequired: true, isUnique: true, isIndexed: 'unique' }),
      password: password({ validation: { isRequired: true } }),
      posts: relationship({
        ref: 'Post.author',
        many: true,
      }),
    },
  }),

  Post: list({
    access: allowAll,
    fields: {
      title: text({ isRequired: true }),
      description: text({ isRequired: true }),
      body: text({ isRequired: true }),
      publishedDate: timestamp(),
      // image: image({ storage: 'local' }),
      author: relationship({
        ref: 'User.posts',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email'],
          linkToItem: true,
          inlineEdit: { fields: ['name', 'email'] },
          inlineCreate: { fields: ['name', 'email'] },
        },
      }),
      status: select({
        options: [
          { label: 'Draft', value: 'draft' },
          { label: 'Published', value: 'published' },
        ],
        ui: {
          displayMode: 'segmented-control',
          createView: { fieldMode: 'hidden' },
        },
      }),
    },
    ui: {
      listView: {
        initialColumns: ['title', 'status', 'author', 'publishedDate'],
      },
    },
  }),

  Snippet: list({
    access: allowAll,
    fields: {
      title: text({ isRequired: true }),
      description: text({ isRequired: true }),
      body: text({ isRequired: true }),
    },
  })
}
