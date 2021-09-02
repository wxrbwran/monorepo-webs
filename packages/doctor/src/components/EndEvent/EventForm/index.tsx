/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable @typescript-eslint/no-unused-vars-experimental */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { useSelector } from 'umi';
import {
  Form, Checkbox, message,
} from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { btnRender } from '@/utils/button';
import * as api from '@/services/api';
import styles from '../index.scss';

interface IProps {
  handleChangeStep: (val: number) => void;
  projSid: string
}

const FormItem = Form.Item;
const EventForm: FC<IProps> = (props) => {
  const [form] = Form.useForm();
  const { userInfo } = useSelector((state:IState) => state.user);
  const { setFieldsValue } = form;
  const [firstEvent, setFirstEvent] = useState({});
  const [secondEvent, setSecondEvent] = useState({});
  const [thirdEvent, setThirdEvent] = useState({});
  const [forthEvent, setForthEvent] = useState({});
  const [projectSid, setProjectSid] = useState('');

  useEffect(() => {
    api.event.fetchEventDetail(props.projSid).then((res) => {
      console.log('resproj', res);
      // setIsShow(res.result);
      const {
        adverseEvent, mainEndpoint, secondaryEndpoint, sae,
      } = res;
      setFirstEvent(mainEndpoint.detail);
      setSecondEvent(secondaryEndpoint.detail);
      setThirdEvent(adverseEvent.detail);
      setForthEvent(sae.detail);
      setProjectSid(res.projectSid);
    })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const changeDisease = (key: string, value: string) => {
    setFieldsValue({
      [key]: value,
    });
  };

  const handleSubmit = (values: CommonData) => {
    console.log('values', values);
    let firstObj = {};
    let secondObj = {};
    let thirdObj = {};
    let forthObj = {};
    Object.keys(values).forEach((item) => {
      if (!values[item]) {
        // eslint-disable-next-line no-param-reassign
        delete values[item];
      }
    });
    Object.keys(values).forEach((item) => {
      if (item.indexOf('first_') > -1) {
        firstObj = { ...firstObj, [item]: values[item] };
      }
      if (item.indexOf('second_') > -1) {
        secondObj = { ...secondObj, [item]: values[item] };
      }
      if (item.indexOf('third_') > -1) {
        thirdObj = { ...thirdObj, [item]: values[item] };
      }
      if (item.indexOf('forth_') > -1) {
        forthObj = { ...forthObj, [item]: values[item] };
      }
    });
    let endEvents: any[] = [];
    const eventType = [firstObj, secondObj, thirdObj, forthObj];
    eventType.forEach((item, index) => {
      if (!isEmpty(item)) {
        endEvents = [
          ...endEvents,
          {
            detail: { ...item },
            type: index + 1,
          },
        ];
      }
    });
    api.event.addEndEvent({
      endEvents,
      doctorName: userInfo.name,
      doctorSid: window.$storage.getItem('sid'),
      patientName: window.$storage.getItem('patientName'),
      patientSid: window.$storage.getItem('patientSid'),
      projectSid,
    }).then(() => {
      message.success('保存成功');
      props.handleChangeStep(0);
    })
      .catch((err) => {
        console.log('err', err);
      });
  };
  const mainEventList = [
    {
      title: '一. 主要终点事件(多选)',
      data: firstEvent,
    }, {
      title: '二. 次要终点事件(多选)',
      data: secondEvent,
    },
  ];
  const subEventList = [
    {
      title: '3.1 不良事件',
      data: thirdEvent,
    }, {
      title: '3.2 严重不良反应事件（SAE）',
      data: forthEvent,
    },
  ];
  return (
    <Form
      name="event"
      onFinish={handleSubmit}
      form={form}
      className={styles.event}
    >
      {
        mainEventList.map((ev) => (
          <div key={ev.title}>
            <FormItem noStyle>
              <p>{ev.title}</p>
            </FormItem>
            {
            Object.keys(ev.data).length > 0
              ? <div className={styles.checkbox_wrapper}>
                {
                    Object.keys(ev.data).map((item) => (
                      <FormItem
                        name={item}
                        noStyle
                      >
                        <Checkbox onChange={(e) => changeDisease(item, ev.data[item], e)}>
                          {ev.data[item]}
                        </Checkbox>
                      </FormItem>
                    ))
                  }
              </div>
              : <FormItem
                  name={`${ev.data}`}
              >
                <span className={styles.empty}>暂无数据</span>
              </FormItem>
          }
          </div>
        ))
      }
      <FormItem noStyle>
        <p>三. 不良反应(多选)</p>
      </FormItem>
      <div className="ml-6">
        {
          subEventList.map((ev) => (
            <div key={ev.title}>
              <FormItem noStyle>
                <p>{ev.title}</p>
              </FormItem>
              {
              Object.keys(ev.data).length > 0
                ? <div className={styles.checkbox_wrapper}>
                  {
                      Object.keys(ev.data).map((item) => (
                        <FormItem
                          name={item}
                          noStyle
                        >
                          <Checkbox onChange={(e) => changeDisease(item, ev.data[item], e)}>
                            {ev.data[item]}
                          </Checkbox>
                        </FormItem>
                      ))
                    }
                </div>
                : <FormItem
                    name={`${ev.data}`}
                >
                  <span className={styles.empty}>暂无数据</span>
                </FormItem>
            }
            </div>
          ))
        }
      </div>
      <FormItem style={{ marginTop: 42 }}>
        {btnRender({
          okText: '保存并退出',
          cancelText: '上一步',
          htmlType: 'submit',
          onCancel: () => {
            props.handleChangeStep(1);
          },
        })}
      </FormItem>
    </Form>
  );
};

export default EventForm;
