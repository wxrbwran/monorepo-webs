import React, { FC, useState, useMemo, useEffect } from 'react';
import { Tabs, Form } from 'antd';
import XzlTable from 'xzl-web-shared/src/components/XzlTable';
import styles from './index.scss';
import { sendAt, Sender, Receiver, replyAt } from '@/utils/columns';
import { Search } from 'xzl-web-shared/src/components/Selects';
import { useForm } from 'antd/lib/form/Form';
import * as api from '@/services/api';
import { useSelector } from 'umi';
import { IState } from 'typings/global';
import { CrfScaleSourceType, ObjectiveSourceType, SubectiveScaleSourceType } from '../../pages/query/util';

const { TabPane } = Tabs;
interface IProps {
  source: 'crf' | 'objective' | 'subjective';
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
  const { source, scaleGroupId, ruleId, scaleId } = props;


  const apiRequest = {
    crf: api.research.fetchCrfRecord,
    objective: api.research.fetchObjectiveRecord,
    subjective: api.research.fetchSubjectiveRecord,
  };
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  const initActiveTab = '0';
  // const [activeTab, setactiveTab] = useState(initActiveTab);
  const eventSourceType = source === 'subjective' ? SubectiveScaleSourceType : (source === 'objective' ? ObjectiveSourceType : CrfScaleSourceType);
  const [tableOptions, settableOptions] = useState<ITableOptions>({ projectNsId, scaleGroupId, scaleId, status: Number(initActiveTab), eventSourceType: eventSourceType, ruleId });
  const [form] = useForm();
  const columns = [sendAt, Sender, Receiver];


  useEffect(() => {
    console.log('=================== res res 111111111');
    if (source !== 'objective' && !ruleId) { // 主观量表和crf量表才需要再获取ruleId
      api.subjective.getSubjectiveScaleDetail(scaleGroupId).then((res) => {

        settableOptions({
          ...tableOptions,
          ruleId: res?.ruleDoc?.id,
        });
      });
    }

  }, []);

  const handleTab = (key: string) => {
    // setactiveTab(key);
    settableOptions({
      ...tableOptions,
      status: Number(key),
    });
  };

  const handleSelectChange = (allValues: { receiver: string }) => {
    console.log('allValues', allValues);
    // settableOptions({ ...tableOptions });
    if (allValues.receiver) {
      settableOptions({
        ...tableOptions,
        receiver: allValues.receiver,
      });
    } else {
      const newParams = { ...tableOptions };
      delete newParams.receiver;
      settableOptions({
        ...newParams,
      });
    }
  };
  const renderTable = useMemo(() => () => {
    let col = [...columns];
    if (source === 'crf') {
      col = [sendAt, Receiver];
    }
    if (tableOptions.status === 2 && source !== 'objective') { col.push(replyAt); }

    return (
      tableOptions.ruleId ?
        (
          <div>
            <XzlTable
              request={apiRequest[source]}
              depOptions={tableOptions}
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
    );
  }, [tableOptions]);

  return (
    <div className={styles.send_record}>
      <Form form={form} onValuesChange={handleSelectChange}>
        <Search form={form} searchKey="receiver" placeholder="输入受试者姓名" />
      </Form>
      <Tabs defaultActiveKey={initActiveTab} onChange={handleTab} size="large">
        <TabPane tab="待发送" key="0" />
        {source !== 'objective' && <TabPane tab="已发送/已填写" key="2" />}
        <TabPane tab={source === 'objective' ? '已发送' : '已发送/未填写'} key="1" />
      </Tabs>
      {renderTable()}
    </div>
  );
};

export default TableSendRecord;
