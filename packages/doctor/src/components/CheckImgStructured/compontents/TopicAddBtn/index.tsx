import React, { FC, useState } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { debounce } from 'lodash';
import { IAddTopicProps } from '../type';
import TopicAddDdtk from './AddDdtk';
import TopicAddProblem from './AddProblem';
import TopicAddChoice from './AddChoice';
import AddDdtkSenior from './AddDdtkSenior';
import { EditOutlined } from '@ant-design/icons';
import styles from './index.scss';

const TopicAddBtn: FC<IAddTopicProps> = (props) => {
  const { topicType, actionType, isShowEdit } = props;
  const [showModal, setshowModal] = useState(false);
  const closeModal = () => {
    setshowModal(false);
  };
  const topicProps = {
    ...props,
    closeModal,
  };
  const typeObj = {
    COMPLETION: {
      title: '多段填空',
      comp: <TopicAddDdtk {...topicProps} />,
    },
    RADIO: {
      title: '选择题',
      comp: <TopicAddChoice {...topicProps} />,
    },
    TEXT: {
      title: '问答题',
      comp: <TopicAddProblem {...topicProps} />,
    },
    COMPLETION_SENIOR: {
      title: '高级填空',
      comp: <AddDdtkSenior {...topicProps} />,
    },
  };
  const handleShow = () => {
    setshowModal(true);
  };
  return (
    <span className={styles.btn_wrap}>
      {
        isShowEdit && (
          actionType === 'add' ? (
            <div className={styles.btn}>
              <span className="cursor-pointer" onClick={debounce(handleShow, 300)}>
                +添加新的{typeObj[topicType].title}
              </span>
            </div>
          ) : <span onClick={debounce(handleShow, 300)} className="edit_btn">
                <EditOutlined />编辑
              </span>
        )
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
    </span>
  );
};

export default TopicAddBtn;
