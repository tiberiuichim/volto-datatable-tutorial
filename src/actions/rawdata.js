import { GET_RAW_CONTENT } from '@plone/datatable-tutorial/constants';

export function getRawContent(url, headers = {}) {
  return {
    type: GET_RAW_CONTENT,
    request: {
      op: 'get',
      path: url,
      headers,
    },
    url,
  };
}
