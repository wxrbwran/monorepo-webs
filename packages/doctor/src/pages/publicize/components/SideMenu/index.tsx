import React from 'react';
import { Link } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import './index.scss';
// import { IState } from 'typings/global';
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
  // const groupList = useSelector((state: IState) => state.project.objectiveGroup);
  const groupList = [];
  // const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  const projectNsId = '';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
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
        <PlusOutlined style={{ fontSize: 14 }} />
      </div>
      {
        groupList.length === 0 && (
          <div className="creact-tip">
            <div>
              您的项目内暂无试验分组，创建分组并加入受试者开始您的科研吧。
            </div>
            <div className="btn" >立即创建</div>
          </div>
        )
      }
    </div>
  );
}
export default SideMenu;
