import type { FC } from 'react';
import React, { useState, useEffect } from 'react';
import { Steps, Button, Form, message } from 'antd';
import { history, useSelector } from 'umi';
import type { IValues, IRule } from '../../const';
import { handleFormatValues, getCheckedContent } from '../../utils';
import SendContent from '../../components/send_content';
import SendPlan from '../../components/send_plan';
import styles from './index.scss';
import * as api from '@/services/api';

const { Step } = Steps;
type IAbled = Record<string, boolean>;
const EducationCreate: FC<ILocation> = ({ location }) => {
  const isScale = location.pathname.includes('scale');
  const sendList = useSelector((state: IState) => state.education.sendList);
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [disabled, setDisabled] = useState<IAbled>({}); // 年龄性别是否禁用状态
  const [checked, setChecked] = useState<string>(''); // 选择的要发送的内容的id
  const [rules, setRules] = useState<IRule>();
  const [initFormVal, setInitFormVal] = useState({ frequencyType: 'normal' });
  const currentOrgInfo = useSelector((state: IState) => state.education.currentOrgInfo);

  const next = () => {
    if (!checked) {
      message.error('请选择发送内容!');
    } else {
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    api.education
      .getRules(isScale ? 'FOLLOW' : 'PUBLICIZE_EDUCATION')
      .then((res) => {
        console.log('resrules', res);
        setRules(res);
      })
      .catch((err: string) => {
        console.log('err', err);
      });
  }, []);

  useEffect(() => {
    // 为了上一步 下一步来回操作时能记录值
    form.setFieldsValue({ ...initFormVal });
  }, [current]);

  // 更新状态：列表判断是否已有发送计划使用
  const handleUpdataStatus = (content: any) => {
    let statusParams = content;
    if (isScale) {
      statusParams = content.map((item) => {
        return { ...item, type: 5 };
      });
    }
    api.education.postPublicizeBatchStatus({ content: statusParams });
  };
  const onFinish = (values: IValues) => {
    console.log('Received values of form:', values);
    const result = handleFormatValues(values, rules, isScale, checked);
    if (result) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { start, must, should_1, actions } = result;
      const content = getCheckedContent(checked.split(','), sendList);
      // 提交参数
      const params = {
        rules: [
          {
            title: '',
            match: {
              must: [...start, ...must],
              should_1: [...should_1],
            },
            actions: [...actions],
          },
        ],
        localRules: [
          {
            content,
            ...values,
          },
        ],
        meta: {
          sid: window.$storage.getItem('sid'),
          sourceType: isScale ? 2 : 3,
          teamLocations: [{
            sid: window.$storage.getItem('sid'),
            ns: window.$storage.getItem('nsId'),
            role: window.$storage.getItem('currRoleId'),
          }, {
            sid: currentOrgInfo.sid,
            ns: currentOrgInfo.nsId,
            role: currentOrgInfo.role,
          }],
        },
      };
      console.log('params666', params);
      api.education
        .sendPlan(params)
        .then(() => {
          // message.success('发送成功')
          // history.push('/education/patient/publicize');
          handleUpdataStatus(content);
          history.goBack();
        })
        .catch((err: string) => {
          console.log('err', err);
        });
    }
  };

  const handleChange = (changedValues: any, allValues: { conditions: { type: string }[] }) => {
    console.log('changedValues', changedValues, allValues);
    setInitFormVal({ ...allValues });
    const disableObj = {
      age: false,
      sex: false,
    };
    const vals = allValues.conditions.map((item) => item?.type);
    if (vals.includes('age')) {
      disableObj.age = true;
    }
    if (vals.includes('sex')) {
      disableObj.sex = true;
    }
    setDisabled(disableObj);
  };

  const changeContent = (ids: string) => {
    setChecked(ids);
  };

  const steps = [
    {
      title: '选择发送内容',
      content: (
        <SendContent location={location} changeContent={changeContent} defaultChecked={checked} />
      ),
    },
    {
      title: '定制发送计划',
      content: <SendPlan form={form} disabled={disabled} />,
    },
  ];
  return (
    <Form
      name="send_plane"
      // initialValues={{...initFormVal}}
      onFinish={onFinish}
      autoComplete="off"
      form={form}
      onValuesChange={handleChange}
      className={styles.send_form}
    >
      <div className={`${styles.edu_create} px-60 py-20`}>
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {!current ? (
            <Button style={{ margin: '0 8px' }} onClick={() => history.goBack()}>
              返回
            </Button>
          ) : (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              上一步
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()} disabled={!checked}>
              下一步
            </Button>
          )}
          {current === steps.length - 1 && (
            // <Button type="primary" onClick={() => message.success('Processing complete!')}>
            //   完成
            // </Button>
            <Form.Item noStyle>
              <Button type="primary" htmlType="submit">
                完成
              </Button>
            </Form.Item>
          )}
        </div>
      </div>
    </Form>
  );
};

export default EducationCreate;
