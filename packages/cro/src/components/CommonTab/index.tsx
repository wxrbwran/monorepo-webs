import React, { useState, useEffect } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import { history, useSelector } from 'umi';
import more from '@/assets/img/more.svg';
import { Tabs, Dropdown, Menu, Input, Button, message, Divider } from 'antd';
import { DeleteOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import * as api from '@/services/api';
import { Role } from 'xzl-web-shared/src/utils/role';
import './index.scss';
import { CommonData, IState } from 'typings/global';

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
  const [val, setVal] = useState('');
  const { projectSid } = props.location.query;
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
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
  const handleDel = () => {
    console.log('modalType', modalType);
    // 根据目前展示弹框 的类型判断调用 哪个接口
    if (modalType === 'del') {
      api.project.delProject(window.$storage.getItem('projectSid')).then(() => {
        message.success('项目删除成功');
        //更新常用问题列表
        history.push('/home');
      });
    } else {
      const params = {
        status: 1001,
        projectSid: projectSid || window.$storage.getItem('projectSid'),
        projectNsId,
      };
      api.detail.updateCroProject(params).then(() => {
        message.success('更改信息成功');
        setShowModal(false);
        dispatch({
          type: 'project/fetchProjectDetail',
          payload:  projectSid || window.$storage.getItem('projectSid'),
        });
      })
        .catch((err) => {
          message.error(err);
        });
    }

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
    // }
  ];
  const handleShowModal = (type: string) => {
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
    </Menu>
  );
  const operations = (
    <Dropdown overlay={menu} trigger={['click']} overlayClassName="proj-dropdown">
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        <img src={more} />
      </a>
    </Dropdown>
  );
  const modalText: CommonData = {
    'del': {
      title: '删除项目',
      btnText: '删除',
      content: `一旦你彻底删除项目「${projectName}」，所有与项目有关的信息将会被永久删除。这是一个不可恢复的操作，请谨慎对待！`,
    },
    'close': {
      title: '封闭试验',
      btnText: '确定',
      content: `一旦你封闭【${projectName}】，所有项目信息将不可修改。这是一个不可恢复的操作，请谨慎对待！`,
    },
  };
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
          <p className="tip">
            {modalText[modalType].content}
          </p>
          <Input placeholder={`请输入：${modalText[modalType].title}`} onChange={(e) => setVal(e.target.value)} />

          <div className="btn">
            <Button onClick={() => setShowModal(!showModal)}> 取消 </Button>
            <Button type="primary" onClick={handleDel} disabled={val !== modalText[modalType].title} danger>
              {' '}
              {modalText[modalType].btnText}{' '}
            </Button>
          </div>
        </DragModal>
      )}
    </>
  );
}

export default CommonTab;
