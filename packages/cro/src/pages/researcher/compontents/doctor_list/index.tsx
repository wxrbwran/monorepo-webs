import React, { useState } from 'react';
import { addGroupDoctorListColumns } from '@/utils/columns';
import { useSelector } from 'umi';
import XzlTable from 'xzl-web-shared/dist/src/components/XzlTable';
import { IState } from 'typings/global';

export interface Irecord {
  key: string;
  name: string;
  groupName: string;
  role: string;
  title: string;
  phone: string;
  subjectId: string;
  department: string;
}
interface Iprops {
  handleChangeSelect?: (params:Irecord[] ) =>  void; // 已选择的pi名字
  type?: string;
}
function DoctorList(props: Iprops) {
  const { handleChangeSelect, type } = props;
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  const [depOptions, _setOptions] = useState({ projectNsId, status: 1002 });
  const rowSelection = {
    type: type || 'radio',
    onChange: (selectedRowKeys: string, selectedRows: Irecord[]) => {
      console.log('selectedRowKeys', selectedRowKeys);
      if (handleChangeSelect) {
        handleChangeSelect(selectedRows);
      }
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: Irecord) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <div>
      <XzlTable
        columns={addGroupDoctorListColumns}
        dataKey="infos"
        request={window.$api.research.fetchInviteDoctorList}
        depOptions={depOptions}
        noPagination={true}
        tableOptions={{
          rowSelection: { ...rowSelection },
          pagination: false,
        }}
      />
    </div>
  );
}

export default DoctorList;

