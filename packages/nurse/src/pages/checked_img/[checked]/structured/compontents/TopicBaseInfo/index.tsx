import React, { FC, useEffect, useState } from 'react';
import SearchHospital from '@/components/SearchHospital';
import ItemDate from '../ItemDate';
import { Form, Input, Row, Col } from 'antd';
import { baseField } from '../../utils';
import styles from './index.scss';
import { IQuestions } from 'typings/imgStructured';

interface IProps {
  initData: IQuestions[];
  outType: string; // JCD  OTHER
  changeCallbackFns: (params: ICallbackFn) => void
}

const TopicBaseInfo: FC<IProps> = ({ initData, changeCallbackFns, outType }) => {
  const [form] = Form.useForm();
  const { validateFields, setFieldsValue } = form;
  const fetchInit = () => {
    const initObj: CommonData = {};
    initData.forEach(item => {
      const ans = item.answer[0];
      switch (item.question) {
        case '检查机构':
          initObj.orgName = ans;
          break;
        case '时间':
          initObj.measured_at = Number(ans);
          break;
        case '检查部位':
          initObj.position = ans;
          break;
        case '检查方法':
          initObj.method = ans;
          break;
        case '检查名称':
          initObj.name = ans;
          break;
        case '单据名称':
          initObj.djName = ans;
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
      console.log(values);
      const questions: any[] = [];
      Object.keys(values).forEach((item: string) => {
        questions.push({
          question: baseField[item].text,
          answer: [values[item]],
          question_type: 'BASIC',
          group: `0-${baseField[item].inx}`,
          sid: window.$storage.getItem('sid'),
          // createdTime: new Date().getTime(),
        });
      });
      // resolve(questions);
      resolve({
        data: questions,
        groupInx: 0,
      });
      console.log('questions', questions);
    }).catch((err: any) => {
      reject(err);
    });
  });
  console.log('initData121112,', initData);
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
  };

  return (
    <div className={`border p-15 ${styles.topic_base} structured-edit-wrap`}>
      {/* <div onClick={handleFetch}>获取数据</div> */}
      <Form
        name="topicBaseInfo"
        form={form}
        initialValues={initialValues}
      >
        <Row>
          <Col span={12} className="flex">
            <Form.Item name="orgName" noStyle>
              <Input type="hidden" />
            </Form.Item>
            <span className="text-sm font-medium mr-8">检查机构: </span>
            <SearchHospital
              placeholder="请输入检查机构"
              callback={handleSetHospital}
              fieldName="hospital"
              style={{ width: 'calc(100% - 72px)' }}
              defaultValue={{ hospitalName: initialValues?.orgName }}
            />
          </Col>
          <Col span={12}>
            <Form.Item name="measured_at" noStyle>
              <Input type="hidden" />
            </Form.Item>
            <ItemDate
              // 如果是回显，就直接取回显的时间，没有就设置当前时间
              initReportTime={initialValues?.measured_at}
              setReporttime={(time: number | null) => handleChangeTime(time)}
              style={{ width: 'calc(100% - 70px)' }}
            />
          </Col>
          {
            outType === 'JCD' ? (
              <>
                <Col span={12}>
                <Form.Item name="position" label="检查部位">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12} className="pl-17">
                <Form.Item name="method" label="检查方法">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="name" label="检查名称">
                  <Input />
                </Form.Item>
              </Col>
              </>
            ) : (
              <Col span={12}>
                <Form.Item name="djName" label="单据名称">
                  <Input />
                </Form.Item>
              </Col>
            )
          }
        </Row>
      </Form>
    </div>
  );
};

export default TopicBaseInfo;
