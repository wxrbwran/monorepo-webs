import React, { FC, useEffect, useState } from 'react';
import SearchHospital from '@/components/SearchHospital';
import ItemDate from '../ItemDate';
import { Form, Input, Row, Col, message, AutoComplete } from 'antd';
import { baseField } from '../utils';
import styles from './index.scss';
import { IQuestions } from 'typings/imgStructured';

interface IProps {
  initData: IQuestions[];
  outType: string; // JCD  OTHER
  changeCallbackFns: (params: ICallbackFn) => void
  changeJcdBaseInfo: (params: object) => void;
}

const TopicBaseInfo: FC<IProps> = (props) => {
  const { initData, changeCallbackFns, outType, changeJcdBaseInfo } = props;
  const [form] = Form.useForm();
  const { validateFields, setFieldsValue, getFieldsValue } = form;
  const [parts, setParts] = useState<{ value: string }[]>([{ value: '头部' }, { value: '胃部' }]);
  const [methods, setMethods] = useState<{ value: string }[]>([{ value: 'ct' }, { value: '核磁' }]);
  console.log(setParts, setMethods);
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
          initObj.part = ans;
          break;
        case '检查方法':
          initObj.method = ans;
          break;
        case '检查单名称':
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
      console.log('基本信息', values);
      const questions: any[] = [];
      Object.keys(values).forEach((item: string) => {
        questions.push({
          question: baseField[item].text,
          answer: [values[item]],
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
  const handleChangeName = () => {
    const coreField = outType === 'JCD' ? ['part', 'method'] : ['djName'];
    console.log('核心字段：', getFieldsValue(coreField));
    changeJcdBaseInfo(getFieldsValue(coreField));
  };
  const rules = [{ required: true, message: '请输入' }];
  const handleSearch = (val: string, type: string) =>{
    console.log('-------search', val, type );
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
          <Col span={11} className="flex">
            <Form.Item name="orgName" noStyle>
              <Input type="hidden" />
            </Form.Item>
            <span className="text-sm font-medium mr-8 w-72 inline-block">检查机构: </span>
            <SearchHospital
              placeholder="请输入检查机构"
              callback={handleSetHospital}
              fieldName="hospital"
              style={{ width: 'calc(100% - 80px)' }}
              defaultValue={{ hospitalName: initialValues?.orgName }}
            />
          </Col>
          <Col span={13}>
            <Form.Item name="measured_at" noStyle>
              <Input type="hidden" />
            </Form.Item>
            <ItemDate
              // 如果是回显，就直接取回显的时间，没有就设置当前时间
              initReportTime={initialValues?.measured_at}
              setReporttime={(time: number | null) => handleChangeTime(time)}
              style={{ width: 'calc(100% - 168px)' }}
            />
          </Col>
          {
            outType === 'JCD' ? (
              <>
                <Col span={11} className='my-10'>
                <Form.Item name="part" label="检查部位" rules={rules}>
                  {/* <Input onBlur={handleChangeName}  /> */}
                  <AutoComplete
                    options={parts}
                    onSearch={(val) => handleSearch(val, 'part')}
                    onBlur={handleChangeName}
                    placeholder="请输入检查部位"
                  />
                </Form.Item>
              </Col>
              <Col span={13} className="pl-17 my-10">
                <Form.Item name="method" label="检查方法" rules={rules}>
                  {/* <Input onBlur={handleChangeName}  /> */}
                  <AutoComplete
                    options={methods}
                    onSearch={(val) => handleSearch(val, 'method')}
                    onBlur={handleChangeName}
                    placeholder="请输入检查方法"
                  />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item name="name" label="检查单名称">
                  <Input />
                </Form.Item>
              </Col>
              </>
            ) : (
              <Col span={11}>
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
