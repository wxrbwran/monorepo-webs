import React, { useState, useEffect } from 'react';
import DragModal from '@/components/DragModal';
import debounce from 'lodash/debounce';
import SearchHospital from '@/components/SearchHospital';
import Calendar from '@/components/Calendar';
import dayjs from 'dayjs';
import {
  Form, Select, Spin, Button, Input, message,
} from 'antd';
import * as api from '@/services/api';
import styles from './index.scss';

interface Iprops {
  children: React.ReactElement;
  type: string;
  initData?: IdiagnosisItem | null;
  refreshList: () => void;
}
export interface IdiagnosisItem {
  name: string;
  diseaseId: string;
  id: string;
  attachedInfo: {
    diagnosisAt: number;
    hospitalName: string;
    hospitalId: string;
  }
}
interface Idisease {
  name: string;
  id: string;
}
interface IformValues {
  diagnose: {
    diseaseId: string;
    name: string;
  },
  diagnosisAt: number;
  hospital: {
    hospitalId: string;
    hospitalName: string;
  },
}
const { Option } = Select;
function AddDiagnose({
  children, type, initData, refreshList,
}: Iprops) {
  const [form] = Form.useForm();
  const { setFieldsValue } = form;
  const [isShowModal, setIsShowModa] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [diseaseList, setDiseaseList] = useState<Idisease[]>([]);
  const [initFormVal, setInitFormVal] = useState<IformValues>();
  const patientWcid = window.$storage.getItem('patientWcId');
  const sid = window.$storage.getItem('patientSid');
  const [pageAt, setPageAt] = useState(1);
  const [keyWord, setKeyWord] = useState<string>('');
  const fetchDisease = (val: string, pageAtNum?: number) => {
    setFetching(true);
    if (val.trim()) {
      const params = { name: val, pageAt: pageAtNum, pageSize: 50 };
      api.diagnosis.fetchDisease(params).then((res) => {
        if (res.diseaseInfos.length === 0 && pageAtNum === 1) {
          setFetching(false);
          message.warn('没有该诊断信息');
        }
        if (pageAtNum === 1) {
          setDiseaseList([...res.diseaseInfos]);
        } else {
          setDiseaseList([...diseaseList, ...res.diseaseInfos]);
        }
      });
    }
  };
  const handleSearch = (val: string) => {
    if (val.trim()) {
      setDiseaseList([]);
      setKeyWord(val);
      setPageAt(1);
      fetchDisease(val, 1);
    }
  };
  const handleSetFieldsVal = (key: string, val: any) => {
    if (key === 'diagnosisAt') {
      const dateArr = val.split('/');
      // if (!!dateArr[0] && !!dateArr[1]) {
      if (dateArr[0]) {
        setFieldsValue({
          [key]: val,
        });
      }
    } else {
      setFieldsValue({
        [key]: val,
      });
    }
  };
  const handlediagnose = (values: string, option: any) => {
    console.log(values);
    const trea = {
      diseaseId: option.value,
      name: option.title,
    };
    handleSetFieldsVal('diagnose', trea);
  };
  const handleSubmit = (values: IformValues) => {
    // patchDisease
    console.log(values);
    console.log('patientWcid', patientWcid);
    const { diagnose, hospital, diagnosisAt } = values;
    const params = {
      attachedInfo: {
        diagnosisAt: new Date(diagnosisAt).getTime(),
        ...hospital,
      },
      ...diagnose,
      wcId: patientWcid,
      sid,
      roleType: window.$storage.getItem('roleId'),
    };
    if (type === 'add') {
      api.diagnosis.addDisease(params).then(() => {
        message.success('添加成功');
        setIsShowModa(false);
        refreshList();
      });
    } else {
      params.id = (initData as IdiagnosisItem).id;
      api.diagnosis.patchDisease(params).then(() => {
        message.success('修改成功');
        setIsShowModa(false);
        refreshList();
      });
    }
  };
  const handleShowModal = () => {
    if (type === 'add') {
      setIsShowModa(true);
    } else {
      // 把接口数据转为form表单数据格式
      const { diseaseId, name, attachedInfo } = initData as IdiagnosisItem;
      const { diagnosisAt, hospitalId, hospitalName } = attachedInfo;
      setInitFormVal({
        diagnose: {
          diseaseId,
          name,
        },
        diagnosisAt,
        hospital: {
          hospitalId,
          hospitalName,
        },
      });
      setIsShowModa(true);
    }
  };
  // 回显时间
  let year: string | number = '';
  let month: string | number = '';
  let day: string | number = '';
  if (initFormVal?.diagnosisAt) {
    year = dayjs(initFormVal.diagnosisAt).format('YYYY');
    month = dayjs(initFormVal.diagnosisAt).format('MM');
    day = dayjs(initFormVal.diagnosisAt).format('DD');
  }
  useEffect(() => {
    if (!isShowModal) {
      form.resetFields();
    }
  }, [isShowModal]);
  const handleOptionScroll = (e) => {
    const { target } = e;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      // 在这里调用接口
      const nextPageAt = pageAt + 1;
      setPageAt(nextPageAt);
      fetchDisease(keyWord, nextPageAt);
    }
  };
  console.log('diseaseList11', diseaseList);
  return (
    <span>
      <span onClick={handleShowModal}>{children}</span>
      {
        isShowModal && (
          <DragModal
            wrapClassName="ant-modal-wrap-center"
            width="580px"
            visible={isShowModal}
            title={`${type === 'add' ? '添加' : '编辑'}诊断`}
            onCancel={() => setIsShowModa(false)}
            footer={null}
          >
            <div className={[styles.modify_wrap, styles.diagnose].join(' ')}>
              <Form
                name="diagnoseForm"
                initialValues={initFormVal}
                onFinish={handleSubmit}
                form={form}
              >
                <div className="form_item">
                  <Form.Item
                    label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;诊断"
                    name="diagnose"
                    rules={[{ required: true, message: '请输入项目名称!' }]}
                  >
                    <Input type="hidden" />
                  </Form.Item>
                  <Select
                    showSearch
                    placeholder="请输入诊断"
                    showArrow={false}
                    filterOption={false}
                    onSearch={debounce((value) => {
                      handleSearch(value);
                    }, 500)}
                    onChange={handlediagnose}
                    notFoundContent={fetching ? <Spin size="small" /> : null}
                    style={{ width: '376px' }}
                    defaultValue={initFormVal && initFormVal.diagnose.name}
                    onPopupScroll={handleOptionScroll}
                    virtual={false}
                  >
                    {diseaseList.map((dis) => (
                      <Option
                        key={dis.id}
                        value={dis.id}
                        title={dis.name}
                      >
                        {dis.name}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="form_item">
                  <Form.Item
                    label="诊断日期"
                    name="diagnosisAt"
                    // rules={[{ required: true, message: '请输入诊断日期!' }]}
                  >
                    <Input type="hidden" />
                  </Form.Item>
                  <Calendar
                    needInit={false}
                    year={year}
                    month={month}
                    day={day}
                    onChange={(dateString) => handleSetFieldsVal('diagnosisAt', dateString)}
                  />
                </div>
                <div className="form_item">
                  <Form.Item
                    label="诊断医院"
                    name="hospital"
                  >
                    <Input type="hidden" />
                  </Form.Item>
                  <SearchHospital
                    placeholder="请输入诊断医院"
                    callback={handleSetFieldsVal}
                    fieldName="hospital"
                    style={{ width: '376px' }}
                    defaultValue={initFormVal && initFormVal.hospital}
                  />
                </div>
                <Form.Item>
                  <div className="common__btn">
                    <Button
                      className={styles.submit}
                      onClick={() => setIsShowModa(false)}
                    >
                      取消
                    </Button>
                    <Button
                      className={styles.submit}
                      htmlType="submit"
                      type="primary"
                    >
                      {type === 'add' ? '添加' : '保存'}
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </DragModal>
        )
      }
    </span>
  );
}
AddDiagnose.defaultProps = {
  initData: null,
};
export default AddDiagnose;
