import React, { useState } from 'react';
import {
  Form, Input, Button, message,
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useParams } from 'umi';
import dayjs from 'dayjs';
import DragModal from '@/components/DragModal';
import Calendar from '@/components/Calendar';
import SearchHospital from '@/components/SearchHospital';
import * as api from '@/services/api';
import { getDateVal } from '@/utils/date';
import styles from '../TumourTreatItem/index.scss';

interface Ihospital {
  endTime: number;
  startTime: number;
  diagnosisAt: number;
  hospitalId: string;
  hospitalName: string;
}
interface Iprops {
  children: string;
  refresh: () => void;
  data: {
    category: string;
    treatmentDataList: {
      treatmentName: string;
      id: string;
      hospitalInfo: Ihospital
    }[]
  }
}
interface Itreatment {
  hospitalInfo: Ihospital,
  treatmentName: string;
}
const FormItem = Form.Item;
let uuid: number = 0;
function TumourEdit({ children, data, refresh }: Iprops) {
  const { category, treatmentDataList } = data;
  const [showModal, setShowModal] = useState(false);
  const [initialQueue, setInitialQueue] = useState<number[]>([0]);
  const [initFormVal, setInitFormVal] = useState<CommonData>({});
  const [form] = Form.useForm();
  const { setFieldsValue } = form;
  const { sid } = useParams<{ sid: string }>();
  const patientWcid = window.$storage.getItem('patientWcId');
  const handleSetFieldsVal = (key: string, val: any) => {
    setFieldsValue({
      [key]: val,
    });
  };
  const toggleShowModal = () => {
    setShowModal(!showModal);
  };
  const handleAdd = () => {
    uuid++;
    setInitialQueue([...initialQueue, uuid]);
  };
  const handleRemove = (index: number) => {
    if (initialQueue.length !== 1) {
      setInitialQueue([...initialQueue.filter((i) => i !== index)]);
    } else {
      console.log(888);
      // 当删除项为最后一条时，设置表单初始值为空的状态
      // 由于form.resetFields()只是让表单状态回到属性initialValues的状态
      // 所以先设置此属性为空，然后再resetFields
      setInitFormVal({
        startTime_0: null,
        treatmentName_0: null,
        hospital_0: {
          hospitalId: null,
          hospitalName: null,
        },
      });
      setTimeout(() => {
        form.resetFields();
      }, 500);
    }
  };
  const getTimestamp = (time: number | null | undefined) => {
    if (time) {
      return new Date(time).getTime();
    }
    return null;
  };
  const handleSubmit = (values: CommonData) => {
    console.log('values', values);
    const list: Itreatment[] = [];
    initialQueue.forEach((index) => {
      const name = values[`treatmentName_${index}`];
      if (name) {
        list.push({
          treatmentName: name,
          hospitalInfo: {
            ...values[`hospital_${index}`],
            startTime: getTimestamp(values[`startTime_${index}`]),
            endTime: getTimestamp(values[`endTime_${index}`]),
            diagnosisAt: getTimestamp(values[`diagnosisAt_${index}`]),
          },
        });
      }
    });
    const params = {
      sid,
      wcId: patientWcid,
      roleType: window.$storage.getItem('roleId'),
      treatmentInfo: {
        category,
        treatmentDataList: list,
      },
    };
    api.diagnosis.patchTreatment(params).then(() => {
      message.success('编辑成功');
      setShowModal(false);
      refresh();
    });
  };
  const getDate = (time: number | null | undefined) => {
    if (time) {
      return (
        dayjs(time).format('YYYY/MM/DD')
      );
    }
    return null;
  };
  const handleShowModal = () => {
    setShowModal(true);
    console.log('treatmentDataList', treatmentDataList);
    if (treatmentDataList.length > 0) {
      let initData: CommonData = {};
      const queueList: number[] = [];
      treatmentDataList.forEach((item, index) => {
        queueList.push(index);
        const { hospitalInfo, treatmentName } = item;
        const {
          endTime, startTime, diagnosisAt, hospitalName, hospitalId,
        } = hospitalInfo;
        initData = {
          ...initData,
          [`treatmentName_${index}`]: treatmentName,
          [`endTime_${index}`]: getDate(endTime),
          [`startTime_${index}`]: getDate(startTime),
          [`diagnosisAt_${index}`]: getDate(diagnosisAt),
          [`hospital_${index}`]: {
            hospitalName,
            hospitalId,
          },
        };
      });
      setInitialQueue(queueList);
      uuid = treatmentDataList.length - 1;
      console.log('initData', initData);
      setInitFormVal(initData);
      console.log('initialQueue', initialQueue);
    }
  };
  return (
    <span className={styles.edit_btn}>
      <span onClick={handleShowModal}>
        {children}
      </span>
      {
        showModal && (
          <DragModal
            wrapClassName="ant-modal-wrap-center"
            width="580px"
            visible={showModal}
            title="编辑处理"
            onCancel={toggleShowModal}
            footer={null}
          >
            <div className={styles.tumour_edit}>
              <Form
                name="tumour"
                initialValues={initFormVal}
                onFinish={handleSubmit}
                form={form}
                preserve={false}
              >
                {
                  initialQueue.map((index) => (
                    <div key={index}>
                      <FormItem
                        label="处理方式"
                        name={`treatmentName_${index}`}
                      >
                        <div className={styles.trea_wrap}>
                          <Input
                            className={styles.trea_input}
                            placeholder="请输入治疗方式"
                            defaultValue={initFormVal[`treatmentName_${index}`]}
                          />
                          <PlusOutlined onClick={handleAdd} />
                          <DeleteOutlined onClick={() => handleRemove(index)} />
                        </div>
                      </FormItem>

                      {
                        category === 'OTHER_TREATMENT'
                          ? (
                            <div className="form_item">
                              <FormItem
                                label="治疗时间"
                                name={`diagnosisAt_${index}`}
                              >
                                <Input type="hidden" />
                              </FormItem>
                              <Calendar
                                needInit={false}
                                year={getDateVal(initFormVal[`diagnosisAt_${index}`], 'year')}
                                month={getDateVal(initFormVal[`diagnosisAt_${index}`], 'month')}
                                day={getDateVal(initFormVal[`diagnosisAt_${index}`], 'day')}
                                onChange={(dateString) => handleSetFieldsVal(`diagnosisAt_${index}`, dateString)}
                              />
                            </div>
                          ) : (
                            <>
                              <div className="form_item">
                                <FormItem
                                  label="开始时间"
                                  name={`startTime_${index}`}
                                >
                                  <Input type="hidden" />
                                </FormItem>
                                <Calendar
                                  needInit={false}
                                  year={getDateVal(initFormVal[`startTime_${index}`], 'year')}
                                  month={getDateVal(initFormVal[`startTime_${index}`], 'month')}
                                  day={getDateVal(initFormVal[`startTime_${index}`], 'day')}
                                  onChange={(dateString) => handleSetFieldsVal(`startTime_${index}`, dateString)}
                                />
                              </div>
                              <div className="form_item">
                                <FormItem
                                  label="结束时间"
                                  name={`endTime_${index}`}
                                >
                                  <Input type="hidden" />
                                </FormItem>
                                <Calendar
                                  needInit={false}
                                  year={getDateVal(initFormVal[`endTime_${index}`], 'year')}
                                  month={getDateVal(initFormVal[`endTime_${index}`], 'month')}
                                  day={getDateVal(initFormVal[`endTime_${index}`], 'day')}
                                  onChange={(dateString) => handleSetFieldsVal(`endTime_${index}`, dateString)}
                                />
                              </div>
                            </>
                          )
                      }

                      <div className="form_item">
                        <FormItem
                          label="处理医院"
                          name={`hospital_${index}`}
                        >
                          <Input type="hidden" />
                        </FormItem>
                        <SearchHospital
                          placeholder="请输入处理医院"
                          callback={handleSetFieldsVal}
                          fieldName={`hospital_${index}`}
                          style={{ width: '376px' }}
                          defaultValue={initFormVal[`hospital_${index}`]}
                        />
                      </div>
                    </div>
                  ))
                }
                <Form.Item>
                  <div className="common__btn">
                    <Button className={styles.submit} onClick={toggleShowModal}>取消</Button>
                    <Button className={styles.submit} htmlType="submit" type="primary">保存</Button>
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

export default TumourEdit;
