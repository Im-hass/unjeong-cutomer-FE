import React from 'react';

import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';

function MarkdownViewer({ value }) {
  return (
    <MDEditor
      height='100%'
      value={value}
      preview='preview'
      hideToolbar
      previewOptions={{
        rehypePlugins: [[rehypeSanitize]],
      }}
    />
  );
}

export default MarkdownViewer;
