import React, { FC, useState, useEffect } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import MemberItem from '../MemberItem';
import { Checkbox, Row, Col, Radio, Button } from 'antd';
import styles from './index.scss';
import { Role } from 'xzl-web-shared/src/utils/role';

export interface IMember {
  role: string;
  avatarUrl: string;
  name: string;
  sourceNSId: string;
  orgName: string;
  sid: string;
}
interface IProps {
  role: string;
  callbackSelectDoctor: (members: IMember[]) => void;
  title: string;
  selectedDoctorSid: string[]; // 同角色，已选择的医生sid集合
  friends: any[];
  members: IMember[];
  initWorkOrgs: CommonData;
}
const ChoiceDoctor: FC<IProps> = (props) => {
  const { children, role, title, callbackSelectDoctor, selectedDoctorSid, friends, initWorkOrgs } = props;
  const [showModal, setshowModal] = useState(false); // 选择医生的弹框
  const [showOrgModal, setshowOrgModal] = useState(false); // 选择机构的弹框
  const [lastCheckDoc, setLastCheckDoc] = useState<ISubject>({}); // 当前选择的医生(弹选择机构时，使用此数据的orgs)
  const [selectDoctors, setSelectDoctors] = useState<any[]>([]); // 保存用户勾选的医生列表
  const [selectOrg, setSelectOrg] = useState<null | { name: string, nsId: string }>(null); // 当前勾选的机构nsId
  const [doctorWorkOrg, setDoctorWorkOrg] = useState({}); // 枚举出：勾选的医生所对应勾选的机构

  const handleShowModal = () => {
    setshowModal(true);
  };

  useEffect(() => {
    if (!showModal) {
      setSelectDoctors([]);
      setDoctorWorkOrg({});
      setshowOrgModal(false);
    }
  }, [showModal]);
  const handleChoiceDoctor = (choiceSids: string[]) => {
    console.log('choiceDoctorSid', choiceSids);
    console.log('selectDoctors', selectDoctors);
    // 增加勾选，此时不setSelectDoctors，在勾选完机构后再setSelectDoctors
    if (choiceSids.length > selectDoctors.length) {
      const selectDoctorsSid = selectDoctors.map(item => item.sid);
      const newAddSid = choiceSids.filter(sidItem => !selectDoctorsSid.includes(sidItem))[0];
      let newAddData = friends.filter(item => item.sid === newAddSid)[0];

      setLastCheckDoc(newAddData);
      let orgInfo = { nsId: newAddData!.orgs![0].nsId, name: newAddData!.orgs![0].name };
      // 如果此医生已经选择过了，其它角色 再选择此医生机构则直接指定之前的机构。一个套餐中：一个医生可以多角色，但不能多机构
      const newAddDoctorOrgNsid = initWorkOrgs[newAddData.sid!];
      if (newAddDoctorOrgNsid) {
        orgInfo = {
          nsId: newAddDoctorOrgNsid,
          name: newAddData!.orgs.filter(org => org.nsId === newAddDoctorOrgNsid)?.[0].name,
        };
      }
      setSelectOrg(orgInfo); // 默认选中机构
      if (newAddData.orgs!.length > 1 && !newAddDoctorOrgNsid) {
        setshowOrgModal(true);
      } else {
        doctorWorkOrg[newAddData.sid] = orgInfo.nsId;
        setDoctorWorkOrg({ ...doctorWorkOrg });

        newAddData = { ...newAddData, selectOrgNsid: orgInfo.nsId, selectOrgName: orgInfo.name };
        if (role === Role.UPPER_DOCTOR.id) {
          setSelectDoctors([newAddData]);
        } else {
          setSelectDoctors([
            ...selectDoctors,
            newAddData,
          ]);
        }
      }
    } else {
      // 取消勾选
      const newList = selectDoctors.filter(docItem => choiceSids.includes(docItem.sid));
      setSelectDoctors([...newList]);
    }
  };
  const handleChangeOrg = (val) => {
    lastCheckDoc!.orgs!.forEach(item => {
      if (item.nsId === val.target.value) {
        setSelectOrg({ nsId: item.nsId, name: item.name });
      }
    });
  };
  const handleChoiceOrg = () => {
    const selectOrgInfo = { selectOrgNsid: selectOrg!.nsId, selectOrgName: selectOrg!.name };
    const addDoctor = { ...lastCheckDoc,  ...selectOrgInfo }; // 追加进去新勾选的医生
    doctorWorkOrg[lastCheckDoc.sid!] = selectOrgInfo.selectOrgNsid; // 保存所选医生对应的机构nsid
    setshowOrgModal(false);
    setDoctorWorkOrg({ ...doctorWorkOrg });
    // @ts-ignore
    if (role === Role.UPPER_DOCTOR.id) {
      setSelectDoctors([addDoctor]);
    } else {
      setSelectDoctors([...selectDoctors, addDoctor]);
    }
    setSelectOrg(null); // 置空已选择机构
  };

  const handleSave = () => {
    const doctors = selectDoctors.map((item: any) => {
      return {
        role, // 传进来的，在套餐中以什么角色
        avatarUrl: item.avatarUrl,
        name: item.name,
        sourceNSId: item.selectOrgNsid,
        orgName: item.selectOrgName,
        sid: item.sid,
      };
    });
    callbackSelectDoctor(doctors);
    setshowModal(false);
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
        title={`从团队中选择${title}`}
        footer={null}
        destroyOnClose
      >
        <div className={styles.choice_doctor}>
          <Checkbox.Group style={{ width: '100%' }} onChange={handleChoiceDoctor}
           value = {selectDoctors.map(item => item.sid)}
          >
            <Row>
              {
                friends.filter(item => !selectedDoctorSid.includes(item.sid)).map((doctor: ISubject) => {
                  return (
                    <Col span={12} key={doctor.sid}>
                      <Checkbox value={doctor.sid}>
                        <MemberItem doctorData={doctor} doctorWorkOrg={doctorWorkOrg} />
                      </Checkbox>
                    </Col>
                  );
                })
              }
            </Row>
          </Checkbox.Group>
        </div>
        <Button type="primary" className="w-98 mx-auto mt-30 block" onClick={handleSave}>确认</Button>
      </DragModal>
      {
        showOrgModal && (
          <DragModal
            wrapClassName="ant-modal-wrap-center cancel_text_blue"
            width={1000}
            maskClosable
            visible={showOrgModal}
            onCancel={handleChoiceOrg}
            title='请选择所在互联网医院'
            footer={null}
            destroyOnClose
          >
            <div className={styles.choice_org}>
              <Radio.Group onChange={handleChangeOrg} defaultValue={lastCheckDoc?.orgs?.[0].nsId}>
                { lastCheckDoc?.orgs?.map(org =>  <Radio value={org.nsId} key={org.nsId}>{org.name}</Radio>) }
              </Radio.Group>
            </div>
            <Button type="primary" className="w-98 mx-auto mt-30 block" onClick={handleChoiceOrg}>确认</Button>
          </DragModal>
        )
      }
    </div>
  );
};

export default ChoiceDoctor;
