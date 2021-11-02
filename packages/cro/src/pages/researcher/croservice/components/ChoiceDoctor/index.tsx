import React, { FC, useState, useRef, useEffect } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import MemberItem from '../MemberItem';
import { Checkbox, Row, Col } from 'antd';
import styles from './index.scss';
import { Button } from 'antd';

interface IProps {
  role: string;
  members: any[];
  handleChoice: (choices: any[]) => void;
  friends: any[];
}
const ChoiceDoctor: FC<IProps> = (props) => {
  const { children, role, members, friends, handleChoice } = props;
  const [showModal, setshowModal] = useState(false);
  const [choiceSources, setChoiceSources] = useState<any[]>([]);
  const choicesRef = useRef<[]>();



  const refreshChoiceSource = () => {

    const membersSids = members.map((memb) => { return memb.sid; });
    const result = friends.filter((item) => !membersSids?.includes(item.sid));
    console.log('============== ChoiceDoctor filter', JSON.stringify(result));
    setChoiceSources(result);
  };

  useEffect(() => {

    refreshChoiceSource();
  }, [friends]);

  useEffect(() => {

    refreshChoiceSource();
  }, [members]);

  const handleShowModal = () => {

    // 每次弹窗重新弹出时, 清空选中的数据源
    choicesRef.current = [];
    setshowModal(true);
  };
  // 选择了医生
  const handleChoiceDoctor = (sids) => {

    // console.log('============= sids sids', JSON.stringify(sids));
    // console.log('============= choicesRef.current', JSON.stringify(choicesRef.current));
    // const newChoiceSid = sids.filter((item) => !choicesRef.current?.includes(item));

    // const newChoice = choiceSources.filter((item) => newChoiceSid.includes(item.sid));
    // console.log('============= newChoice', JSON.stringify(newChoice));

    // console.log('============= newChoice.length', newChoice.length);

    // if (newChoice.length > 0 && newChoice[0].orgs?.length > 0) {
    //   setCurrentChoice(newChoice[0]);
    //   setshowOrgModal(true);
    // } else {
    //   setshowOrgModal(false);
    // }
    choicesRef.current = sids;
  };


  // const handleChoiceOrg = (nsId) => {

  //   setshowOrgModal(false);
  //   currentChoice.choiceOrgNsId = nsId;
  // };

  // 点击完成
  const onSaveChoices = () => {

    const result = choiceSources.filter((item) => choicesRef.current?.includes(item.sid));
    console.log('============= onSaveChoices', JSON.stringify(result));
    setshowModal(false);
    if (handleChoice) {
      handleChoice(result);
    }
  };

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
                choiceSources.map((item) => {
                  return (<Col span={12}>
                    <Checkbox value={item.sid}>
                      <MemberItem doctorData={item} />
                    </Checkbox>
                  </Col>);
                })
              }
            </Row>
          </Checkbox.Group>
          <Button className="w-98 mt-20 mb-0 mx-auto block" type="primary" onClick={onSaveChoices}>完成</Button>
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
        <Radio.Group onChange={handleChoiceOrg} defaultValue={currentChoice ? currentChoice.choiceOrgNsId : ''}>
          {
            currentChoice &&
            currentChoice.orgs.map((item) => {
              return (<Radio value={item.nsId}>{item.name}</Radio>);
            })
          }
        </Radio.Group>
      </DragModal> */}
    </div>
  );
};

export default ChoiceDoctor;
