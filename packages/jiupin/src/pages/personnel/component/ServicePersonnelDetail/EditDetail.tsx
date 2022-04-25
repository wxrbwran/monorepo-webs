import React from 'react';
import {
  Form, Input, Radio, Button, message, Select,
} from 'antd';
import { debounce } from 'lodash';
import Calendar from '@/components/Calendar';
import Region, { IRegion } from '@/components/Region';
import * as api from '@/services/api';
import { useSelector } from 'umi';
import { banksName } from '@/utils/tools';
import styles from './index.scss';

interface Iprops {
  userInfo: ISubject;
  userAllInfo: {
    ns: {
      id: string;
      name: string;
    },
    roles: {
      id: string;
      name: string;
      subject: ISubject;
      nroleTags: {
        name: string;
        id: string;
      }[]
    }[],
    wcId: string;
  };
  onClose: (isRefresh?: boolean) => void;

}
const { Option } = Select;
const { TextArea } = Input;
function EditDetail(props: Iprops) {
  const { userInfo, userAllInfo, onClose } = props;
  const [form] = Form.useForm();
  const { roleList } = useSelector((state: IState) => state.personnel);
  const { setFieldsValue } = form;
  const handleSubmit = (values: any) => {
    console.log(values);
    const detail = {
      id: userInfo?.id,
      ...values,
    };
    if (detail.nroleTagId) {
      delete detail.nroleTagId;
    }
    const params = {
      coreRel: {
        wcId: userAllInfo.wcId,  // 被修改人员的wcid
        nroleTagIds: [values.nroleTagId], // //角色列表id
      },
      detail,
    };
    api.personnel.postTeamWorker(params).then(() => {
      message.success('保存成功');
      onClose(true);
    });
  };


  const handleSetFieldsVal = (key: string, val: any) => {
    console.log(val);
    setFieldsValue({
      [key]: new Date(val).getTime(),
    });
  };
  const initFormVal:CommonData = {
    ...userInfo,
    nroleTagId: userAllInfo.roles[0]?.nroleTags?.[0]?.id, // 目前是单角色，默认取第一个。此版本正常来说不存在多个
  };

  const getRegion = (region: IRegion) => {
    setFieldsValue({
      ...region,
    });
  };

  const baseSex: CommonData = {
    男: 1,
    女: 0,
    保密: 2,
  };

  return (
    <div>
      <div className={styles.edit_info}>
        <Form
          name="baseInfo"
          initialValues={initFormVal}
          onFinish={debounce(handleSubmit, 300)}
          form={form}
          id="height42"
        >
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: '请输入姓名!' }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            label="角色"
            name="nroleTagId"
            rules={[{ required: true, message: '请选择角色!' }]}
          >
             <Select placeholder="请选择角色">
              {
                roleList?.map((item: { id: string; name: string; }) => (
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            label="身份证号"
            name="idNum"
          >
            <Input placeholder="请输入身份证号" />
          </Form.Item>
          <Form.Item
            label="性别"
            name="sex"
          >
            <Radio.Group>
              {
                Object.keys(baseSex).map((item: string) => (
                  <Radio value={baseSex[item]} key={item}>{item}</Radio>
                ))
              }
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="出生日期"
            name="birthday"
          >
            <Input type="hidden" />
            <Form.Item noStyle>
              <Calendar
                needInit={false}
                value={initFormVal.birthday}
                onChange={(dateString) => handleSetFieldsVal('birthday', dateString)}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="现住址"
            name="provinceName"
          >
            <Input type="hidden" />
            <Form.Item noStyle>
              <Region getRegion={getRegion} initData={initFormVal} />
            </Form.Item>
          </Form.Item>
          <div style={{ display: 'none' }}>
            <Form.Item label="" name="cityName">
              <Input type="hidden" />
            </Form.Item>
            <Form.Item label="" name="cityCode">
              <Input type="hidden" />
            </Form.Item>
            <Form.Item label="" name="townName">
              <Input type="hidden" />
            </Form.Item>
            <Form.Item label="" name="townCode">
              <Input type="hidden" />
            </Form.Item>
            <Form.Item label="" name="provinceCode">
              <Input type="hidden" />
            </Form.Item>
            <Form.Item label="" name="address">
              <Input type="hidden" />
            </Form.Item>
          </div>
          <Form.Item
            label="详细地址"
            name="detailAddress"
          >
            <Input />
          </Form.Item>

          <div className='flex justify-between'>
            <Form.Item
                label="银行卡号"
                name="bankCardNum"
                className={styles.left_input}
              >
                <Input className={styles.bankcardnum} />
              </Form.Item>
            <Form.Item
              label="持卡银行:"
              name="bankName"
              className={styles.right_input}
            >
              <Select
                placeholder="请选择银行"
                className="item"
                style={{ width: '100%', minWidth: 260 }}
              // onChange={value => this.handleBaseChange('bank', value)}
              >
                {banksName.map((bank) => (
                  <Option key={bank} value={bank}>{bank}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <Form.Item
            label="工作经历"
            name="biography"
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <div className="common__btn">
              <Button onClick={onClose}>取消</Button>
              <Button
                type="primary"
                htmlType="submit"
                className="finish"
              >
                确定
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default EditDetail;
