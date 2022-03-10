import React, { FC, useState, useMemo } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import RichTextDiff from './RichTextDiff';
import styles from './index.scss';

interface ILogItem {
  browserName: string;
  businessType?: number; // 内容的类型
  copyWriting?: string; // 标题文案
  id: string;
  ip: string;
  newParams?: { content: any };
  oldParams: { content: any };
  operationReason?: string; // 操作原因
  operationTime: number;
  operationUniqueId: string;
  operatorName: string;
  operatorSid: string;
  osName: string;
  projectSid: string;
  type: number; // 操作类型 0新增 1修改 2删除
}

interface IProps {
  infoData: ILogItem;
}
/* businessType
* 文字string类型: 0,1,6
* 量表内容      : 7,12, 15, 19   |  21, 23, 25, 27
* 量表计划      : 8, 10,13, 16,18 , 20  |  22, 26
* 富文本        : 2, 9, 17,   |   28， 30, 29(删除是以链接形式)
* 其它      : 3, 4,5, 11, 14   |  24，
*/
const ContentDiff: FC<IProps> = (props) => {
  const { children, infoData } = props;
  const [showModal, setShowModal] = useState(false);

  const renderContent = useMemo(() => (contData: any) => {
    console.log(contData);
    switch (infoData.businessType) {
      case 0:
      case 1:
      case 6:
        return <div>{contData}</div>;
      case 2:
        return <RichTextDiff contData={contData} />;
      default:
        return <div>未知内容</div>;
    }
  }, [infoData]);
  const handleShow = () => {
    if (infoData.businessType && [28, 29, 30].includes(infoData.businessType)) {
      const aEl = document.getElementById('upload');
      if (aEl) {
        aEl.setAttribute('href', infoData.oldParams.content);
        aEl.click();
      }
    } else {
      setShowModal(true);
    }
  };
  return (
    <div>
      <span onClick={handleShow}>{children}</span>
      <a id="upload" style={{ display: 'none' }} target="_blank" >11</a>
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        className={styles.content_diff}
        width="1200px"
        visible={showModal}
        title={infoData.type === 2 ? '原内容' : '原内容 - 新内容'}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <div className='flex justify-between'>
          <div className={infoData.type === 2 ? styles.old_wrap_full : styles.old_wrap}>
            <div className={styles.diff_title}>原内容</div>
            <div>{renderContent(infoData.oldParams.content)}</div>
          </div>
          {
            infoData.type === 1 && infoData.newParams && (
              <div className={styles.new_wrap}>
                <div className={styles.diff_title}>新内容</div>
                <div>{renderContent(infoData.newParams.content)}</div>
              </div>
            )
          }
        </div>
      </DragModal>
    </div>
  );
};

export default ContentDiff;
