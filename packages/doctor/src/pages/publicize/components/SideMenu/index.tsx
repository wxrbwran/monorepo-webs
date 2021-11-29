import React, { useState, useRef, useEffect } from 'react';
import { Link, useSelector, useDispatch } from 'umi';
import { Input, message } from 'antd';
import * as api from '@/services/api';
import { PlusOutlined, FormOutlined } from '@ant-design/icons';
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
  const pathname = props.location.pathname.split('/').pop();
  const [activeMenu, setActiveMenu] = useState(pathname);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [addGroupName, setAddGroupName] = useState('');
  const [activeIndex, setActiveIndex] = useState<number>(-1);//用于标识编辑状态还是非编辑状态
  const [modifyGroupName, setModifyGroupName] = useState('');
  const modifyInputRef = useRef<HTMLInputElement>(null);
  const groupList = useSelector((state: IState) => state.education.groupList);
  // const {projectNsId} = useSelector((state: IState) => state.project.projDetail);
  const currentOrgInfo = useSelector((state: IState) => state.user.currentOrgInfo);

  useEffect(() => {
    const currentPathname = props.location.pathname.split('/').pop();
    if (currentPathname !== activeMenu) {
      setActiveMenu(currentPathname);
    }
  }, [props]);

  const getGroupList = () => {
    //获取实验组
    dispatch({
      type: 'education/fetchGroupList',
      payload: currentOrgInfo.nsId,
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
      const params = {
        orgNSId: currentOrgInfo.nsId,
        namespaceName: addGroupName,
      };
      api.education.addGroup(params).then(() => {
        message.success('添加成功');
        getGroupList();
      })
        .catch(() => {
          message.error('添加失败');
        });
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
      const params = {
        namespaceName: modifyGroupName,
        nsId: groupId,
      };
      api.education.modifyGroup(params).then(() => {
        message.success('修改成功');
        getGroupList();
      });
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
            <div className={['menu', activeMenu === item.pathName ? 'active' : ''].join(' ')} key={item.name}>
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
          groupList?.map((item, index) => {
            return (
              <div className={['item', currentGroupId === item.id ? 'active' : ''].join(' ')} key={item.id}>
                <Link to={`/publicize/patients/groups?groupId=${item.id}`} onClick={() => resetIndex(index)}>
                  {activeIndex === index ?
                    <Input
                      onDrop={(e) => { e.preventDefault(); }}
                      defaultValue={item.name}
                      onFocus={(e) => { setModifyGroupName(e.target.value); }}
                      onChange={(e) => { setModifyGroupName(e.target.value); }}
                      onBlur={() => handleModifyGroup(item.id)}
                      onPressEnter={() => handleModifyGroup(item.id)}
                      ref={modifyInputRef}
                    />
                    : <span className="name">{item.name}</span>}
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
