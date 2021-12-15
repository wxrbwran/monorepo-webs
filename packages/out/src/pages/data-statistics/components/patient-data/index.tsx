import React, { FC, useState } from 'react';
import IconPatient from '@/assets/img/icon_patient.png';
import SelectDoctor, { IDocList } from '../select-doctor';
import ChartPatientPie from '../chart-patient-pie';
import { isEmpty, debounce } from 'lodash';
import { Button } from 'antd';
import XzlTable from 'xzl-web-shared/dist/src/components/XzlTable';

interface IChartItem {
  value: number;
  name: string;
}
const PatientData: FC<IDocList> = ({ doctorList }) => {
  const nsId = window.$storage.getItem('nsId');
  const [doctorSids, setdoctorSids] = useState<string[]>([]);
  const [planChartData, setPlanChartData] = useState<IChartItem[]>([]);
  const [medicineChartData, setMedicineChartData] = useState<IChartItem[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const [tableOptions, setOptions] = useState({ nsId, pageAt: 1 });

  const fetchData = () => {
    setIsSearch(true);
    const params: { nsId: string; doctorSids?: string[] } = { nsId };
    if (!isEmpty(doctorSids)) {
      params.doctorSids = doctorSids;
    }
    window.$api.count.getPatientAdjustAndPlan(params).then(res => {
      const { plan, tiaoyao, total } = res;
      setPlanChartData([
        { value: total - plan, name: '否' },
        { value: plan, name: '是' },
      ]);
      setMedicineChartData([
        { value: total - tiaoyao, name: '否' },
        { value: tiaoyao, name: '是' },
      ]);
    });
    if (!isEmpty(doctorSids)) {
      setOptions({
        ...tableOptions,
        doctorSids,
      });
    } else {
      setOptions({  ...tableOptions });
    }
  };
  const PatientColumns = [
    { title: '患者姓名',  dataIndex: 'name' },
    { title: '目前科室', dataIndex: 'depName' },
    { title: '是否有服药计划', dataIndex: 'plan' },
    { title: '是否调药', dataIndex: 'tiaoyao' },
    { title: '调药次数', dataIndex: 'tyCount' },
    { title: '上传血糖次数', dataIndex: 'bgCount' },
    { title: '最近血糖', dataIndex: 'bgVal' },
    { title: '上传血压/心率次数', dataIndex: 'bpCount' },
    { title: '最近血压', dataIndex: 'bpVal', render: (text) => {
      console.log('tex2323t', text);
      return <span>{text?.high}/{text?.low}</span>;
    } },
    { title: '最近心率', dataIndex: 'heartVal' },
  ];
  return (
    <div className="shadow p-15 mt-20 w-full">
      <div className="flex text-sm items-center">
        <img className="w-18 h-18" src={IconPatient} />
        <span className="text-base font-bold mr-60 ml-5">患者数据</span>
        <SelectDoctor
          doctorList={doctorList}
          handleSelect={(ids: string[]) => setdoctorSids(ids)}
        />
        <Button type="primary" className="ml-10" onClick={debounce(fetchData, 500)}>查询</Button>
      </div>
      {
        !isSearch ? (
          <div className="text-center pt-30 pb-20 text-sm text-gray-700">请选择医生进行查看</div>
        ) : (
          <>
            <div className="flex w-full">
              <ChartPatientPie id="medicinePlan" chartData={planChartData} chartTit="是否有服药计划" />
              <ChartPatientPie id="drugAdjustment" chartData={medicineChartData} chartTit="是否调药" />
            </div>
            <XzlTable
              request={window.$api.count.getPatientOperationData}
              depOptions={tableOptions}
              columns={PatientColumns}
              dataKey="patientList"
              tableOptions={{
                rowSelection: false,
              }}
            />
          </>
        )
      }
    </div>
  );
};

export default PatientData;
