import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import XzlTable from 'xzl-web-shared/dist/components/XzlTable';
import { name, bindAt } from 'xzl-web-shared/dist/utils/columns';
import DiagnosisDetail from '../../components/DiagnosisDetail';
// import { groupDetailColumns } from '@/utils/columns';
// import { useSelector } from 'umi';
// import { IState } from 'typings/global';
interface IProps {
  location: {
    query: {
      groupId: string;
    }
  };
}

function GroupDetails({ location }: IProps) {
  // const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  const [groupId, setGroupId] = useState(location.query.groupId);
  const [tableOptions, setOptions] = useState({ groupId: location.query.groupId });
  const columns = [name, bindAt];

  useEffect(() => {
    if (groupId !== location.query.groupId) {
      setGroupId(location.query.groupId);
      setOptions({ ...tableOptions, groupId: location.query.groupId });
    }

  }, [location]);

  const action = {
    title: '诊断',
    dataIndex: 'diagnosis',
    align: 'center',
    className: 'action',
    render: (_text: string, record: any) => (
      <DiagnosisDetail sid={record.sid}>
        <Button type="link" className="text-base">查看详情</Button>
      </DiagnosisDetail>
    ),
  };

  return (
    <div className="patient-manage-cont">
      <div className="patient-list" style={{ marginTop: 8 }}>
        <XzlTable
          // columns={groupDetailColumns()}
          columns={[...columns, action]}
          dataKey="teams"
          request={window.$api.education.getGroupPatientList}
          // request={() => {}}
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
