import React, { useEffect } from 'react';
import { Form, InputNumber } from 'antd';
import * as api from '@/services/api';

interface IProps {
  handleCallbackFns: (params: ICallbackFn) => void; // 图片审核大病历使用
  imageType: string;
}
function PatientBaseInfo({ handleCallbackFns, imageType }: IProps) {
  const [form] = Form.useForm();
  const { validateFields, setFieldsValue } = form;

  const handleSaveBaseInfo = () => new Promise((resolve, reject) => {
    validateFields().then((values) => {
      console.log('基本资料');
      const params = {
        id: window.$storage.getItem('patientSid'),
        ...values,
      };
      api.base.patchOtherInfo(params).then(() => {
        // 图片审核保存此类型
        const returnData = {
          imageType,
          imageTypeStatus: 'NORMAL',
          items: [],
        };
        resolve(returnData);
        // 图片审核保存此类型
      }).catch((err) => {
        reject(err);
      });
    });
  });
  const fetchPatientInfo = () => {
    const params = {
      wcIds: [window.$storage.getItem('patientWcId')],
    };
    window.$api.user.getUserInfo(params).then((res: {wcl :Iwcl[]}) => {
      if (res.wcl[0]?.roles?.[0]?.subject) {
        const { height, weight, waistline } = res.wcl[0].roles[0].subject;
        setFieldsValue({
          height,
          weight,
          waistline,
        });
      }
    });
  };

  useEffect(() => {
    fetchPatientInfo();

    if (handleCallbackFns) {
      handleCallbackFns({
        action: 'add',
        type: 'USER_INFO',
        fn: handleSaveBaseInfo,
      });
    }
    return () => {
      if (handleCallbackFns) {
        handleCallbackFns({
          action: 'remove',
          type: 'USER_INFO',
        });
      }
    };
  }, []);
  return (
    <div>
      <Form
        name="baseInfo"
        form={form}
        className="more-padding"
      >
        <div className="flex justify-around items-center">
          <div className="flex items-baseline">
            <Form.Item label="身高" name="height">
              <InputNumber step={1} precision={0} min={1} />
            </Form.Item>
            <span className="ml-3">CM</span>
          </div>
          <div className="flex items-baseline">
            <Form.Item label="体重" name="weight">
              <InputNumber step={1} precision={0} min={1} />
            </Form.Item>
            <span className="ml-3">KG</span>
          </div>
          <div className="flex items-baseline">
            <Form.Item label="腰围" name="waistline">
              <InputNumber step={1} precision={0} min={1} />
            </Form.Item>
            <span className="ml-3">CM</span>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default PatientBaseInfo;
