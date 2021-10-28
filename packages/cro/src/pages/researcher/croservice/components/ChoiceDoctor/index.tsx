import React, { FC, useState } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import MemberItem from '../MemberItem';
import { Checkbox, Row, Col } from 'antd';
import styles from './index.scss';

interface IProps {
  role: string;
  members: any[];
  handleChoice: (type: string, doctor: any) => void;
  friends: any[];
}
const ChoiceDoctor: FC<IProps> = (props) => {
  const { children, role, members, friends } = props;
  const [showModal, setshowModal] = useState(false);
  // const [showOrgModal, setshowOrgModal] = useState(false);
  const handleShowModal = () => {
    setshowModal(true);
  };
  const handleChoiceDoctor = (sid) => {

    // 过滤出来选中的那个id
    console.log('checkedValues', sid);
    // setshowOrgModal(true);
  };
  // const handleChoiceOrg = (val) => {
  //   console.log(343, val);
  // };

  console.log('============== ChoiceDoctor members', members.length);
  return (
    <div>
      <div onClick={handleShowModal}>{children}</div>
      <DragModal
        wrapClassName="ant-modal-wrap-center cancel_text_blue"
        width={1000}
        maskClosable
        visible={showModal}
        onCancel={() => setshowModal(false)}
        title={`从团队中选择${role}`}
        footer={null}
        destroyOnClose
      >
        <div className={styles.choice_doctor}>
          <Checkbox.Group style={{ width: '100%' }} onChange={handleChoiceDoctor}>
            <Row>
              {
                friends.map((item) => {
                  return (<Col span={12}>
                    <Checkbox value={item.sid}>
                      <MemberItem doctorData={item} />
                    </Checkbox>
                  </Col>);
                })
              }
            </Row>
          </Checkbox.Group>
        </div>
      </DragModal>
      {/* <DragModal
        wrapClassName="ant-modal-wrap-center cancel_text_blue"
        width={1000}
        maskClosable
        visible={showOrgModal}
        onCancel={() => setshowOrgModal(false)}
        title='请选择所在互联网医院'
        footer={null}
        destroyOnClose
      >
        <Radio.Group onChange={handleChoiceOrg} defaultValue={1}>
          <Radio value={1}>A</Radio>
          <Radio value={2}>B</Radio>
          <Radio value={3}>C</Radio>
          <Radio value={4}>D</Radio>
        </Radio.Group>
      </DragModal> */}
    </div>
  );
};

export default ChoiceDoctor;
