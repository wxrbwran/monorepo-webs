import React, { FC, useState } from 'react';
import { Descriptions } from 'antd';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import ReferenceItem from './ReferenceItem';

interface IProps {
  record: TIndexItem;
  curDocument: TDocument
}

const ViewIndex: FC<IProps> = (props) => {
  const { children, record, curDocument } = props;
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div style={{ display: 'inline' }} onClick={() => setShowModal(!showModal)}>
        {children}
      </div>
      <DragModal
        visible={showModal}
        title="指标详情"
        width={600}
        onCancel={() => setShowModal(false)}
        maskClosable
        footer={null}
      >
        <Descriptions column={1} bordered>
          <Descriptions.Item label="化验单名称">{curDocument.name}</Descriptions.Item>
          <Descriptions.Item label="样本来源">{curDocument.sampleFrom}</Descriptions.Item>
          <Descriptions.Item label="指标名称">{record.name}</Descriptions.Item>
          <Descriptions.Item label="指标缩写">{record.abbreviation}</Descriptions.Item>
          <Descriptions.Item label="参考值及单位">
            {record?.references.map((r, index: number) => (
              <ReferenceItem reference={r} key={index} />
            ))}
          </Descriptions.Item>
          <Descriptions.Item label="是否为常用指标">
            {record.common ? '是' : '否'}
          </Descriptions.Item>
        </Descriptions>
      </DragModal>
    </>
  );
};
export default ViewIndex;
