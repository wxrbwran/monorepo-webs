import React, { FC, useState } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import { debounce } from 'lodash';
import { IAddTopicProps } from '../type';
import TopicAddDdtk from '../TopicAddDdtk';
import styles from './index.scss';

const TopicAddBtn: FC<IAddTopicProps> = (props) => {
  const { topicType, actionType } = props;
  const [showModal, setshowModal] = useState(true);
  const closeModal = () => {
    setshowModal(false);
  };
  const typeObj = {
    COMPLETION: {
      title: '多段填空',
      comp: <TopicAddDdtk {...props} closeModal={closeModal} />,
    },
    RADIO: {
      title: '多段填空',
      comp: <TopicAddDdtk {...props} />,
    },
    TEXT: {
      title: '问答题',
      comp: <TopicAddDdtk {...props} />,
    },
  };
  const handleShow = () => {
    setshowModal(true);
  };
  return (
    <div className={styles.btn_wrap}>
      {
        actionType === 'add' ? (
          <div className={styles.btn}>
            <span className="cursor-pointer" onClick={debounce(handleShow, 300)}>
              +添加新的{typeObj[topicType].title}
            </span>
          </div>
        ) : <div onClick={debounce(handleShow, 300)}>编辑</div>
      }
      <DragModal
        wrapClassName="ant-modal-wrap-center cancel_text_blue"
        width={714}
        maskClosable
        visible={showModal}
        onCancel={() => setshowModal(false)}
        title={actionType === 'add' ? '添加问题' : '编辑问题'}
        footer={null}
        destroyOnClose
        zIndex={1011}
      >
        { typeObj[topicType].comp }
      </DragModal>
    </div>
  );
};

export default TopicAddBtn;
