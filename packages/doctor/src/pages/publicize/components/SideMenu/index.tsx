import React, { useState, useRef } from 'react';
import { Link } from 'umi';
import { Input, message } from 'antd';
import { PlusOutlined, FormOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import './index.scss';
// import { IState } from 'typings/global';
interface IProps {
  location: {
    pathname: string;
    query: {
      groupId: string;
    };
  };
}

function SideMenu(props: IProps) {
  const dispatch = useDispatch();
  const [isShowAdd, setIsShowAdd] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [addGroupName, setAddGroupName] = useState('');
  const [activeIndex, setActiveIndex] = useState<number>(-1);//用于标识编辑状态还是非编辑状态
  const [modifyGroupName, setModifyGroupName] = useState('');
  const modifyInputRef = useRef<HTMLInputElement>(null);
  // const groupList = useSelector((state: IState) => state.project.objectiveGroup);
  // const {projectNsId} = useSelector((state: IState) => state.project.projDetail);
  const groupList:any =  [{
    'groupId': 'prod.exlgPe',
    'groupName': 'A1',
    'labels': ['research_patient_group'],
    'note': {
      'note1': '11',
    },
    'patientCount': 2,
  }, {
    'groupId': 'prod.WlAwZ4',
    'groupName': 'B',
    'labels': ['research_patient_group'],
    'note': {
      'note1': '12',
    },
    'patientCount': 0,
  }];
  const projectNsId = '';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  const getGroupList = () => {
    //获取实验组
    dispatch({
      type: 'project/fetchGroupList',
      payload: projectNsId,
    });
  };
  const handleChangeValues = (e: { target: { value: string } }) => {
    setAddGroupName(e.target.value);
  };
  const handleShowAdd = () => {
    setIsShowAdd(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 300);
  };
  const handleAddGroup = () => {
    if (!!addGroupName) {
      // const params = {
      //   projectNsId,
      //   groupName: addGroupName,
      // };
      // api.patientManage.postAddGroup(params).then(res => {
      //   message.success('添加成功');
      //   getGroupList();
      // });
    } else {
      message.error('组名不能为空');
    }
    setAddGroupName('');
    setIsShowAdd(false);
  };

  //编辑组名，更新值
  const setEditIndex = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, index: number) => {
    //不阻止冒泡会触发父级的点击事件，导致不显示input框
    e.stopPropagation();
    setTimeout(() => {
      if (modifyInputRef.current) {
        modifyInputRef.current.focus();
      }
    }, 300);
    setActiveIndex(index);
  };
  //修改组名
  const handleModifyGroup = (groupId: string) => {
    console.log(groupId);
    if (!!modifyGroupName) {
      // const params = {
      //   groupId: groupId,
      //   groupName: modifyGroupName,
      // };
      // api.patientManage.modifyGroup(params).then(res => {
      //   message.success('修改成功');
      //   getGroupList();
      // });
    } else {
      message.error('组名不能为空');
    }
    setModifyGroupName('');
    setActiveIndex(-1);
  };
  //重置index
  const resetIndex = (index: number) => {
    if (activeIndex !== index) {
      setActiveIndex(-1);
    }
  };

  const routerList = [
    {
      name: '全部患者',
      pathName: 'patients',
    },
  ];
  const currentGroupId = props.location.query.groupId;
  return (
    <div className="patient-manage-side">
      {
        routerList.map((item) => {
          return (
            <div className="menu font-bold" key={item.name}>
              <Link to={`/publicize/${item.pathName}`}>{item.name}</Link>
            </div>
          );
        })
      }
      <div className="group-title">
        <span>随访分组</span>
        <PlusOutlined style={{ fontSize: 14 }} onClick={handleShowAdd}/>
      </div>
      <div className="group-list">
        {
          groupList.map((item, index) => {
            return (
              <div className={['item', currentGroupId === item.groupId ? 'active' : ''].join(' ')} key={item.groupName}>
                <Link to={`/publicize/patients/groups?groupId=${item.groupId}`} onClick={() => resetIndex(index)}>
                  {activeIndex === index ?
                    <Input
                      onDrop={(e) => { e.preventDefault(); }}
                      defaultValue={item.groupName}
                      onFocus={(e) => { setModifyGroupName(e.target.value); }}
                      onChange={(e) => { setModifyGroupName(e.target.value); }}
                      onBlur={() => handleModifyGroup(item.groupId)}
                      onPressEnter={() => handleModifyGroup(item.groupId)}
                      ref={modifyInputRef}
                    />
                    : <span className="name">{item.groupName}</span>}
                  {activeIndex !== index && <FormOutlined onClick={(e) => setEditIndex(e, index)} />}
                </Link>
              </div>
            );
          })
        }
      </div>
      {
        isShowAdd && (
          <div className="create-group">
            <Input
              onDrop={(e) => { e.preventDefault(); }}
              value={addGroupName}
              onBlur={handleAddGroup}
              onPressEnter={handleAddGroup}
              onChange={(e) => handleChangeValues(e)}
              ref={inputRef}
            />
          </div>
        )
      }
      {/* {
        groupList.length === 0 && (
          <div className="creact-tip">
            <div>
              您的项目内暂无试验分组，创建分组并加入受试者开始您的科研吧。
            </div>
            <div className="btn" >立即创建</div>
          </div>
        )
      } */}
    </div>
  );
}
export default SideMenu;
