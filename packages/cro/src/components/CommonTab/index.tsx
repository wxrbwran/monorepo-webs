import React, { useState, useEffect } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { history, useSelector } from 'umi';
import more from '@/assets/img/more.svg';
import { Tabs, Dropdown, Menu, Form, Input, Button, message, Divider } from 'antd';
import { DeleteOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import * as api from '@/services/api';
import { Role } from 'xzl-web-shared/dist/utils/role';
import './index.scss';
import { CommonData, IState } from 'typings/global';
import { useRef } from 'react';


const { TabPane } = Tabs;
interface IProps {
  activeTab: string;
  location: {
    pathname: string;
    query: {
      projectSid: string;
    }
  };
}
function CommonTab(props: IProps) {
  const dispatch = useDispatch();
  const [currTab, setCurrTab] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const projectName = window.$storage.getItem('projectName');
  const { roleType, status } = useSelector((state: IState) => state.project.projDetail);
  const { projectSid } = props.location.query;
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);


  const [val, setVal] = useState('');
  const [seconds, setSeconds] = useState(60);
  const [isGetting, setIsGetting] = useState(false);
  const timerRef = useRef();

  const modalText: CommonData = {
    'del': {
      title: '删除项目',
      btnText: '删除',
      content: `一旦你彻底删除项目「${projectName}」，所有与项目有关的信息将会被永久删除。这是一个不可恢复的操作，请谨慎对待！`,
      type: 3,
    },
    'close': {
      title: '封闭试验',
      btnText: '确定',
      content: `一旦你封闭【${projectName}】，所有项目信息将不可修改。这是一个不可恢复的操作，请谨慎对待！`,
      type: 1,
      status: 1001,
    },
    'reOpen': {
      title: '解除封闭',
      btnText: '确定',
      content: '1. 解除封闭后，你可以修改项目内容\n2. 封闭之前将按原计划执行，封闭之后将按新的计划执行\n3. 请谨慎操作，尽快完成项目修改',
      type: 2,
      status: 1002,
    },
  };

  const [form] = Form.useForm();
  const { setFieldsValue } = form;

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(timerRef.current);
      setSeconds(60);
      setIsGetting(false);
    }
  }, [seconds]);

  // 封闭项目：1   解封项目：2   删除项目：3
  const fetchVcode = () => {
    if (!isGetting) {

      setIsGetting(true);
      api.detail.patchCodeMake({
        projectSid: projectSid,
        projectNsId: projectNsId,
        projectName,
        type: modalText[modalType].type,
      }).then(() => {
        timerRef.current = setInterval(() => {
          setSeconds((preSeconds) => preSeconds - 1);
        }, 1000);
      });
    }
  };

  useEffect(() => {
    const urlName = props.location.pathname.split('/')[1];
    console.log(urlName);
    if (currTab !== urlName) {
      setCurrTab(urlName);
    }
  }, [props]);
  const handleChangeTab = (key: string) => {
    if (key !== currTab) {
      history.push(`/${key}`);
      dispatch({
        type: 'navBar/setActiveTab',
        payload: {
          activeTab: key,
        },
      });
    }
  };

  const onFinish = (values: any) => {

    console.log('============== values, ', values);
    api.detail.patchCodeCheck({
      projectSid: projectSid,
      projectNsId: projectNsId,
      note: {
        code: values.code,
      },
      status: modalText[modalType].status ?? status,
      type: modalText[modalType].type,
    }).then(() => {

      if (modalType === 'del') {
        message.success('项目删除成功');
        //更新常用问题列表
        history.push('/home');
      } else {
        message.success('更改信息成功');
        setShowModal(false);
        dispatch({
          type: 'project/fetchProjectDetail',
          payload: projectSid || window.$storage.getItem('projectSid'),
        });
      }
    });
  };

  const croNav = [
    {
      statusName: '项目管理',
      status: 'proj_detail',
    },
    {
      statusName: '受试者管理',
      status: 'patient_manage',
    },
    {
      statusName: '主观量表',
      status: 'subjective_table',
    },
    {
      statusName: '客观检查',
      status: 'objective_table',
    },
    {
      statusName: '终点事件和CRF量表',
      status: 'end_event',
    },
    {
      statusName: '查询',
      status: 'query',
    },
    // {
    //   statusName: '报告',
    //   status: 'report',
    // },
    {
      statusName: '研究者管理',
      status: 'researcher',
    },
    // {
    //   statusName: '模板',
    //   status: 'template',
    // },
    {
      statusName: '计划外访视',
      status: 'out_plan_visit',
    },
  ];
  const handleShowModal = (type: string) => {

    if (modalType != type) {
      // 不一样，需要清空之前的计时等数据
      clearInterval(timerRef.current);
      setSeconds(60);
      setIsGetting(false);
      setVal('');
      setFieldsValue({
        'code': '',
      });
    }

    setModalType(type);
    setShowModal(true);
  };
  const menu = (
    <Menu>
      <Menu.Item onClick={() => handleShowModal('del')}>
        <DeleteOutlined /> 删除项目
      </Menu.Item>
      {
        status !== 1001 && (
          <>
            <Divider style={{ margin: 0 }} />
            <Menu.Item onClick={() => handleShowModal('close')}>
              <LockOutlined /> 封闭试验
            </Menu.Item>
          </>
        )
      }
      {
        status == 1001 && (
          <>
            <Divider style={{ margin: 0 }} />
            <Menu.Item onClick={() => handleShowModal('reOpen')}>
              <LockOutlined /> 解封试验
            </Menu.Item>
          </>
        )
      }
    </Menu>
  );
  const operations = (
    <Dropdown overlay={menu} trigger={['click']} overlayClassName="proj-dropdown">
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        <img src={more} />
      </a>
    </Dropdown>
  );
  return (
    <>
      <Tabs
        onChange={handleChangeTab}
        activeKey={currTab}
        tabPosition="top"
        animated={false}
        tabBarExtraContent={
          [Role.MAIN_PI.id, Role.PROJECT_LEADER.id].includes(roleType)
            ? operations : <></>
        }
        className="project-cont-tab"
      >
        {croNav.map((pane) => (
          <TabPane tab={pane.statusName} key={pane.status} />
        ))}
      </Tabs>
      {showModal && (
        <DragModal
          visible={showModal}
          title={modalText[modalType].title}
          width={500}
          wrapClassName="ant-modal-wrap-center"
          onCancel={() => setShowModal(false)}
          maskClosable
          footer={null}
          className="del_proj"
        >
          <p className={`tip ${modalType == 'reOpen' ? 'tip_color' : ''}`}>
            {modalText[modalType].content}
          </p>

          <Form
            name="findPwd"
            initialValues={{ remember: true }}
            onFinish={(value) => onFinish(value)}
            id="height42"
            form={form}
          >
            <div className={'code_wrap'}>
              <Form.Item className='code' name="code" rules={[{ required: true, message: '请输入接收到的验证码!' }]}>
                {/* <Input prefix={<LockOutlined />} placeholder="请输入收到的验证码" />
                 */}
                {/* <Input placeholder={`请输入验证码：${modalText[modalType].title}`} onChange={(e) => setVal(e.target.value)} /> */}
                <Input placeholder={'请输入验证码：'} onChange={(e) => setVal(e.target.value)} />
              </Form.Item>
              <Button
                className={`${'fetch_btn'} ${isGetting ? 'fetch_btn_getting' : ''}`}
                type="text"
                onClick={fetchVcode}
                style={{ width: isGetting ? 140 : 160 }}
              >
                {isGetting ? `${seconds}s后重新获取` : '发送验证码到心之力APP'}
              </Button>
            </div>

            <div className="btn">
              <Form.Item>
                <Button onClick={() => setShowModal(!showModal)}> 取消 </Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" disabled={!(val.length > 0)} danger>
                  {' '}
                  {modalText[modalType].btnText}{' '}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </DragModal>
      )}
    </>
  );
}

export default CommonTab;
