import React, { FC } from 'react';
import IconPatient from '@/assets/img/icon_patient.png';
import SelectDoctor from '../select-doctor';
import ChartPatientPie from '../chart-patient-pie';
import { Button, Table } from 'antd';

const PatientData: FC = () => {
  const PatientColumns = [
    {
      title: '患者姓名',
      dataIndex: 'patientName',
    },
    {
      title: '目前科室',
      dataIndex: 'patientName1',
    },
    {
      title: '是否有服药计划',
      dataIndex: 'patientName2',
    },
    {
      title: '是否调药',
      dataIndex: 'patientName3',
    },
    {
      title: '调药次数',
      dataIndex: 'patientName4',
    },
    {
      title: '上传血糖次数',
      dataIndex: 'patientName5',
    },
    {
      title: '最近血糖',
      dataIndex: 'patientName6',
    },
    {
      title: '上传血压/心率次数',
      dataIndex: 'patientName7',
    },
    {
      title: '最近血压',
      dataIndex: 'patientName8',
    },
    {
      title: '最近心率',
      dataIndex: 'patientName9',
    },

  ];
  const medicineData = [
    { value: 1048, name: '有服患者数量' },
    { value: 735, name: '无服药计划' },
  ];
  const drugAdjustmentData = [
    { value: 1048, name: '已调药患者数量' },
    { value: 735, name: '未调药' },
  ];
  return (
    <div className="shadow p-15 mt-20 w-full">
      <div className="flex text-sm items-center">
        <img className="w-18 h-18" src={IconPatient} />
        <span className="text-base font-bold mr-60 ml-5">患者数据</span>
        <SelectDoctor />
        <Button type="primary" className="ml-10">查询</Button>
      </div>
      <div className="flex w-full">
        <ChartPatientPie id="medicinePlan" chartData={medicineData}  />
        <ChartPatientPie id="drugAdjustment" chartData={drugAdjustmentData} />
      </div>
      <Table
        dataSource={[]}
        columns={PatientColumns}
        rowKey={(record: { id: string }) => record.id}
      />
    </div>
  );
};

export default PatientData;
