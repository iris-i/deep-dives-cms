import { allowAll } from '@keystone-6/core/access';
import { list } from '@keystone-6/core';
// Import more keystone fields here
import {
  text,
  image,
  relationship,
} from '@keystone-6/core/fields';

export const lists = {
  User: list({
    access: allowAll,
    fields: {
      name: text({ isRequired: true }),
      email: text({ isRequired: true, isUnique: true }),
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
    },
    ui: {
      listView: {
        initialColumns: ['title', 'author'],
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

