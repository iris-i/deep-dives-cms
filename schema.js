import { allowAll } from '@keystone-6/core/access';
import { list } from '@keystone-6/core';
// Import more keystone fields here
import {
  text,
  image,
  relationship,
  timestamp,
  password,
  select,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';

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
      intro: text({
        isRequired: true,
        ui: {
          displayMode: 'textarea',
        },
      }),
      publishedDate: timestamp(),
      // image: image({ storage: 'local' }),
      // Add document field here
      body: document({
        formatting: true,
        links: true,
        dividers: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 1, 1, 1],
        ],
      }),
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
