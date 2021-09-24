import React from 'react';
import { Link } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import { IState } from 'typings/global';
import AddEditGroup from '../AddEditGroup';

// interface IProps {
//   location: {
//     pathname: string;
//     query: {
//       groupId?: string;
//     };
//   };
// }

function SideMenu() {
  const dispatch = useDispatch();
  const groupList = useSelector((state: IState) => state.project.objectiveGroup);
  // const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  const projectNsId = '';

  const getGroupList = () => {
    //获取实验组
    dispatch({
      type: 'project/fetchGroupList',
      payload: projectNsId,
    });
  };
  const routerList = [
    {
      name: '全部患者',
      pathName: 'patient',
    },
  ];
  return (
    <div className="patient-manage-side">
      {
        routerList.map((item) => {
          return (
            <div className="menu active" key={item.name}>
              <Link to={`/patient_manage/${item.pathName}`}>{item.name}</Link>
            </div>
          );
        })
      }
      <div className="group-title">
        <span>随访分组</span>
        <AddEditGroup type="add" projectNsId={projectNsId} onSuccess={getGroupList}>
          <PlusOutlined style={{ fontSize: 14 }} />
        </AddEditGroup>
      </div>
      {
        groupList.length === 0 && (
          <div className="creact-tip">
            <div>
              您的项目内暂无试验分组，创建分组并加入受试者开始您的科研吧。
            </div>
            <AddEditGroup type="add" projectNsId={projectNsId} onSuccess={getGroupList}>
              <div className="btn" >立即创建</div>
            </AddEditGroup>
          </div>
        )
      }
    </div>
  );
}
export default SideMenu;
