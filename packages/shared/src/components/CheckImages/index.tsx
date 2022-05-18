import React, { useState } from 'react';
import { IImageItem } from 'typings/model';
import DragModal from '../DragModal';
import ImageList from './ImageList';
import './index.css';

function CheckImages() {
  const [showModal, setShowModal] = useState(false);
  const [activeItem, setActiveItem] = useState<IImageItem>();
  const [hideCont, setHideCont] = useState(false);

  return (
    <>
      <DragModal
        // ant-modal-wrap-center
        wrapClassName={`${hideCont ? 'mode_hide' : 'ant-modal-wrap-center'}`}  // mode_block
        mask={!hideCont}
        width="1200px"
        visible={showModal}
        title={activeItem?.name || '单据'}
        onCancel={() => setShowModal(false)}
        footer={null}
        style={{ display: hideCont ? 'none' : 'block' }}
      >
        <div className='shared_check_images'>
          <div className='images_wrap'>
            <ImageList
              data={activeItem as IImageItem}
              handleHideCont={() => setHideCont(!hideCont)}
            // refresh={fetchImages}
            />
            <div />
          </div>
        </div>

      </DragModal>
    </>
  );
}

export default CheckImages;
