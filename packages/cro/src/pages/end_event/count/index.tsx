import React, { useState } from 'react';
import { Form } from 'antd';
import { isEmpty } from 'lodash';
import Event from '../components/event';
import Researcher from '../components/researcher';
import XzlTable from 'xzl-web-shared/dist/components/XzlTable';
import { endEventColumns } from '@/utils/columns';
import styles from './index.scss';

function Count() {
  const [form] = Form.useForm();
  const projectSid =  window.$storage.getItem('projectSid');
  const [tableOptions, setOptions] = useState({ projectSid });

  const handleSelectChange = (_: string[], allValues: any) => {
    console.log('allValues', allValues);
    // 过滤其中一个为'全部'的情况，删除该项
    Object.keys(allValues).forEach(item=>{
      if (!allValues[item])  delete allValues[item];
    });
    // 两个都为全部的情况
    if (isEmpty(allValues)){
      setOptions({ projectSid });
    } else {
      setOptions({ ...tableOptions, ...allValues });
    }
  };
  const legendArr = [
    {
      text: '主要终点事件',
      class: 'MAIN',
    }, {
      text: '严重不良反应事件',
      class: 'SICK',
    }, {
      text: '次要终点事件',
      class: 'MINOR',
    }, {
      text: '不良事件',
      class: 'BAD',
    },
  ];

  return (
    <div className={styles.count}>
      <div className={styles.top}>
        <div className={styles.selects}>
          筛选：
            <Form form={form} onValuesChange={handleSelectChange}>
              <Event />
              <Researcher />
            </Form>
        </div>
        <div className={styles.legend}>
          {
            legendArr.map(item => (
              <div className={styles.item}>
                <span className={`${styles[item.class]} ${styles.label}`}></span>
                <span> ：{item.text}</span>
              </div>
            ))
          }
        </div>
      </div>
      <div style={{ marginTop: 8 }}>
        <XzlTable
          // request={() => {}}
          request={window.$api.event.fetchEventCountInfo}
          depOptions={tableOptions}
          // noPagination={true}
          columns={endEventColumns()}
          dataKey="events"
          tableOptions={{
            rowSelection: false,
            // pagination: false,
          }}
        />
      </div>
    </div>
  );
}
export default Count;
