import React, { FC, useState, useEffect } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { Form, Button, message } from 'antd';
import QueryItem from '../QueryItem';
import XzlTable from 'xzl-web-shared/dist/components/XzlTable';
import { CloseCircleFilled } from '@ant-design/icons';
import { handleSelection } from 'xzl-web-shared/dist/utils/conditions';
import styles from './index.scss';
import { defaultAvatar } from 'xzl-web-shared/dist/utils/consts';
import { cloneDeep, isEmpty, debounce } from 'lodash';
interface IProps {
  handleRefresh: () => void;
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
const AddTeamMember: FC<IProps> = (props) => {
  const { children, handleRefresh } = props;
  const [form] = Form.useForm();
  const { getFieldsValue } = form;
  const [showModal, setshowModal] = useState(false);
  const initTableOptions = { pageAt:1, pageSize: 5, conditions: [] };
  const [tableOptions, setOptions] = useState<ITableOptions>(initTableOptions);
  const [selectDoctor, setSelectDoctor] = useState<ISubject[][]>([]);
  const [pageAt, setPageAt] = useState(1);
  console.log(setSelectDoctor);
  const columns = [
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      width: 100,
      render: (text: string) => (
        <img
          src={text || defaultAvatar}
          style={{ width: 40, height: 40 }}
        />
      ),
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 147,
    },
    {
      title: '科室',
      dataIndex: 'practiceAreas',
      width: 147,
      render: (practiceAreas: { sub: { name: string } }[]) => {
        if (practiceAreas) {
          const department = [...new Set(practiceAreas.map(item => item?.sub?.name))];
          return department.map((item, inx) => <span>{item}{inx !== department.length - 1 ? '、' : ''}</span>);
        } else {
          return <span>--</span>;
        }
      },
    },
    {
      title: '角色',
      dataIndex: 'roleTags',
      width: 147,
      render: (roleTags: string[]) => {
        if (roleTags && roleTags.length > 0) {
          return roleTags.map((role, inx) => <span>{role}{inx !== roleTags.length - 1 ? '、' : ''}</span>);
        } else {
          return <span>--</span>;
        }
      },
    },
    {
      title: '线上医院和项目机构',
      dataIndex: 'orgs',
      width: 147,
      render: (orgs: { name: string }[]) => {
        if (orgs && orgs.length > 0) {
          return orgs.map((org, inx) => <span>{org.name}{inx !== orgs.length - 1 ? '、' : ''}</span>);
        } else {
          return <span>--</span>;
        }
      },
    },
    {
      title: '执业医院',
      dataIndex: 'practiceAreas',
      width: 147,
      render: (practiceAreas: { name: string }[]) => {
        if (practiceAreas) {
          return practiceAreas.map((item, inx) => <span>{item.name}{inx !== practiceAreas.length - 1 ? '、' : ''}</span>);
        } else {
          return <span>--</span>;
        }
      },
    },
  ];
  const handleShowModal = () => {
    setshowModal(true);
  };
  const handleSearch = () => {
    const newConditions = handleSelection(getFieldsValue());
    if (isEmpty(Object.values(getFieldsValue()).filter(val => !!val))) {
      message.warn('请输入查询项');
    }
    setOptions({
      ...tableOptions,
      pageAt: 1,
      conditions: [ ...newConditions ],
    });
  };
  const fetchData = (data: any) => {
    console.log('data~~~~', data);
  };

  const handleFetchPageAt = (num: number) => {
    setPageAt(num);
  };
  const handleDelDoctor = (pageInx: number, docSid: string) => {
    const newDoctors = selectDoctor[pageInx].filter(item => item.sid !== docSid );
    selectDoctor[pageInx] = newDoctors;
    setSelectDoctor(cloneDeep(selectDoctor));
  };
  const rowSelection = {
    selectedRowKeys: selectDoctor[pageAt - 1]?.map(item => item.sid) || [],
    onChange: (selectedRowKeys: string[], selectedRows: { sid: string }[]) => {
      console.log('selectedRows', selectedRows);
      console.log('selectedRowKeys', selectedRowKeys);
      const newSelectDoc = [...selectDoctor];
      newSelectDoc[pageAt - 1] = selectedRows;
      setSelectDoctor(newSelectDoc);
    },
    onSelect: (record: any, selected: boolean ) => {
      console.log('onselect', record, selected);
    },
    onSelectAll: (selected: boolean, selectedRows: { sid: string, wcId: string }[]) => {
      console.log('onSelectAll', selected, selectedRows);
    },
  };
  const handleSubmit = () => {
    // putDoctorFriends
    const members: { sid: string }[] = [];
    selectDoctor.forEach(pageDoctors => {
      pageDoctors.forEach(doctor => members.push({ sid: doctor.sid }));
    });
    const params = {
      members,
    };
    console.log('params', params);
    window.$api.service.putDoctorFriends(params).then(res => {
      console.log(4343, res);
      message.success('添加成功');
      handleRefresh();
      setshowModal(false);
      setOptions(initTableOptions);
      setPageAt(1);
    }).catch(err => {
      console.log('rerere', err);
      message.error(err?.result || '添加失败');
    });
  };
  useEffect(() => {
    if (!showModal) {
      setSelectDoctor([]);
    }
  }, [showModal]);

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
        destroyOnClose
      >
        <div className={styles.add_member}>
         <div className="flex">
           <div className={`text-gray-500 mr-25 ${styles.tit}`}>输入任意项查询</div>
          <Form form={form}>
            <QueryItem />
            <Button type="primary" onClick={handleSearch} className="ml-12">查询</Button>
          </Form>
         </div>
         {
           !isEmpty(Object.values(getFieldsValue()).filter(val => !!val)) && (
            <>
              <XzlTable
                columns={columns}
                dataKey="teams"
                handleCallback={fetchData}
                category="relatedDoctors"
                request={window.$api.service.fetchRelatedDoctors}
                depOptions={tableOptions}
                tableOptions={{
                  rowSelection,
                  handleFetchPageAt,
                }}
              />
              <div className="flex justify-between">
                <div className="flex">
                  <div className="mt-20" style={{ flex: '0 0 42px' }}>已选择</div>
                  <div className="flex flex-wrap">
                    {
                      selectDoctor.map((pageDoctor, pageInx) => {
                        return pageDoctor?.map((doctor) => {
                          return (
                            <div className={styles.check_doctor}>
                              <CloseCircleFilled onClick={() => handleDelDoctor(pageInx, doctor.sid)} />
                              <img className="w-40 h-40 rounded-md mb-5" src={doctor.avatarUrl || defaultAvatar} alt="" />
                              <div>{doctor.name}</div>
                            </div>
                          );
                        });
                      })
                    }
                  </div>
                </div>
                <Button type="primary" onClick={debounce(handleSubmit, 500)} className="mt-40" disabled={!!isEmpty(selectDoctor.flat())}>确认添加</Button>
              </div>
            </>
           )
         }
        </div>
      </DragModal>
    </div>
  );
};

export default AddTeamMember;
