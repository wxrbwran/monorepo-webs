import React, { FC, useState, useRef, useEffect } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import { Checkbox, Row, Col } from 'antd';
import styles from './index.scss';
import { Button } from 'antd';
import ListItem from '../../../ListItem';
import { IList } from '../../../../const';


export interface ContentListModel {
  title: string,
  lists: IList[],
  type: string,
}

export interface DoctorOrgsProp {

  show: boolean; // 选择机构的弹窗是否展示
  orgs: any[]; // 选择机构的数据源
  defaultChoiceOrg: any; // 默认选中的机构
}

interface IProps {

  dragModalSources: ContentListModel[]; //ContentListModel[]会作为+号点击弹窗的数据来源
  dragModalDidShow: () => void; // 弹窗显示会调
  onSaveChoices: (choiceIds: string[]) => void; // 选中的所有数据id,
}

const ChoiceContent: FC<IProps> = (props) => {
  const { children, dragModalDidShow, dragModalSources, onSaveChoices } = props;
  const [showModal, setshowModal] = useState(false);
  const [contentList, setContentList] = useState<ContentListModel[]>([]);

  const choicesRef = useRef<[]>([]);

  useEffect(() => {
    setContentList(dragModalSources);
  }, [dragModalSources]);


  const handleShowModal = () => {

    // 每次弹窗重新弹出时, 清空选中的数据源
    choicesRef.current = [];
    setshowModal(true);
    dragModalDidShow();
  };

  const onChange = (val) => {

    choicesRef.current = val;
  };

  // 点击取消
  const onCancelChoices = () => {

    setshowModal(false);
  };

  const checkBoxDom = (item: ContentListModel) => (
    <>
      {
        !!item.lists.length && (
          <>
            <p className='font-bold mb-15 text-base'>{`·${item.title}`}</p>
            <Row wrap>
              {
                item.lists.map(i => (
                  <Col className="mr-40 mb-30" key={i.id}>
                    <Checkbox value={i.id}>
                      <ListItem type={item.type} item={i} />
                    </Checkbox>
                  </Col>
                ))
              }
            </Row>
          </>
        )
      }
    </>
  );

  return (
    <div>
      <div onClick={handleShowModal}>{children}</div>
      <DragModal
        wrapClassName="ant-modal-wrap-center cancel_text_blue"
        width={1000}
        maskClosable
        visible={showModal}
        onCancel={() => setshowModal(false)}
        title={'选择发送内容'}
        footer={null}
        destroyOnClose
      >
        <div className={styles.choice_doctor}>
          {
            <Checkbox.Group onChange={onChange} >
              {
                contentList?.length > 0 &&
                contentList.map((item) => (checkBoxDom(item)))
              }
            </Checkbox.Group>
          }
          <div className='flex flex-row justify-center'>
            <Button className="w-98 mt-20 mb-0 mr-20" type="primary" onClick={onCancelChoices}>取消</Button>
            <Button className="w-98 mt-20 mb-0 " type="primary" onClick={() => { setshowModal(false); onSaveChoices(choicesRef.current); }}>完成</Button>
          </div>

        </div>
      </DragModal>
    </div>
  );
};

export default ChoiceContent;
