import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import DragModal from '@/components/DragModal';
import config from '@/config';
import {
  Table, Button, message,
} from 'antd';
import {
  clAvatar, clName, clTitle, clDepartment,
} from '@/utils/columns';
import { getCondition } from '@/utils/utils';
import { pageRender } from '@/utils/pager';
import Title from '../../components/Selects/Title';
import Search from '../../components/Selects/Search';
import Organization from '../../components/Selects/Organization';
import styles from './index.scss';

interface IPager {
  pageSize: number;
  current?: number;
  total?: number;
  pageAt: number;
}
interface Idoctor {
  name: string;
  title: string;
  departmentName: string;
  goodsDescriptions: number;
  doctorId: string;
}
interface IProps {
  activeType: string;
  getDoctors: Function;
  orgNsId: string;
}
function DoctorList({ activeType, getDoctors, orgNsId }: IProps) {
  // const paramsInit = {
  //   keyword: '',
  //   title: null,
  //   minPrice: null,
  //   maxPrice: null,
  // };
  const initPagination: IPager = {
    pageSize: config.DOCTOR_PATIENT_SIZE,
    pageAt: 1,
    total: 0,
  };
  const [isShowList, setIsShowList] = useState(false);
  // const [params, setParams] = useState<CommonData>(paramsInit);
  const [pagination, setPagination] = useState<IPager>(initPagination);
  const [selectDoctor, setSelectDoctor] = useState <Idoctor[]>([]);
  const [doctors, setDoctors] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [selectParams, setSelectParams] = useState<ISelectItem[]>(new Array(3));

  const handleToggleList = () => {
    setIsShowList(!isShowList);
  };

  const fetchPatients = (params?: any) => {
    setLoading(true);
    const conditions = selectParams.filter((item) => !!item); // 过滤掉占位空值
    const apiParams: CommonData = {
      pageAt: 1,
      pageSize: pagination.pageSize,
      conditions,
      ...params,
    };
    apiParams.pageAt = Number(apiParams.pageAt);
    window.$api.doctor.getOrgDoctors(apiParams).then((res: any) => {
      const doctorList: ISubject[] = [];
      res.teams.forEach((item: { members: ISubject[]; teamNSId: any; }) => {
        item.members.forEach((member:ISubject) => {
          doctorList.push({
            ...member,
            nsId: item.teamNSId,
          });
        });
      });
      setDoctors(doctorList);
      setPagination({
        ...pagination,
        pageAt: apiParams.pageAt,
        total: res.total,
      });
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  };
  useEffect(() => {
    if (isShowList) {
      fetchPatients({
        pageAt: 1,
        conditions: [getCondition('cr.namespace', orgNsId)],
      });
      setSelectParams([getCondition('cr.namespace', orgNsId)]);
    } else {
      setSelectDoctor([]);
      setSelectParams(new Array(3));
    }
  }, [isShowList]);
  const columns = [clAvatar, clName, clTitle, clDepartment];
  const changeSelect = (value: ISelectItem, index: number) => {
    const newSelectArr = [...selectParams];
    newSelectArr[index] = value;
    setSelectParams((params) => {
      // eslint-disable-next-line no-param-reassign
      params[index] = value;
      return params;
    });

    const params = newSelectArr.filter((item) => !!item);
    fetchPatients({ conditions: params });
  };
  const deleteSelect = (index: number) => {
    const newSelectArr = [...selectParams];
    delete newSelectArr[index];
    setSelectParams((params) => {
      // eslint-disable-next-line no-param-reassign
      delete params[index];
      return params;
    });

    const params = newSelectArr.filter((item) => !!item);
    fetchPatients({ conditions: params });
  };
  const tablePaginationClick = (pager: IPager) => {
    pagination.pageAt = pager.current as number;
    setPagination({ ...pagination });
    fetchPatients({ pageAt: pager.current as number });
  };
  const rowSelection = {
    onChange: (selectedRowKeys: string[], selectedRows: Idoctor[]) => {
      setSelectDoctor(selectedRows);
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: Idoctor) => ({
      name: record.name,
    }),
  };
  const addDoctor = () => {
    const params = selectDoctor.map((item) => ({
      role: activeType,
      sid: item.sid,
    }));
    window.$api.doctor.addDoctors({
      members: [...params],
      teamNSId: orgNsId,
    }).then(() => {
      message.success('添加成功');
      setIsShowList(!isShowList);
      getDoctors();
    }).catch(() => {
      setLoading(false);
    });
  };
  const propsVal = {
    changeSelect,
    deleteSelect,
  };
  return (

    <>
      <div className={[styles.card, styles.add_card].join(' ')} onClick={handleToggleList}>
        <PlusOutlined />
      </div>
      {
        isShowList && (
          <DragModal
            wrapClassName="ant-modal-wrap-center"
            footer={null}
            width={1100}
            maskClosable
            visible={isShowList}
            onCancel={handleToggleList}
            title=" "
          >
            <div className={styles.doctor_list}>
              <div>已选择</div>
              <ul>
                {
                  selectDoctor.map((item: Idoctor) => (
                    <li className={styles.checked_doctor}>
                      <img src={config.defaultAvatar} alt="医生头像" />
                      <span>{item.name}</span>
                    </li>
                  ))
                }
              </ul>
              <div className={styles.params}>
                <div>
                  所有医院：
                  <Organization {...propsVal} index={0} orgNsId={orgNsId} />
                </div>
                <div>
                  <Search {...propsVal} index={1} />
                </div>
              </div>
              <div className={styles.params2}>
                <div className="choose__role--filter">
                  职称：
                  <Title {...propsVal} index={2} />
                </div>
              </div>
              <div className={styles.table}>
                <Table
                  dataSource={doctors}
                  columns={columns}
                  pagination={pageRender(pagination)}
                  onChange={tablePaginationClick}
                  rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                  }}
                  rowKey={(record: { wcId: string }) => record.wcId}
                  loading={loading}
                />
              </div>
              <div className={styles.add}>
                <Button onClick={addDoctor}>确认添加</Button>
              </div>
            </div>
          </DragModal>
        )
      }
    </>
  );
}

export default DoctorList;
