import React, { FC, useState, useEffect } from 'react';
import { Input, message, Form, Button } from 'antd';
import { useSelector, useDispatch } from 'umi';
import { isEmpty } from 'lodash';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { Role } from 'xzl-web-shared/dist/utils/role';
import styles from './index.scss';

interface IProps {
  onSuccess: () => void;
}
const PatientRecord:FC<IProps> = ({ children, onSuccess }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeId, setActiveId] = useState<string>(); // 机构空间id
  const [loading, setLoading] = useState(false);
  const [orgList, setOrgList] = useState<ISubject[]>([]);
  const orgTeams: IOrgTeams[] = useSelector((state: IState) => state.user.organizations.teams);
  const dispatch = useDispatch();
  const fetchFilterOrgList = () => {
    const filterList: ISubject[] = [];
    console.log('orgTeams', orgTeams);
    orgTeams.forEach((item: IOrgTeams) => {
      let aloneDoctorNsid: string = '';
      let orgInfo: ISubject = {};
      // 过滤只显示独立角色所在机构列表
      item.members.forEach((member:ISubject) => {
        if (member.role === Role.ALONE_DOCTOR.id) {
          // i. 拉取医生所在医院列表的返回值中，有医生作为独立角色的对象，提取空间ID，作为患者所在的空间ID
          aloneDoctorNsid = member.nsId!;
        }
        if (member.role === Role.ORG.id) {
          orgInfo = {
            ...member,
            nsId: item.teamNSId,
          };
        }
      });
      if (!!aloneDoctorNsid && !isEmpty(orgInfo)) {
        filterList.push({ ...orgInfo, aloneDoctorNsid });
      }
    });
    console.log('===3=23', filterList);
    setOrgList([...filterList]);
    if (filterList.length === 1) {
      setActiveId(filterList[0].nsId);
    }
  };
  useEffect(() => {
    fetchFilterOrgList();
  }, [orgTeams]);
  useEffect(() => {
    if (!!showModal) {
      dispatch({
        type: 'user/getUserOrganizations',
        payload: null,
      });
    } else {
      setActiveId('');
    }
  }, [showModal]);

  const onFinish = (values: CommonData) => {
    setLoading(true);
    if (activeId) {
      console.log(values);
      // PATIENT
      const params = {
        ...values,
        nsId: activeId,
        role: Role.PATIENT.id,
      };
      window.$api.doctor.putDoctorRegistryPatient(params).then(() => {
        message.success('建档成功');
        setLoading(false);
        setShowModal(false);
        onSuccess();
      }).catch((err: any) => {
        message.error(err?.result || '建档失败');
        setLoading(false);
      });
    } else {
      setLoading(false);
      message.error('请选择医院！');
    }
  };
  return (
    <>
      <span onClick={() => setShowModal(true)}>{children}</span>
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        width={620}
        visible={showModal}
        title="患者建档"
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <div className={styles.patient_record}>
          <Form
            name="PatientRecord"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}
          >
            <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名!' }]} >
              <Input />
            </Form.Item>
            <Form.Item label="手机号" name="tel" rules={[{ required: true, message: '请输入手机号!' }]}>
              <Input maxLength={11} />
            </Form.Item>
            <Form.Item label="身份证号" name="idNum" rules={[{ required: true, message: '请输入身份证号!' }]} >
              <Input maxLength={18} />
            </Form.Item>
            <div className={styles.item}>
              <span><strong style={{ color: '#ff4d4f' }}>*</strong> 添加到医院 :</span>
              { isEmpty(orgList) && <span>暂无执业机构</span> }
              <ul className={styles.orgList}>
                {
                  orgList.map((item) => (
                    <li
                      key={item.nsId}
                      className={activeId === item.aloneDoctorNsid && styles.active}
                      onClick={() => { setActiveId(item.aloneDoctorNsid); } }
                    >
                      {item.name}
                    </li>
                  ))
                }
              </ul>
            </div>
            <Form.Item wrapperCol={{ offset: 2, span: 22 }}>
              <div className="common__btn">
                <Button className={styles.submit} onClick={() => setShowModal(false)}> 取消 </Button>
                <Button className={styles.submit}  htmlType="submit" type="primary" loading={loading}> 确认 </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </DragModal>
    </>
  );
};
export default PatientRecord;
