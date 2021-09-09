import React, { FC, useState, useMemo } from 'react';
import { Tabs, Form } from 'antd';
import XzlTable from '@/components/XzlTable';
import styles from './index.scss';
import { sendAt, Sender, Receiver, replyAt } from '@/utils/columns';
import Search from '@/components/Selects/Search';
import { useForm } from 'antd/lib/form/Form';
import * as api from '@/services/api';
import { useSelector } from 'umi';
import { IState } from 'typings/global';

const { TabPane } = Tabs;
interface IProps {
  source: 'crf' | 'objective' | 'subjective';
  scaleGroupId: string;
}
interface ITableOptions {
  projectNsId: string;
  scaleGroupId: string;
  status: number;
  receiver?: string;
}
const TableSendRecord: FC<IProps> = (props) => {
  const { source, scaleGroupId } = props;

  const apiRequest = {
    crf: api.research.fetchCrfRecord,
    objective: api.research.fetchObjectiveRecord,
    subjective: api.research.fetchSubjectiveRecord
  }
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail)
  const initActiveTab = '3';
  const [activeTab, setactiveTab] = useState(initActiveTab)
  const [tableOptions, settableOptions] = useState<ITableOptions>({projectNsId, scaleGroupId, status: Number(initActiveTab)})
  const [form] = useForm();
  const columns = [sendAt, Sender, Receiver];
  const handleTab = (key: string) => {
    setactiveTab(key);
    settableOptions({
      ...tableOptions,
      status: Number(key)
    })
  }
  const handleSelectChange = (changedValues: string[], allValues: {receiver: string}) => {
    console.log('allValues', allValues)
    // settableOptions({ ...tableOptions });
    if (allValues.receiver) {
      settableOptions({
        ...tableOptions,
        receiver: allValues.receiver,
      })
    } else {
      const newParams = {...tableOptions};
      delete newParams.receiver;
      settableOptions({
        ...newParams
      })
    }
  };
  const renderTable = useMemo(() => () => {
    const col = [...columns];
    if (tableOptions.status === 2 && source !== 'objective') { col.push(replyAt)}
    return (
      <div>
        <XzlTable
          request={apiRequest[source]}
          depOptions={tableOptions}
          // noPagination={true}
          columns={col}
          dataKey="sendRecordList"
          tableOptions={{
            rowSelection: false,
            // pagination: false,
          }}
        />
      </div>
    )
  }, [tableOptions]);

  return (
    <div className={styles.send_record}>
      <Form form={form} onValuesChange={handleSelectChange}>
        <Search form={form} searchKey="receiver" placeholder="输入受试者姓名"  />
      </Form>
      <Tabs defaultActiveKey={initActiveTab} onChange={handleTab} size="large">
        <TabPane tab="待发送" key="3" />
        { source !== 'objective' && <TabPane tab="已发送/已填写" key="2" /> }
        <TabPane tab={source === 'objective' ? '已发送' : '已发送/未填写'} key="1" />
      </Tabs>
      {renderTable()}
    </div>
  );
};

export default TableSendRecord;
