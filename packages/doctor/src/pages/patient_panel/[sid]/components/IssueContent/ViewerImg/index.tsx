import React, { useMemo, useState } from 'react';
// import Viewer from 'react-viewer';
import { ImageDecorator } from 'react-viewer/lib/ViewerProps';
import Viewer from '@/components/Viewer';
import styles from '../index.scss';

interface IProps {
  body: IIssueBody
}

function ViewerImg({ body }: IProps) {
  const { content, msg } = body;
  const [showImage, setShowImage] = useState(false);
  const [images, setImages] = useState<ImageDecorator[]>([]);
  const insertIndex = msg.indexOf('日') + 1;
  const handleShowPic = (imgUrl: string) => {
    setShowImage(true);
    setImages([{
      src: imgUrl,
    }]);
  };
  const getImgType = useMemo(() => (
    () => (
      content.imageList.map((item, index) => (
        <span
          className={styles.blue}
          key={item.imageId}
          onClick={() => handleShowPic(item.url)}
        >
          {`${item.imageType}${index + 1 === content.imageList.length ? ',' : '、'}`}
        </span>
      ))
    )
  ), content.imageList);

  return (
    <>
      <span>
        {msg.substr(0, insertIndex)}
        { getImgType() }
        {msg.substr(insertIndex)}
      </span>
      <Viewer
        activeIndex={0}
        visible={showImage}
        onClose={() => setShowImage(false)}
        images={images}
        onMaskClick={() => setShowImage(false)}
        zIndex={100000}
      />
    </>
  );
}

export default ViewerImg;
