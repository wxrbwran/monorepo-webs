import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import DragModal from 'xzl-web-shared/src/components/DragModal';

interface IProps {
  children: string;
  handleCreateReport: (name: string) => void;
}
export default ({ children, handleCreateReport }: IProps) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [reportName, setReportName] = useState('');
  const handleCreate = () => {
    if (reportName === '') {
      message.error('报告名不能为空');
    } else {
      handleCreateReport(reportName);
      setIsShowModal(false);
    }
  };
  return (
    <>
      <span className="create-report" data-testid="plugin" onClick={() => setIsShowModal(true)}>
        {children}
      </span>
      <DragModal
        wrapClassName="ant-modal-wrap-center create-report-modal"
        width="800px"
        visible={isShowModal}
        title="生成报告"
        onCancel={() => setIsShowModal(false)}
        footer={null}
      >
        <div className="report-name">
          报告名称
          <Input
            className="report-name__input"
            placeholder="请输入报告名称, 报告名称仅限文字和数字"
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
          />
        </div>
        <div className="submit-btn-style1">
          <Button data-testid="cancel" onClick={() => setIsShowModal(false)}>
            取消
          </Button>
          <Button data-testid="submit" className="handleCreate" type="primary" onClick={handleCreate}>
            确定
          </Button>
        </div>
      </DragModal>
    </>
  );
};
