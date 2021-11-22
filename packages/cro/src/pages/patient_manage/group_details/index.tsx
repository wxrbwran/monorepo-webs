import React, { useState, useEffect } from 'react';
import XzlTable from 'xzl-web-shared/src/components/XzlTable';
import { groupDetailColumns } from '@/utils/columns';
import { useSelector } from 'umi';
import { IState } from 'typings/global';
interface IProps {
  location: {
    query: {
      groupId: string;
    }
  };
}
// interface ISource {
//   groupName: string;
//   inGroupAt: number;
//   outGroupAt: number;
//   patientName: string;
//   status: string;
// }

function GroupDetails({ location }: IProps) {
  // const [dataSource, setDataSource] = useState<ISource[]>([]);
  const dataSource: string | any[] = [];
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  const [groupId, setGroupId] = useState(location.query.groupId);
  const [tableOptions, setOptions] = useState({ projectNsId, groupId: location.query.groupId });

  useEffect(() => {
    if (groupId !== location.query.groupId) {
      setGroupId(location.query.groupId);
      setOptions({ ...tableOptions, groupId: location.query.groupId });
    }

  }, [location]);

  return (
    <div className="patient-manage-cont">
      <div className="title">{dataSource.length > 0 && dataSource[0].groupName}</div>
      <div className="patient-list" style={{ marginTop: 8 }}>
        <XzlTable
          columns={groupDetailColumns()}
          dataKey="teams"
          category="patientList"
          request={window.$api.patientManage.getGroupPatient}
          noPagination={true}
          tableOptions={{
            rowSelection: false,
            pagination: false,
          }}
          depOptions={tableOptions}
        />
      </div>
    </div>
  );
}
export default GroupDetails;
