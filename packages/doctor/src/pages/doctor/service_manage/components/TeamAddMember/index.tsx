import React, { FC, useState } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import { Form, Button } from 'antd';
import QueryItem from '../QueryItem';
import XzlTable from 'xzl-web-shared/src/components/XzlTable';
import { clAvatar, clName, roleCol } from 'xzl-web-shared/src/utils/columns';
import { CloseCircleFilled } from '@ant-design/icons';
import { handleSelection } from 'xzl-web-shared/src/utils/conditions';
import styles from './index.scss';
interface IProps {

}
interface ITableOptions {
  pageAt: number;
  pageSize: number;
  conditions: CommonData[]
}
export const workload = {
  title: '工作量统计',
  dataIndex: 'workload',
};
const TeamAddMember: FC<IProps> = (props) => {
  const { children } = props;
  const [form] = Form.useForm();
  const { getFieldsValue } = form;
  const [showModal, setshowModal] = useState(false);
  const [tableOptions, setOptions] = useState<ITableOptions>({ pageAt:1, pageSize: 5, conditions: [] });
  const [selectDoctor, setSelectDoctor] = useState([]);
  console.log(setSelectDoctor);
  const columns = [
    clAvatar, clName,
    {
      title: '科室',
      dataIndex: 'departmentName',
    }
    , roleCol,
    {
      title: '互联网医院',
      dataIndex: 'firstProfessionCompany',
    },
    {
      title: '执业医院',
      dataIndex: 'practiceAreas',
    },
  ];
  const handleShowModal = () => {
    setshowModal(true);
  };
  // const conditions = {
  //   'name': "sj.details->>'name'",
  //   'tel': "sj.details->>'tel'",
  //   'role_tag': 'role_tag',
  //   'practice_areas': "practice_areas->>'name'",
  //   'organization': 'cr.namespace',
  //   'department': "sj.details->>'department'",
  // };
  const handleSearch = () => {
    const newConditions = handleSelection(getFieldsValue());
    setOptions({
      ...tableOptions,
      pageAt: 1,
      conditions: [ ...newConditions ],
    });
  };
  const fetchData = (data: any) => {
    console.log('data~~~~', data);
  };
  // const handleCheckPatient = (a, b, c) => {
  //   console.log(a, b, c);
  // };
  const rowSelection = {
    selectedRowKeys: selectDoctor,
    onChange: (selectedRowKeys: never[], selectedRows: { sid: string }[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      // setSelectDoctor(selectedRows);
    },
    onSelect: (record: any, selected: boolean ) => {
      console.log('onselect', record, selected);
      // handleCheckPatient(selected, [record.sid], [record.wcId]);
    },
    onSelectAll: (selected: boolean, selectedRows: { sid: string, wcId: string }[]) => {
      console.log('onSelectAll', selected, selectedRows);
      // const sids: string[] = [];
      // const wcIds: string[] = [];
      // selectedRows.forEach(item => {
      //   sids.push(item.sid);
      //   wcIds.push(item.wcId);
      // });
      // handleCheckPatient(selected, sids, wcIds);
    },
  };
  return (
    <div>
      <div onClick={handleShowModal}>{children}</div>
      <DragModal
        wrapClassName="ant-modal-wrap-center cancel_text_blue"
        width={1000}
        maskClosable
        visible={showModal}
        onCancel={() => setshowModal(false)}
        title="添加新成员"
        footer={null}
      >
        <div className={styles.add_member}>
         <div className="flex">
           <div className={`text-gray-500 mr-25 ${styles.tit}`}>输入任意项查询</div>
          <Form form={form}>
            <QueryItem />
            <Button type="primary" onClick={handleSearch} className="ml-12">查询</Button>
          </Form>
         </div>
         <XzlTable
            columns={columns}
            dataKey="teams"
            handleCallback={fetchData}
            category="relatedDoctors"
            request={window.$api.service.fetchRelatedDoctors}
            depOptions={tableOptions}
            tableOptions={{
              rowSelection,
              // pagination: false,
            }}
          />
          <div className="flex justify-between">
            <div className="flex">
              <div className="mt-20" style={{ flex: '0 0 42px' }}>已选择</div>
              <div className="flex flex-wrap">
                <div className={styles.check_doctor}>
                  <CloseCircleFilled />
                  <img className="w-40 h-40 rounded-md mb-5" src="https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/617e9123-24e9-40b3-be2a-8c9aa13ad65d海啊.jpg" alt="医生头像" />
                  <div>张三三</div>
                </div>
                <div className={styles.check_doctor}>
                  <CloseCircleFilled />
                  <img className="w-40 h-40 rounded-md mb-5" src="https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/617e9123-24e9-40b3-be2a-8c9aa13ad65d海啊.jpg" alt="医生头像" />
                  <div>张三三</div>
                </div>
                <div className={styles.check_doctor}>
                  <CloseCircleFilled />
                  <img className="w-40 h-40 rounded-md mb-5" src="https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/617e9123-24e9-40b3-be2a-8c9aa13ad65d海啊.jpg" alt="医生头像" />
                  <div>张三三</div>
                </div>
                <div className={styles.check_doctor}>
                  <CloseCircleFilled />
                  <img className="w-40 h-40 rounded-md mb-5" src="https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/617e9123-24e9-40b3-be2a-8c9aa13ad65d海啊.jpg" alt="医生头像" />
                  <div>张三三</div>
                </div>
                <div className={styles.check_doctor}>
                  <CloseCircleFilled />
                  <img className="w-40 h-40 rounded-md mb-5" src="https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/617e9123-24e9-40b3-be2a-8c9aa13ad65d海啊.jpg" alt="医生头像" />
                  <div>张三三</div>
                </div>
                <div className={styles.check_doctor}>
                  <CloseCircleFilled />
                  <img className="w-40 h-40 rounded-md mb-5" src="https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/617e9123-24e9-40b3-be2a-8c9aa13ad65d海啊.jpg" alt="医生头像" />
                  <div>张三三</div>
                </div>
                <div className={styles.check_doctor}>
                  <CloseCircleFilled />
                  <img className="w-40 h-40 rounded-md mb-5" src="https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/617e9123-24e9-40b3-be2a-8c9aa13ad65d海啊.jpg" alt="医生头像" />
                  <div>张三三</div>
                </div>
                <div className={styles.check_doctor}>
                  <CloseCircleFilled />
                  <img className="w-40 h-40 rounded-md mb-5" src="https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/617e9123-24e9-40b3-be2a-8c9aa13ad65d海啊.jpg" alt="医生头像" />
                  <div>张三三</div>
                </div>
                <div className={styles.check_doctor}>
                  <CloseCircleFilled />
                  <img className="w-40 h-40 rounded-md mb-5" src="https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/617e9123-24e9-40b3-be2a-8c9aa13ad65d海啊.jpg" alt="医生头像" />
                  <div>张三三</div>
                </div>
                <div className={styles.check_doctor}>
                  <CloseCircleFilled />
                  <img className="w-40 h-40 rounded-md mb-5" src="https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/617e9123-24e9-40b3-be2a-8c9aa13ad65d海啊.jpg" alt="医生头像" />
                  <div>张三三</div>
                </div>
              </div>
            </div>
            <Button type="primary" onClick={handleSearch} className="mt-40">确认添加</Button>
          </div>
        </div>
      </DragModal>
    </div>
  );
};

export default TeamAddMember;
