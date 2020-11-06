import React from 'react';
import { compose } from 'redux';
import { SidebarPortal } from '@plone/volto/components';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import tableSVG from '@plone/volto/icons/table.svg';
import { blocks } from '~/config';

import DataTableView from './DataTableView';
import { TableSchema } from './schema';
import {
  withBlockDataSource,
  withFileData,
} from '@plone/datatable-tutorial/hocs';

import './datatable-edit.less';

// Note: we use `file_path` instead of `url` because we're dealing with an
// Array. This is a limitation of the current state of the ObjectBrowserWidget

const tweakSchema = (schema, data, file_data) => {
  const columnsField = schema.properties.columns;
  const ColumnsSchema = columnsField.schema;

  const columns = (file_data?.meta?.fields || []).sort().map((n) => [n, n]);
  ColumnsSchema.properties.column.choices = columns;

  const { cellRenderers } = blocks.blocksConfig.dataTable;
  const renderers = Object.keys(cellRenderers).map((k) => [
    k,
    cellRenderers[k].title,
  ]);
  ColumnsSchema.properties.renderer.choices = renderers;

  columnsField.schemaExtender = (schema, data) => {
    const extension = data.renderer
      ? cellRenderers[data.renderer].schemaExtender
      : null;
    return extension ? extension(schema, data) : schema;
  };

  return schema;
};

const DataTableEdit = (props) => {
  const { selected, onChangeBlock, block, data, file_data } = props;

  const schema = tweakSchema(TableSchema(props), data, file_data);

  return (
    <>
      <SidebarPortal selected={selected}>
        <InlineForm
          schema={schema}
          title={schema.title}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          formData={data}
        />
      </SidebarPortal>
      <DataTableView {...props} />
    </>
  );
};

const getFilePath = ({ data: { file_path } }) => file_path;

export default compose(
  withFileData(getFilePath),
  withBlockDataSource({
    getFilePath,
    icon: tableSVG,
    title: 'Data table',
  }),
)(DataTableEdit);
