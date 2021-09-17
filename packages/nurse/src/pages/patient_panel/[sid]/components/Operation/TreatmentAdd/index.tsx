import React, { useState, useEffect } from 'react';
import {
  Form, Select, Button, Input, message,
} from 'antd';
import debounce from 'lodash/debounce';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import SearchHospital from '@/components/SearchHospital';
import Calendar from '@/components/Calendar';
import * as api from '@/services/api';
import { getDateVal } from '@/utils/date';
import PlaceItem from '../PlaceItem';
import styles from '../DiagnoseAdd/index.scss';

export interface ItreatmentDataItem {
  hospitalInfo: Ihospital,
  id: string;
  stentInfos: {
    hospitalInfo: Ihospital,
    location: string;
    stentDataList: {
      stentId: string;
      stentName: string;
      stentSize: string;
    }[]
  }[];
  treatmentId: string;
  treatmentName: string;
}
export interface Ihospital {
  diagnosisAt: number;
  hospitalId: string;
  hospitalName: string;
}
interface Iprops {
  children: React.ReactElement;
  type: string;
  refresh: () => void;
  initData?: ItreatmentDataItem;
}
interface Idisease {
  name: string;
  id: string;
  type: number
}
interface IformVal {
  treatment: object;
  hospital: Ihospital
  diagnosisAt: string;
}
const { Option } = Select;
let uuid: number = 0;

