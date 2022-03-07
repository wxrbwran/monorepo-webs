import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'umi';
import {
  Form, Checkbox, Radio, Select, InputNumber, Input, message, Divider,
} from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { SelectValue } from 'antd/lib/select';
import { btnRender } from '@/utils/button';
import { relatedOptions, familyList } from '@/utils/tools';
import * as api from '@/services/api';
import event from 'xzl-web-shared/dist/utils/events/eventEmitter';
import styles from './index.scss';

const RadioGroup = Radio.Group;
const { Option } = Select;

interface IProps {
  closeModal?: () => void; // 患者详情使用
}
function RelatedHistory({ closeModal }: IProps) {
  const dispatch = useDispatch();
  const infos = useSelector((state: IPatient) => state.detail.infos);
  const { integratedHistory } = infos;
  const patientSid = window.$storage.getItem('patientSid');
  const [date, setDate] = useState(new Date());
  const [form] = Form.useForm();
  const { setFieldsValue, getFieldValue, validateFields } = form;

  const refreshList = () => {
    dispatch({
      type: 'detail/fetchMedicalRecord',
      payload: patientSid,
    });
  };
  const handleSave = (values: CommonData) => {
    const params = {
      integratedHistory: { ...values },
      wcId: window.$storage.getItem('patientWcId'),
      sid: window.$storage.getItem('patientSid'),
      roleType: window.$storage.getItem('roleId'),
    };
    if (closeModal) {
      api.medical.updateDisease(params).then(() => {
        refreshList();
        message.success('添加成功');
        closeModal();
      }).catch(() => {
        message.error('请求出错');
      });
    } else {
      event.emit('fetchStructuredPreviousHistory', 'integratedHistory', params);
    }

  };
  // 图片审核
  useEffect(() => {
    const handleSubmitImg = () => {
      validateFields().then((values) => {
        handleSave(values);
      });
    };
    event.addListener('refreshPreviousHistory', refreshList);
    event.addListener('saveStructured', handleSubmitImg);
    return () => {
      event.removeListener('refreshPreviousHistory', refreshList);
      event.removeListener('saveStructured', handleSubmitImg);
    };
  }, []);

  useEffect(() => {
    setFieldsValue({ ...integratedHistory }); // 初使化患者的信息
    setDate(new Date());
  }, []);

  const formatData = (arr: []) => {
    const disease = {
      coronary: false,
      gout: false,
      hyperglycemia: false,
      hyperlipemia: false,
      hypertension: false,
      peripheralVascular: false,
      tumour: false,
    };
    const newObj: { [key: string]: boolean } = {};
    Object.keys(disease).forEach((i) => {
      if (arr.includes(i)) {
        newObj[i] = true;
      } else {
        newObj[i] = false;
      }
    });
    return { ...newObj };
  };

  const handleSetFieldsVal = (key: string, val: any) => {
    setFieldsValue({
      [key]: val,
    });
    // setFieldsValue并不会引起DOM更新，手动更新date，纯属为了让DOM同步更新，因为DOM中用到了getFieldValue
    setDate(new Date());
  };
  const changeDiseaseHistory = (key: string, e: CheckboxChangeEvent) => {
    handleSetFieldsVal(key, e.target.checked ? 'SICK' : 'WELL');
  };
  const changeDisease = (key: string, value: SelectValue) => {
    handleSetFieldsVal(key, formatData(value));
  };

  const formatSelectData = (obj: { [key: string]: string }) => {
    let arr: string[] = [];
    if (obj) {
      Object.keys(obj).forEach((i) => {
        if (obj[i]) {
          arr = [...arr, i];
        }
      });
    }
    return arr;
  };

  // 虽然用了Form,但InputNumber控件必须用传统defaultValue及onchange的方式，不知道其原因
  // Checkbox控件及Select的multiple类型仍使用传统defaultValue及onchange的方式，是因为所需的数据格式需要进行转换
  // RedioGroup控件之所以也用onChange是因为FieldsVal更新不会自动触发DOM渲染，而页面中用到了form.getFieldsVal的值
  return (
    <div className={styles.family_wrap}>
      <Form
        name="related"
      // initialValues={integratedHistory}
        onFinish={handleSave}
        form={form}
        className="more-padding family_form"
      >
        <Form.Item name="familyHistory">
          <Checkbox
            defaultChecked={integratedHistory && integratedHistory.familyHistory === 'SICK'}
            onChange={(e) => changeDiseaseHistory('familyHistory', e)}
          >
            家族史
          </Checkbox>
        </Form.Item>
        {familyList.map((item) => (
          <Form.Item
            key={item.key}
            name={item.key}
            className="history"
            style={{ marginLeft: item.key === 'brotherFamilyHistory' ? -28 : 0 }}
          >
            <span className="family-label">{item.value}</span>
            <Select
              disabled={
              getFieldValue('familyHistory') === 'WELL' || !getFieldValue('familyHistory')
            }
              mode="multiple"
              defaultValue={
              integratedHistory ? formatSelectData(integratedHistory[`${item.key}`]) : []
            }
              onChange={(value) => changeDisease(item.key, value)}
            >
              {relatedOptions.map((option) => (
                <Option key={option.value} value={option.value} title={option.label}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ))}
        <Divider dashed />
        <div className="info">
          <div className='flex'>
            <Form.Item name="smoking">
              <Checkbox
                defaultChecked={integratedHistory && integratedHistory.smoking === 'SICK'}
                onChange={(e) => changeDiseaseHistory('smoking', e)}
              >
                吸烟史:
              </Checkbox>
            </Form.Item>
            <Form.Item name="smokingSince">
              <InputNumber
                min={0}
                max={99}
                disabled={getFieldValue('smoking') === 'WELL' || !getFieldValue('smoking')}
                step={0.5}
                defaultValue={integratedHistory ? integratedHistory.smokingSince : ''}
                onChange={(value) => handleSetFieldsVal('smokingSince', value)}
                style={{ width: 100 }}
              />
              {' '}
              年
            </Form.Item>
          </div>
          <Form.Item name="smokingLevel" label="吸烟情况：">
            <Select
              disabled={getFieldValue('smoking') === 'WELL' || !getFieldValue('smoking')}
              style={{ width: 120 }}
            >
              <Option value="LEVEL_ONE">1-5支/日</Option>
              <Option value="LEVEL_TWO">5-10支/日</Option>
              <Option value="LEVEL_THREE">10-20支/日</Option>
              <Option value="LEVEL_FOUR">20支以上/日</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="info">
          <Form.Item name="quitSmoking" label="戒烟情况：">
            <RadioGroup
              disabled={getFieldValue('smoking') === 'WELL' || !getFieldValue('smoking')}
              onChange={(e) => handleSetFieldsVal('quitSmoking', e.target.value)}
            >
              <Radio value="QUITED">已戒烟</Radio>
              <Radio value="REMAIN">未戒烟</Radio>
            </RadioGroup>
          </Form.Item>
          {getFieldValue('quitSmoking') === 'QUITED' && (
            <Form.Item name="quitSmokingSince" label="戒烟：" >
              <InputNumber
                min={0}
                max={99}
                disabled={getFieldValue('smoking') === 'WELL' || !getFieldValue('smoking')}
                step={0.5}
                defaultValue={integratedHistory ? integratedHistory.quitSmokingSince : ''}
                onChange={(value) => handleSetFieldsVal('quitSmokingSince', value)}
                style={{ width: 105 }}
              />
              {' '}
              年
            </Form.Item>
          )}
        </div>
        <Divider dashed />
        <div className="info">
          <div className='flex'>
            <Form.Item name="drinking">
              <Checkbox
                defaultChecked={integratedHistory && integratedHistory.drinking === 'SICK'}
                onChange={(e) => changeDiseaseHistory('drinking', e)}
              >
                饮酒史:
              </Checkbox>
            </Form.Item>
            <Form.Item name="drinkingSince">
              <InputNumber
                min={0}
                max={99}
                disabled={getFieldValue('drinking') === 'WELL' || !getFieldValue('drinking')}
                step={0.5}
                defaultValue={integratedHistory ? integratedHistory.drinkingSince : ''}
                onChange={(value) => handleSetFieldsVal('drinkingSince', value)}
                style={{ width: 100 }}
              />
              {' '}
              年
            </Form.Item>
          </div>
          <Form.Item name="drinkingLevel" label="饮酒情况：">
            <Select
              disabled={getFieldValue('drinking') === 'WELL' || !getFieldValue('drinking')}
              style={{ width: 120 }}
            >
              <Option value="LEVEL_ONE">少量</Option>
              <Option value="LEVEL_TWO">多量</Option>
              <Option value="LEVEL_THREE">超量</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="info">
          <Form.Item name="quitDrinking" label="戒酒情况：">
            <RadioGroup
              disabled={getFieldValue('drinking') === 'WELL' || !getFieldValue('drinking')}
              onChange={(e) => handleSetFieldsVal('quitDrinking', e.target.value)}
            >
              <Radio value="QUITED">已戒酒</Radio>
              <Radio value="REMAIN">未戒酒</Radio>
            </RadioGroup>
          </Form.Item>
          {getFieldValue('quitDrinking') === 'QUITED' && (
          <Form.Item name="quitDrinkingSince" label="戒酒：">
            <InputNumber
              min={0}
              max={99}
              disabled={getFieldValue('drinking') === 'WELL' || !getFieldValue('drinking')}
              step={0.5}
              defaultValue={integratedHistory ? integratedHistory.quitDrinkingSince : ''}
              onChange={(value) => handleSetFieldsVal('quitDrinkingSince', value)}
              style={{ width: 100 }}
            />
            {' '}
            年
          </Form.Item>
          )}
        </div>
        <Divider dashed />
        <div className="info">
          <Form.Item name="allergy">
            <Checkbox
              defaultChecked={integratedHistory && integratedHistory.allergy === 'SICK'}
              onChange={(e) => changeDiseaseHistory('allergy', e)}
            >
              过敏史:
            </Checkbox>
          </Form.Item>
          <Form.Item name="allergyInfo" style={{ flex: '1 0 auto' }}>
            <Input.TextArea
              disabled={getFieldValue('allergy') === 'WELL' || !getFieldValue('allergy')}
            />
          </Form.Item>
        </div>
        {
        closeModal && (
          <Form.Item style={{ marginTop: 42 }}>
            {btnRender({
              okText: '保存',
              cancelText: '取消',
              htmlType: 'submit',
              onCancel: () => {
                closeModal();
              },
            })}
          </Form.Item>
        )
      }
      </Form>
    </div>
  );
}

export default RelatedHistory;
