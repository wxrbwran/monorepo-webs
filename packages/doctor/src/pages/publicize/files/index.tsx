import React from 'react';
import FileLibrary from 'xzl-web-shared/src/components/Publicize/FileLibrary';

function Files() {
  return (
    <div>
      <FileLibrary
        uploadPublicizeRequest={window.$api.education.addPublicize}
        filePrepareRequest={window.$api.education.filePrepare}
      />
    </div>
  );
}

export default Files;
