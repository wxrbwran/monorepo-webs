import React, { useState, useEffect } from 'react';
import * as api from '@/services/api';
// import draft from '@/assets/img/draft.png';
import { Form, Button, message } from 'antd';
import EventItem from '../components/event_item';
import Detail from '../components/detail';
import styles from '../index.scss';
import { Role } from 'xzl-web-shared/dist/utils/role';
import { useSelector } from 'umi';
interface IDetail {
  id: string;
  adverseEvent: {
    detail: object;
  };
  mainEndpoint: {
    detail: object;
  };
  secondaryEndpoint: {
    detail: object;
  };
}
function Define() {
  const [form] = Form.useForm();
  const { setFieldsValue } = form;
  const [isEdit, setIsEdit] = useState(false);
  const [val, setVal] = useState({});
  const [isDraft, setIsDraft] = useState(true);
  const [eventDetail, setEventDetail] = useState<IDetail>();
  const projectSid = window.$storage.getItem('projectSid');
  const { roleType, status } = useSelector((state: IState) => state.project.projDetail);

  const handleEdit = () => {
    setIsEdit(true);
  };
  useEffect(() => {
    if (eventDetail) {
      const { mainEndpoint, secondaryEndpoint, adverseEvent } = eventDetail;
      let firstObj = mainEndpoint.detail;
      let secondObj = secondaryEndpoint.detail;
      let thirdObj = adverseEvent.detail;
      let initData: CommonData = {};
      Object.keys(firstObj).forEach((item, index) => {
        initData = { ...initData, [`first_${index}`]: firstObj[item] };
      });
      Object.keys(secondObj).forEach((item, index) => {
        initData = { ...initData, [`second_${index}`]: secondObj[item] };
      });
      Object.keys(thirdObj).forEach((item, index) => {
        initData = { ...initData, [`third_${index}`]: thirdObj[item] };
      });
      setVal({ ...initData });
      setFieldsValue({ ...initData });
    }
  }, [eventDetail]);
  const fetchEndEvent = () => {
    api.event
      .fetchEndEvent(projectSid)
      .then((res) => {
        setEventDetail(res);
        setIsDraft(res.status ? false : true);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };
  const handleSubmit = (values: CommonData) => {
    Object.keys(values).forEach((item) => {
      if (!values[item]) {
        delete values[item];
      }
    });
    console.log('values', values);
    setIsEdit(false);
    let firstObj = {};
    let secondObj = {};
    let thirdObj = {};
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
    });
    const serviceApi = eventDetail?.id ? 'updateEndEvent' : 'addEndEvent';
    // api.event.addEndEvent({
    // api.event.updateEndEvent({
    const params = {
      adverseEvent: {
        detail: { ...thirdObj },
        type: 3,
      },
      mainEndpoint: {
        detail: { ...firstObj },
        type: 1,
      },
      secondaryEndpoint: {
        detail: { ...secondObj },
        type: 2,
      },
      // id: eventDetail?.id || '',
      sae: {
        detail: {
          forth_1: '死亡',
          forth_2: '危及生命',
          forth_3: '永远、严重残疾、功能丧失',
          forth_4: '先天性异常、出生缺陷',
          forth_5: '需要住院治疗、延长住院时间',
        },
        type: 4,
      },
      projectSid,
      status: 1,
    };
    if (eventDetail?.id) {
      params.id = eventDetail?.id;
    }
    api.event[serviceApi]({ ...params })
      .then(() => {
        message.success('保存成功');
        setIsEdit(false);
        fetchEndEvent();
        form.resetFields();
        if (eventDetail) {
          // 编辑
          window.$log.handleOperationLog({
            type: 1,
            copyWriting:'编辑终点事件',
            businessType: window.$log.businessType.UPDATE_END_EVENT.code,
            oldParams: {
              content: eventDetail,
            },
            newParams: {
              content: params,
            },
          });
        } else {
          // 创建
          window.$log.handleOperationLog({
            type: 0,
            copyWriting:'创建终点事件',
          });
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  };
  useEffect(() => {
    fetchEndEvent();
  }, []);
  console.log(isDraft);

  const isLeader = [Role.MAIN_PI.id, Role.PROJECT_LEADER.id].includes(roleType);
  return (
    <div className={styles.define}>
      <Form
        name="event"
        // initialValues={initFormVal}
        onFinish={handleSubmit}
        form={form}
        style={{ display: isEdit ? 'flex' : 'none' }}
      >
        <div style={{ flex: 1 }}>
          <EventItem
            title="一. 主要终点事件"
            text="主要终点"
            type="first"
            isEdit={isEdit}
            initData={val}
          />
          <EventItem
            title="二. 次要终点事件"
            text="次要终点"
            type="second"
            isEdit={isEdit}
            initData={val}
          />
          <p className={styles.title}>三. 不良反应</p>
          <div className={styles.sick}>
            <EventItem
              title="1. 不良事件"
              text="不良"
              type="third"
              isEdit={isEdit}
              initData={val}
            />
          </div>
        </div>
        {/* <Form.Item>
          <Button htmlType="submit" className={styles.draft}>保存草稿</Button>
        </Form.Item> */}
        <Form.Item>
          <Button htmlType="submit" onClick={() => setIsDraft(false)}>
            保存
          </Button>
        </Form.Item>
      </Form>
      {!isEdit && (
        <div className={styles.detail}>
          <Detail eventDetail={eventDetail} />
          {isLeader &&
            status != 1001 && (
              <Button type="primary" ghost onClick={handleEdit}>
                编辑
              </Button>
          )}
        </div>
      )}
    </div>
  );
}
export default Define;
