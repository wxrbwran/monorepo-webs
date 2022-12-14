// import React, { FC, useState, useMemo, useEffect } from 'react';
import React, { FC, useState, useEffect } from 'react';

import { Tabs, Form } from 'antd';
import XzlTable from 'xzl-web-shared/dist/components/XzlTable';
import styles from './index.scss';
import { sendAt, Sender, Receiver, replyAt } from '@/utils/columns';
import { Search } from 'xzl-web-shared/dist/components/Selects';
import { useForm } from 'antd/lib/form/Form';
import * as api from '@/services/api';
import { useSelector } from 'umi';
import { IState } from 'typings/global';
import { getRuleType } from '@/pages/subjective_table/util';

const { TabPane } = Tabs;
interface IProps {
  // source: 'crf' | 'objective' | 'subjective';
  scaleType: 'CRF' | 'SUBJECTIVE' | 'VISIT_CRF' | 'VISIT_SUBJECTIVE' | 'OBJECTIVE' | 'VISIT_OBJECTIVE';
  scaleGroupId?: string;  // 主观量表和crf量表会传
  ruleId?: string;  // 客观量表会传
  scaleId?: string;  // 客观量表会传
}
interface ITableOptions {
  projectNsId: string;
  scaleGroupId?: string;
  status: number;
  receiver?: string;
  ruleId: string;
  scaleId?: string;
  eventSourceType: string;
}
const TableSendRecord: FC<IProps> = (props) => {
  const { scaleType, scaleGroupId, ruleId, scaleId } = props;



  const apiRequest = {
    CRF: api.research.fetchCrfRecord,
    VISIT_CRF: api.research.fetchCrfRecord,

    OBJECTIVE: api.research.fetchObjectiveRecord,
    VISIT_OBJECTIVE: api.research.fetchObjectiveRecord,

    SUBJECTIVE: api.research.fetchSubjectiveRecord,
    VISIT_SUBJECTIVE: api.research.fetchSubjectiveRecord,
  };
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  const initActiveTab = '0';
  // const [activeTab, setactiveTab] = useState(initActiveTab);
  const eventSourceType = getRuleType(scaleType).sourceType;

  console.log('============== scaleType scaleType  TableSendRecord', scaleType, eventSourceType, scaleGroupId, ruleId);

  const [activeTab, setactiveTab] = useState(initActiveTab);

  // const [tableOptions, settableOptions] = useState<ITableOptions>({ projectNsId, scaleGroupId, scaleId, status: Number(initActiveTab), eventSourceType: eventSourceType, ruleId });
  const [tableOptions0, settableOptions0] = useState<ITableOptions>({ projectNsId, scaleGroupId, scaleId, status: Number(initActiveTab), eventSourceType: eventSourceType, ruleId });
  const [tableOptions1, settableOptions1] = useState<ITableOptions>({ projectNsId, scaleGroupId, scaleId, status: Number(initActiveTab), eventSourceType: eventSourceType, ruleId });
  const [tableOptions2, settableOptions2] = useState<ITableOptions>({ projectNsId, scaleGroupId, scaleId, status: 1, eventSourceType: eventSourceType, ruleId });


  const [form] = useForm();
  const columns = [sendAt, Sender, Receiver];


  useEffect(() => {
    console.log('=================== res res 111111111', scaleType, ruleId);
    // if (source !== 'objective' && !ruleId) { // 主观量表和crf量表才需要再获取ruleId

    if ((scaleType !== 'OBJECTIVE' && scaleType !== 'VISIT_OBJECTIVE') && !ruleId) { // 主观量表和crf量表才需要再获取ruleId

      api.subjective.getSubjectiveScaleDetail(scaleGroupId).then((res) => {
        settableOptions0({
          ...tableOptions0,
          ruleId: res?.ruleDoc?.meta?.docId,
          status: 0,
        });
        settableOptions1({
          ...tableOptions1,
          ruleId: res?.ruleDoc?.meta?.docId,
          status: 2,
        });
        settableOptions2({
          ...tableOptions2,
          ruleId: res?.ruleDoc?.meta?.docId,
          status: 1,
        });

      });
    }

  }, []);

  const handleTab = (key: string) => {

    setactiveTab(key);

    console.log(' handleTab key', key);


    // settableOptions({
    //   ...tableOptions,
    //   status: Number(key),
    // });
  };

  const handleSelectChange = (allValues: { receiver: string }) => {
    console.log(' handleSelectChange allValues', allValues);
    // settableOptions({ ...tableOptions });
    if (allValues.receiver) {

      // settableOptions({
      //   ...tableOptions,
      //   receiver: allValues.receiver,
      // });
      settableOptions0({
        ...tableOptions0,
        receiver: allValues.receiver,
      });
      settableOptions1({
        ...tableOptions1,
        receiver: allValues.receiver,
      });
      settableOptions2({
        ...tableOptions2,
        receiver: allValues.receiver,
      });
    } else {
      // const newParams = { ...tableOptions };
      // delete newParams.receiver;
      // settableOptions({
      //   ...newParams,
      // });
      const newParams0 = { ...tableOptions0 };
      delete newParams0.receiver;
      settableOptions0({
        ...newParams0,
      });

      const newParams1 = { ...tableOptions1 };
      delete newParams1.receiver;
      settableOptions1({
        ...newParams1,
      });

      const newParams2 = { ...tableOptions2 };
      delete newParams2.receiver;
      settableOptions2({
        ...newParams2,
      });
    }
  };
  // const renderTable = useMemo(() => () => {

  //   console.log(' renderTable useMemo', renderTable);
  //   let col = [...columns];
  //   if (source === 'crf') {
  //     col = [sendAt, Receiver];
  //   }
  //   if (tableOptions.status === 2 && source !== 'objective') { col.push(replyAt); }

  //   return (
  //     tableOptions.ruleId ?
  //       (
  //         <div>
  //           <XzlTable
  //             request={apiRequest[source]}
  //             depOptions={tableOptions}
  //             // noPagination={true}
  //             columns={col}
  //             dataKey="sendList"
  //             tableOptions={{
  //               rowSelection: false,
  //               // pagination: false,
  //             }}
  //           />
  //         </div>
  //       ) : <div></div>
  //   );
  // }, [tableOptions]);

  let col = [...columns];

  // if (source === 'crf') {
  if (scaleType === 'CRF' || scaleType == 'VISIT_CRF') {
    col = [sendAt, Receiver];
  }
  if (activeTab === '2' && (scaleType !== 'OBJECTIVE' && scaleType !== 'VISIT_OBJECTIVE')) { col.push(replyAt); }

  return (
    <div className={styles.send_record}>
      <Form form={form} onValuesChange={handleSelectChange}>
        <Search form={form} searchKey="receiver" placeholder="输入受试者姓名" />
      </Form>
      <Tabs defaultActiveKey={initActiveTab} onChange={handleTab} size="large">
        <TabPane tab="待发送" key="0">

          {
            tableOptions0.ruleId ?
              (
                <div>
                  <XzlTable
                    request={apiRequest[scaleType]}
                    depOptions={tableOptions0}
                    // noPagination={true}
                    columns={col}
                    dataKey="sendList"
                    tableOptions={{
                      rowSelection: false,
                      // pagination: false,
                    }}
                  />
                </div>
              ) : <div></div>
          }
        </TabPane>

        {(scaleType != 'OBJECTIVE' && scaleType != 'VISIT_OBJECTIVE') && <TabPane tab="已发送/已填写" key="2">
          {
            tableOptions1.ruleId ?
              (
                <div>
                  <XzlTable
                    request={apiRequest[scaleType]}
                    depOptions={tableOptions1}
                    // noPagination={true}
                    columns={col}
                    dataKey="sendList"
                    tableOptions={{
                      rowSelection: false,
                      // pagination: false,
                    }}
                  />
                </div>
              ) : <div></div>
          }
        </TabPane>}
        <TabPane tab={(scaleType == 'OBJECTIVE' || scaleType == 'VISIT_OBJECTIVE') ? '已发送' : '已发送/未填写'} key="1">
          {
            tableOptions2.ruleId ?
              (
                <div>
                  <XzlTable
                    request={apiRequest[scaleType]}
                    depOptions={tableOptions2}
                    // noPagination={true}
                    columns={col}
                    dataKey="sendList"
                    tableOptions={{
                      rowSelection: false,
                      // pagination: false,
                    }}
                  />
                </div>
              ) : <div></div>
          }
        </TabPane>
      </Tabs>
      {/* {renderTable()} */}
    </div>
  );
};

export default TableSendRecord;
