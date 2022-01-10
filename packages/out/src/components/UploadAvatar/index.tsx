import type { FC } from 'react';
import React, { useState } from 'react';
import UploadImageWithCrop from '@/components/UploadImageWithCrop';
import DragModal from 'xzl-web-shared/dist/components/DragModal';

// interface IProps {
//   children: React.ReactElement;
// }
interface IUploadParams {
  imageURL: string;
  type: string;
}
interface IProps {
  uploadSuccess: (successParams: IUploadParams) => void;
}
const UploadAvatar: FC<IProps> = ({ children, uploadSuccess }) => {
  const [showUpload, setShowUpload] = useState(false);
  const handleSuccess = (imgParams: IUploadParams) => {
    uploadSuccess(imgParams);
    setShowUpload(false);
  };
  return (
    <>
      <span onClick={() => setShowUpload(true)}>{children}</span>
      {showUpload && (
        <DragModal
          title="头像设置"
          footer={null}
          width={770}
          onCancel={() => setShowUpload(false)}
          visible={showUpload}
        >
          <UploadImageWithCrop
            preview
            type="avatar"
            aspectRatio={1 / 1}
            close={() => setShowUpload(false)}
            success={handleSuccess}
          />
        </DragModal>
      )}
    </>
  );
};
export default UploadAvatar;
