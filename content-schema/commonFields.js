import { document } from '@keystone-6/fields-document';
import { componentBlocks } from '../component-blocks/component-blocks';

export const documentField =
  document({
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
    ui: {
      views: './component-blocks/component-blocks',
    },
    componentBlocks,
  })

export const categoriesUi = {
  displayMode: 'select',
  cardFields: ['name'],
  linkToItem: false,
  inlineConnect: true,
}
