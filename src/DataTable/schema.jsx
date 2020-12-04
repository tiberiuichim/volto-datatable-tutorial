import { defineMessages } from 'react-intl';

const messages = defineMessages({
  fixed: {
    id: 'Fixed width table cells',
    defaultMessage: 'Fixed width table cells',
  },
  compact: {
    id: 'Make the table compact',
    defaultMessage: 'Make the table compact',
  },
  basic: {
    id: 'Reduce complexity',
    defaultMessage: 'Reduce complexity',
  },
  celled: {
    id: 'Divide each row into separate cells',
    defaultMessage: 'Divide each row into separate cells',
  },
  inverted: {
    id: 'Table color inverted',
    defaultMessage: 'Table color inverted',
  },
  striped: {
    id: 'Stripe alternate rows with color',
    defaultMessage: 'Stripe alternate rows with color',
  },
  styling: {
    id: 'Styling',
    defaultMessage: 'Styling',
  },
  defaultFieldset: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  dataFile: {
    id: 'Data file',
    defaultMessage: 'Data file',
  },
});

export const TableSchema = ({ intl }) => ({
  title: 'Data table',

  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messages.defaultFieldset),
      fields: ['file_path', 'columns'],
    },
    {
      id: 'style',
      title: intl.formatMessage(messages.styling),
      fields: ['fixed', 'celled', 'striped', 'compact', 'basic', 'inverted'],
    },
  ],

  properties: {
    file_path: {
      title: intl.formatMessage(messages.dataFile),
      widget: 'pick_object',
    },
    fixed: {
      type: 'boolean',
      title: intl.formatMessage(messages.fixed),
    },
    compact: {
      type: 'boolean',
      title: intl.formatMessage(messages.compact),
    },
    basic: {
      type: 'boolean',
      title: intl.formatMessage(messages.basic),
    },
    celled: {
      type: 'boolean',
      title: intl.formatMessage(messages.celled),
    },
    inverted: {
      type: 'boolean',
      title: intl.formatMessage(messages.inverted),
    },
    striped: {
      type: 'boolean',
      title: intl.formatMessage(messages.striped),
    },
    columns: {
      title: 'Columns',
      description: 'Leave empty to show all columns',
      widget: 'object_list_inline',
      schema: ColumnSchema({ intl }),
    },
  },

  required: ['file_path'],
});

const ColumnSchema = (props) => ({
  title: 'Column',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['column', 'title', 'textAlign', 'renderer'],
    },
  ],
  properties: {
    title: {
      title: 'Header',
    },
    textAlign: {
      title: 'Align',
      widget: 'text_align',
      // choices: [
      //   ['left', 'left'],
      //   ['center', 'center'],
      //   ['right', 'right'],
      // ],
    },
    column: {
      title: 'Data column',
      choices: [],
    },
    renderer: {
      title: 'Format',
      choices: [],
    },
  },
  required: ['column'],
});
