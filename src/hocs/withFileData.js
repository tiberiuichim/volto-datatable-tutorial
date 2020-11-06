import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import csv from 'papaparse';
import { getRawContent } from '@plone/datatable-tutorial/actions';

const withFileData = (getFilePath) => (WrappedComponent) => {
  return (props) => {
    const file_path = getFilePath(props);

    const id = file_path?.[0]?.['@id'];
    const path = id ? `${id}/@@download` : null;

    const dispatch = useDispatch();
    const request = useSelector((state) => state.rawdata?.[path]);

    const content = request?.data;

    React.useEffect(() => {
      if (path && !request?.loading && !request?.loaded && !content)
        dispatch(getRawContent(path));
    }, [dispatch, path, content, request?.loaded, request?.loading]);

    const file_data = React.useMemo(() => {
      if (content) {
        const res = csv.parse(content, { header: true });
        return res;
      }
    }, [content]);
    return <WrappedComponent file_data={file_data} {...props} />;
  };
};

export default withFileData;
