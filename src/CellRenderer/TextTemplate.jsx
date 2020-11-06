const TextTemplateRenderer = ({ column, value }) => {
  return column.textTemplate ? column.textTemplate.replace('{}', value) : value;
};

TextTemplateRenderer.schemaExtender = (schema) => {
  schema.properties.textTemplate = {
    title: 'Text template',
    description: 'Add suffix/prefix to text. Use {} for value placeholder',
  };
  schema.fieldsets[0].fields.push('textTemplate');

  console.log('schema', schema);
  return schema;
};

export default TextTemplateRenderer;
