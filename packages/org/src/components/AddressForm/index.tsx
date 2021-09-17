import React from 'react';
import { Form, Input } from 'antd';
import Region, { IRegion } from '@/components/Region';

interface IProps {
  getRegion: (region: IRegion) => void;
  initData: IRegion;
}

function AddressForm(props: IProps) {
  const { getRegion, initData } = props;

  return (
    <div>
      <Form.Item label="实体医院地址" name="provinceName">
        <Input type="hidden" />
        <Form.Item noStyle>
          <Region getRegion={getRegion} initData={initData} />
        </Form.Item>
      </Form.Item>
      {/* <span>实体医院地址:</span> */}
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
    </div>
  );
}

export default AddressForm;
