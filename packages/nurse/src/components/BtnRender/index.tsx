import React from 'react';
import { Button } from 'antd';

interface Ioption {
  onCancel?: () => void;
  disabled?: boolean;
  cancelText?: string;
  loading?: boolean;
  onOk?: () => void;
  noCancel?: boolean;
  noOk?: boolean;
  okText?: string;
}
export const cancelBtn = (option: Ioption) => (
  <Button
    onClick={option.onCancel}
    disabled={option.disabled}
  >
    {option.cancelText || '退出'}
  </Button>
);

export const okBtn = (option: Ioption) => (
  <Button
    loading={option.loading || false}
    className="finish"
    disabled={option.disabled}
    onClick={option.onOk}
  >
    {option.okText || '完成'}
  </Button>
);

export const btnRender = (option: Ioption) => (
  <div className="common__btn">
    {!option.noCancel && cancelBtn(option)}
    {!option.noOk && okBtn(option)}
  </div>
);
