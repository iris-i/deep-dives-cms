import React from 'react';
import { component, fields } from '@keystone-6/fields-document/component-blocks';
import Quote from './shared-components/quote'

export const componentBlocks = {
  quote: component({
    preview: (props) => {
      return (
        <Quote attribution={props.fields.attribution.element} content={props.fields.content.element} />
      )
    },
    label: 'Quote',
    schema: {
      content: fields.child({
        kind: 'block',
        placeholder: 'Quote...',
        formatting: { inlineMarks: 'inherit', softBreaks: 'inherit' },
        links: 'inherit',
      }),
      attribution: fields.child({
        kind: 'inline',
        placeholder: '— Attribution'
      }),
    },
    chromeless: true,
  })
}
