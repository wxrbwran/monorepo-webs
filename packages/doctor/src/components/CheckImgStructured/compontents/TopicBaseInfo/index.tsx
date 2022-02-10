import React, { FC, useEffect, useState, useRef } from 'react';
import SearchHospital from '@/components/SearchHospital';
import ItemDate from '../ItemDate';
import { Form, Input, Row, Col, message } from 'antd';
import { baseField } from '../utils';
import styles from './index.scss';
import { IQuestions } from 'typings/imgStructured';

interface IProps {
  initData: IQuestions[];
  outType: string; // JCD  OTHER
  changeCallbackFns: (params: ICallbackFn) => void;
  isViewOnly: boolean;
}

const TopicBaseInfo: FC<IProps> = (props) => {
  const { initData, changeCallbackFns, isViewOnly } = props;
  const [form] = Form.useForm();
  const { validateFields, setFieldsValue } = form;
  let timeRef = useRef<null | number>(null); // 存一下日期上的时间，当点击时间不详时，存起来，取消时间不详时，恢复此值到measure_at
  const fetchInit = () => {
    const initObj: CommonData = { measured_at: new Date().getTime() };
    initData.forEach(item => {
      const ans = item.answer[0];
      switch (item.question) {
        case '检查机构':
          initObj.orgName = ans;
          break;
        case '时间':
          timeRef.current = ans === null ? new Date().getTime() : Number(ans);
          initObj.measured_at = ans === null ? null : Number(ans);
          break;
        default:
          break;
      }
    });
    return initObj;
  };
  const [initialValues, setInitVals] = useState(fetchInit());
  const handleSave = () => new Promise((resolve, reject) => {
    validateFields().then((values: CommonData) => {
      console.log('基本信息', values);
      const questions: any[] = [];
      Object.keys(values).forEach((item: string) => {
        questions.push({
          question: baseField[item].text,
          answer: values[item] !== undefined ? [values[item]] : [],
          question_type: 'BASIC',
          group: `0-${baseField[item].inx}`,
          sid: window.$storage.getItem('sid'),
        });
      });
      resolve({
        data: questions,
        groupInx: 0,
      });
      console.log('questions', questions);
    }).catch((err: any) => {
      console.log('基本信息err', err);
      message.error({
        content: '请输入检查部位和检查方法',
        maxCount: 1,
      });
      message.config({
        maxCount: 1,
      });
      reject(err);
    });
  });
  useEffect(() => {
    setInitVals(fetchInit());
  }, [initData]);
  useEffect(() => {
    if (changeCallbackFns) {
      changeCallbackFns({
        type: 'BASIC',
        fn: handleSave,
      });
    }
  }, []);
  const handleSetHospital = (key: string, val: any) => {
    console.log(key);
    setFieldsValue({ orgName: val.hospitalName });
  };
  const handleChangeTime = (time: number | null) => {
    setFieldsValue({ measured_at: time });
    timeRef.current = time;
  };
  const handleChangeUnKonwTime = (isUnKonw) => {
    console.log('isUnKonw', isUnKonw);
    setFieldsValue({ measured_at: isUnKonw ? null : timeRef.current });
  };
  console.log('initialValues', initialValues);
  return (
    <div className={`${styles.topic_base} structured-edit-wrap`}>
      {/* <div onClick={handleFetch}>获取数据</div> */}
      <Form
        name="topicBaseInfo"
        form={form}
        initialValues={initialValues}
      >
        <Row>
          <Col span={11} className="flex">
            {
              !(isViewOnly && !initialValues?.orgName) && (
                <>
                  <Form.Item name="orgName" noStyle>
                    <Input type="hidden" />
                  </Form.Item>
                  <span className="text-sm font-medium mr-2 w-65 inline-block">检查机构: </span>
                  <SearchHospital
                    allowClear={true}
                    placeholder="请输入检查机构"
                    callback={handleSetHospital}
                    fieldName="hospital"
                    style={{ width: 'calc(100% - 80px)' }}
                    defaultValue={{ hospitalName: initialValues?.orgName }}
                  />
                </>
              )
            }
           </Col>
          {
            <Col span={13}>
              <Form.Item name="measured_at" noStyle>
                <Input type="hidden" />
              </Form.Item>
              <ItemDate
                isViewOnly={isViewOnly}
                // 如果是回显，就直接取回显的时间，没有就设置当前时间
                initReportTime={initialValues?.measured_at || new Date().getTime()}
                setReporttime={(time: number | null) => handleChangeTime(time)}
                setUnknow={handleChangeUnKonwTime}
                isUnknownTime={!!(initialValues?.measured_at === null)}
                style={{ width: 'calc(100% - 168px)' }}
                label="检查时间"
              />
            </Col>
          }
        </Row>
      </Form>
    </div>
  );
};

export default TopicBaseInfo;
