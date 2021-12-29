import React, { FC, useState, useRef, useEffect } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import MemberItem from '../MemberItem';
import { Checkbox, Row, Col, Radio } from 'antd';
import styles from './index.scss';
import { Button } from 'antd';

export interface DoctorOrgsProp {

  show: boolean; // 选择机构的弹窗是否展示
  orgs: any[]; // 选择机构的数据源
  defaultChoiceOrg: any; // 默认选中的机构
}

interface IProps {
  role: string;
  members: any[]; // 当前已经选择了的好友
  handleChoice: (choices: any[]) => void;
  friends: any[]; // 数据源，好友数组
  onDoctorChoice: (member) => DoctorOrgsProp; // 选中了某个医生，需要返回一个DoctorOrgsProp，制定选择机构弹窗的配置
  onDoctorUnChoice: (member) => boolean; // 取消选中了某个医生，需要返回一个bool值，判断chiceOrg是不是要赋空值
}

const ChoiceDoctor: FC<IProps> = (props) => {
  const { children, role, members, friends, handleChoice, onDoctorChoice, onDoctorUnChoice } = props;
  const [showModal, setshowModal] = useState(false);
  const [choiceSources, setChoiceSources] = useState<any[]>([]); //能选择的数据源
  const choicesRef = useRef<[]>([]);

  const [showOrgModal, setshowOrgModal] = useState(false); // 选择机构的弹框
  const [currentChoice, setCurrentChoice] = useState(false); // 选择机构的弹框
  const [currentChoiceOrgsProp, setCurrentChoiceOrgsProp] = useState(false); // 选择机构的弹框


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

    console.log('============= sids sids', JSON.stringify(sids));
    console.log('============= choicesRef.current', JSON.stringify(choicesRef.current));
    // 将取消选中的member的choiceOrg删除，
    const cancelChoiceSid = choicesRef.current.filter((sid) => !sids?.includes(sid));

    if (cancelChoiceSid.length > 0) {
      console.log('======= 取消选中了 ======== ', cancelChoiceSid);
      const cancelChoice = choiceSources.filter((item) => cancelChoiceSid.includes(item.sid));
      // 判断choiceOrg是不是要清空,如果别的选择了，那么就不允许清空
      if (onDoctorUnChoice) {
        if (onDoctorUnChoice(cancelChoice[0])) {
          cancelChoice[0].choiceOrg = null;
        }
      }
      setCurrentChoice(undefined);
      console.log('======= 取消选中了 ======== ', cancelChoiceSid, JSON.stringify(cancelChoice));
    }
    // 新加入的member进行是否选择机构的判断
    const newChoiceSid = sids.filter((sid) => !choicesRef.current?.includes(sid));
    if (newChoiceSid.length > 0) {
      const newChoice = choiceSources.filter((item) => newChoiceSid.includes(item.sid));
      setCurrentChoice(newChoice[0]);
      if (onDoctorChoice) {
        const result = onDoctorChoice(newChoice[0]);

        console.log('==================== result', JSON.stringify(result));
        newChoice[0].choiceOrg = result.defaultChoiceOrg;
        setCurrentChoiceOrgsProp(result);
        setshowOrgModal(result.show);
      }
    }
    choicesRef.current = sids;
  };


  const handleChangeOrg = (e) => {

    currentChoice.choiceOrg = currentChoice.orgs.filter((item) => item.nsId == e.target.value)[0];
  };

  const handleChoiceOrg = () => {
    setshowOrgModal(false);
  };

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
      <DragModal
        wrapClassName="ant-modal-wrap-center cancel_text_blue"
        width={1000}
        maskClosable
        visible={showOrgModal}
        onCancel={() => setshowOrgModal(false)}
        title='请选择所在线上医院和项目机构'
        footer={null}
        destroyOnClose
      >
        <div className={styles.choice_org}>
          <Radio.Group onChange={handleChangeOrg} defaultValue={currentChoiceOrgsProp?.defaultChoiceOrg?.nsId ?? ''}>
            {
              currentChoiceOrgsProp &&
              currentChoiceOrgsProp.orgs.map((item) => {
                return (<Radio value={item.nsId}>{item.name}</Radio>);
              })
            }
          </Radio.Group>
        </div>
        <Button type="primary" className="w-98 mx-auto mt-30 block" onClick={handleChoiceOrg}>确认</Button>
      </DragModal>
    </div>
  );
};

export default ChoiceDoctor;
