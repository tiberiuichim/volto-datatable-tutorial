import React from 'react';
import { Segment, Form } from 'semantic-ui-react';
import { SidebarPortal, Field, Icon } from '@plone/volto/components';

const withBlockDataSource = (opts) => (WrappedComponent) => {
  const { icon, title, getFilePath } = opts;

  return (props) => {
    const { data, selected, onChangeBlock, block } = props;
    const file_path = getFilePath(props);

    return (
      <div className={`${data['@type']}-edit`}>
        {!file_path ? (
          <>
            <div className="no-value">
              <Form>
                <Icon name={icon} size="100px" color="#b8c6c8" />
                <Field
                  id="file_path"
                  widget="pick_object"
                  title="Pick a file"
                  value={file_path || []}
                  onChange={(id, value) => {
                    onChangeBlock(block, {
                      ...data,
                      [id]: value,
                    });
                  }}
                />
              </Form>
            </div>

            <SidebarPortal selected={selected}>
              <Segment.Group raised>
                <header className="header pulled">
                  <h2>{title}</h2>
                </header>
                <Segment className="sidebar-metadata-container" secondary>
                  No file selected
                  <Icon name={icon} size="100px" color="#b8c6c8" />
                </Segment>
              </Segment.Group>
            </SidebarPortal>
          </>
        ) : (
          <WrappedComponent {...props} />
        )}
      </div>
    );
  };
};

export default withBlockDataSource;