function AddTreatment({
  children, type, refresh, initData,
}: Iprops) {
  const [form] = Form.useForm();
  const { setFieldsValue } = form;
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [treaType, setTreaType] = useState<number>(0); // 治疗方式类型，支架为1，普通为0
  const [initialQueue, setInitialQueue] = useState<number[]>([0]); // 冠状动脉，支架位置列表
  const [initialStentQueue, setInitialStentQueue] = useState<number[][]>([]); // 支架名称与尺寸初始队列
  const [treatmentList, setTreatmentList] = useState<Idisease[]>([]); // 处理方式搜索列表
  const [initFormVal, setInitFormVal] = useState<CommonData>({});
  const [pageAt, setPageAt] = useState(1);
  const [keyWord, setKeyWord] = useState<string>('');
  const sid = window.$storage.getItem('patientSid');
  const patientWcid = window.$storage.getItem('patientWcId');
  useEffect(() => {
    if (initialQueue) {
      uuid = initialQueue.length;
    }
  }, [initialQueue]);
  const fetchData = (val: string, pageAtNum: number) => {
    if (val.trim()) {
      const params = { name: val, pageAt: pageAtNum, pageSize: 50 };
      api.diagnosis.fetchTreatment(params).then((res) => {
        const data = res.treatments;
        if (pageAtNum === 1) {
          setTreatmentList(data);
        } else {
          setTreatmentList([...treatmentList, ...data]);
        }
        if (data.length === 0 && pageAtNum === 1) { message.warn('没有治疗方式信息'); }
      });
    }
  };
  const handleSearch = (val: string) => {
    if (val) {
      setTreatmentList([]);
      setKeyWord(val);
      setPageAt(1);
      fetchData(val, 1);
    }
  };
  const handleOptionScroll = (e) => {
    const { target } = e;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      // 在这里调用接口
      const nextPageAt = pageAt + 1;
      setPageAt(nextPageAt);
      fetchData(keyWord, nextPageAt);
    }
  };
  // 冠状动脉支架数据整合
  const getStentList = (data: CommonData, index: number) => {
    const stentDataList: object[] = []; // 支架列表 必填
    // 确定支架列表长度，然后遍历取值
    const sentList = Object.keys(data).filter((itemKey: string) => itemKey.startsWith(`stent_${index}`));
    // console.log('____sentList', sentList);
    // console.log('_____data', data);
    sentList.forEach((sentKey: string) => {
      // console.log(sentKey);
      const subInx = sentKey.substr(sentKey.length - 1, 1); // 支架尺寸索引
      stentDataList.push({
        ...data[`stent_${index}_${subInx}`], // 支架名称 、id
        stentSize: data[`stentSize_${index}_${subInx}`], // 支架尺寸
      });
    });
    // console.log('stentDataList', stentDataList);
    return stentDataList;
  };
  // 冠状动脉支架数据整合
  const coronaryStent = (data: CommonData) => {
    const stentInfos:object[] = [];
    initialQueue.forEach((index) => {
      const item: CommonData = {
        location: data[`location_${index}`],
        hospitalInfo: {
          ...data[`hospital_${index}`],
          diagnosisAt: new Date(data[`diagnosisAt_${index}`]).getTime(),
        },
        stentDataList: getStentList(data, index),
      };
      stentInfos.push(item);
    });
    // console.log('stentInfos', stentInfos);
    return stentInfos;
  };
  const resetStatus = () => {
    setTreaType(0);
    setIsShowModal(false);
    refresh();
    setInitFormVal({});
    form.resetFields(); // modal销毁的不彻底，表单的值都还存在，这里需要重置一下。
  };
  const handleSubmit = (values: IformVal) => {
    // console.log('values', values);
    const params: CommonData = {
      wcId: patientWcid,
      sid,
      roleType: window.$storage.getItem('roleId'),
      treatmentInfo: {
        category: 'DIAGNOSIS_TREATMENT',
        treatmentDataList: [
          {
            ...values.treatment,
            hospitalInfo: treaType === 0 ? {
              ...values.hospital,
              diagnosisAt: new Date(values.diagnosisAt).getTime(),
            } : {},
            stentInfos: treaType === 1 ? coronaryStent(values) : [],
          },
        ],
      },
    };
    if (type === 'add') {
      api.diagnosis.addTreatment(params).then(() => {
        message.success('添加成功');
        resetStatus();
      });
    } else {
      params.treatmentInfo.treatmentDataList[0].id = (initData as ItreatmentDataItem).id;
      api.diagnosis.patchTreatment(params).then(() => {
        message.success('修改成功');
        resetStatus();
      });
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
  const handleSelect = (values: string, option: any) => {
    console.log(values);
    const trea = {
      treatmentId: option.value,
      treatmentName: option.title,
    };
    setTreaType(option.type);
    handleSetFieldsVal('treatment', trea);
  };
  const add = () => {
    uuid++;
    setInitialQueue([...initialQueue, uuid]);
  };
  const remove = (index: number) => {
    if (initialQueue.length !== 1) {
      setInitialQueue([...initialQueue.filter((i) => i !== index)]);
    }
  };
  // 普通类型数据回显，设置form初始值
  const initDataFormat = () => {
    let initDataVal: CommonData = {};
    const { hospitalInfo, treatmentName, treatmentId } = initData as ItreatmentDataItem;
    const { diagnosisAt, hospitalName, hospitalId } = hospitalInfo;
    initDataVal = {
      diagnosisAt,
      hospital: {
        hospitalName,
        hospitalId,
      },
      treatment: {
        treatmentName,
        treatmentId,
      },
    };
    setInitFormVal(initDataVal);
    // console.log('**********', initDataVal);
  };
  // 冠状动脉支架类型数据回显，设置form初始值
  const initDataFormatStent = () => {
    const queueList: number[] = [];
    const { treatmentName, treatmentId, stentInfos } = initData as ItreatmentDataItem;
    let initDataStent: CommonData = {
      treatment: {
        treatmentName,
        treatmentId,
      },
    };
    const stentQueue:number[][] = [];
    // 多支架位置
    stentInfos.forEach((item, index) => {
      // console.log('item1111', item);
      queueList.push(index);
      const { hospitalInfo, location, stentDataList } = item;
      const { diagnosisAt, hospitalName, hospitalId } = hospitalInfo;
      initDataStent = {
        ...initDataStent,
        [`diagnosisAt_${index}`]: diagnosisAt,
        [`hospital_${index}`]: {
          hospitalName,
          hospitalId,
        },
        [`location_${index}`]: location,
      };
      const curStentQueue: number[] = []; // 当前支架位置-》几个（支架类型和尺寸）
      stentDataList.forEach(((stent, stentIndex) => {
        curStentQueue.push(stentIndex);
        const { stentId, stentName, stentSize } = stent;
        initDataStent = {
          ...initDataStent,
          [`stentSize_${index}_${stentIndex}`]: stentSize,
          [`stent_${index}_${stentIndex}`]: {
            stentId,
            stentName,
          },
        };
      }));
      stentQueue.push(curStentQueue);
    });
    setInitialStentQueue([...stentQueue]);
    // console.log(9999993, [...stentQueue]);
    // console.log('**********支架', initDataStent);
    setInitFormVal(initDataStent);
    setInitialQueue(queueList);
  };
  const handleShowModal = () => {
    setIsShowModal(true);
    // console.log(332323, initData);
    if (initData) {
      if (initData.stentInfos.length === 0) {
        setTreaType(0); // 非支架类型
        initDataFormat();
      } else {
        setTreaType(1); // 支架类型
        initDataFormatStent();
      }
    }
  };
  const {
    treatment, hospital, diagnosisAt,
  } = initFormVal;
  return (
    <span>
      <span onClick={handleShowModal}>{children}</span>
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        width="580px"
        visible={isShowModal}
        title={`${type === 'add' ? '添加' : '编辑'}治疗`}
        onCancel={() => setIsShowModal(false)}
        footer={null}
        destroyOnClose
      >
        <div className={[styles.modify_wrap, styles.treatment].join(' ')}>
          <Form
            name="treatment"
            onFinish={handleSubmit}
            initialValues={initFormVal}
            form={form}
          >
            <div className="form_item">
              <Form.Item
                label="治疗方式"
                name="treatment"
                rules={[{ required: true, message: '请输入治疗方式!' }]}
              >
                <Input type="hidden" />
              </Form.Item>
              <Select
                showSearch
                placeholder="请输入治疗方式"
                showArrow={false}
                filterOption={false}
                onSearch={debounce((value) => {
                  handleSearch(value);
                }, 500)}
                notFoundContent={null}
                onChange={handleSelect}
                style={{ width: '376px' }}
                defaultValue={treatment && treatment.treatmentName}
                onPopupScroll={handleOptionScroll}
                virtual={false}
              >
                {treatmentList.map((dis) => (
                  <Option
                    key={dis.id}
                    value={dis.id}
                    title={dis.name}
                    type={dis.type}
                  >
                    {dis.name}
                  </Option>
                ))}
              </Select>
            </div>
            {/* 冠状动脉支架 */}
            {
                  treaType === 1
                    ? (
                      initialQueue.map((item, index) => (
                        <PlaceItem
                          parent={item}
                          setFieldsValue={setFieldsValue}
                          add={add}
                          remove={remove}
                          key={item}
                          initData={initFormVal}
                          initQueue={initialStentQueue[index]}
                        />
                      ))
                    )
                    : (
                      <>
                        <div className="form_item">
                          <Form.Item
                            label="治疗日期"
                            name="diagnosisAt"
                          >
                            <Input type="hidden" />
                          </Form.Item>
                          <Calendar
                            needInit={false}
                            // value={diagnosisAt}
                            year={getDateVal(diagnosisAt, 'year')}
                            month={getDateVal(diagnosisAt, 'month')}
                            day={getDateVal(diagnosisAt, 'day')}
                            onChange={(dateString) => handleSetFieldsVal('diagnosisAt', dateString)}
                          />
                        </div>
                        <div className="form_item">
                          <Form.Item
                            label="治疗医院"
                            name="hospital"
                          >
                            <Input type="hidden" />
                          </Form.Item>
                          <SearchHospital
                            placeholder="请输入治疗医院"
                            callback={handleSetFieldsVal}
                            fieldName="hospital"
                            style={{ width: '376px' }}
                            defaultValue={hospital}
                          />
                        </div>
                      </>
                    )
                }
            <Form.Item>
              <div className="common__btn">
                <Button
                  className={styles.submit}
                  onClick={() => setIsShowModal(false)}
                >
                  取消
                </Button>
                <Button className={styles.submit} htmlType="submit" type="primary">保存</Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </DragModal>

    </span>
  );
}
export default AddTreatment;
