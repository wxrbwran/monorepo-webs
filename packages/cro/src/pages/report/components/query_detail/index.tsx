import React, { useState, useEffect } from 'react';
import { message, Table } from 'antd';
import * as api from '@/services/api';
import moment from 'moment';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import ImgViewer from '../img_viewer';
import QuestionDetail from '../../../subjective_table/components/question_detail';
import styles from './index.scss';

interface IProps {
  children: React.ReactElement;
  row: {
    kp: string;
    source: string[];
  };
  onCancel: () => void;
  showModal: boolean;
}
interface IColumns {
  title: string;
  dataIndex: string;
  children: [];
}
function QueryDetail({ row, showModal, onCancel }: IProps) {
  const [dataSource, setDataSource] = useState<any>([]);
  const [columns, setColumn] = useState<IColumns[]>([]);
  const [titleHead, setTitleHead] = useState('');
  const [imgList, setImgList] = useState([]);

  useEffect(() => {
    if (showModal) {
      api.query
        .fetchQueryDetail({ kp: row.kp, ids: row.source })
        .then((res) => {
          const results = res?.results;
          if (results.length > 0) {
            setTitleHead(results[0]?.titleHead);
            setDataSource(results[1]?.cells);
            setImgList(
              results[1]?.cells
                .map((item: { url: string }) => item?.url)
                .filter((i: string) => !!i),
            );
            const formatResult = results[1]?.columns.map((item: IColumns) => ({
              ...item,
              render: (text: any, _record: IColumns) => {
                return text?.source ? (
                  <QuestionDetail source={text.source}>
                    <span className={styles.look}>{text.value}</span>
                  </QuestionDetail>
                ) : (
                  <span>
                    {text.type && text.type === 'timestamp'
                      ? moment(text.value).format('YYYY年MM月DD日 HH:mm')
                      : text.value}
                  </span>
                );
              },
            }));
            setColumn([...formatResult]);
          }
        })
        .catch((err: string) => {
          message.error(err);
        });
    }
  }, [showModal]);

  return (
    <div>
      {showModal && (
        <DragModal
          wrapClassName="ant-modal-wrap-center"
          width="880px"
          visible={showModal}
          title={titleHead}
          onCancel={() => onCancel()}
          footer={null}
        >
          {imgList.length > 0 ? (
            <ImgViewer info={imgList} />
          ) : (
            <Table
              columns={columns}
              dataSource={dataSource}
              bordered
              rowKey={(_record) => Math.random()}
            />
          )}
        </DragModal>
      )}
    </div>
  );
}
export default QueryDetail;
