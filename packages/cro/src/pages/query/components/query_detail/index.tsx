import React, { useState, useEffect } from 'react';
import { message, Table } from 'antd';
import * as api from '@/services/api';
import moment from 'moment';
import DragModal from 'xzl-web-shared/dist/src/components/DragModal';
import ImgViewer from '@/pages/report/components/img_viewer';
import QuestionDetail from '@/pages/subjective_table/components/question_detail';
import styles from './index.scss';



interface IProps {
  children: React.ReactElement;
  row: {
    text: any;
    record: any;
    tree: any;
    resultKey: string;
    value: number
  },
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
  const [imgList, setImgList] = useState<any[]>([]);

  const queryResultDetail = (page: number) => {

    const pageSize = 1;
    api.query.fetchQueryResultDetail(
      {
        sid: row.record.item.row_key,
        dataIndex: row.tree.dataIndex,
        actionLogId: row.resultKey,
        page: page,
        pageSize: pageSize,
      }).then((results) => {

      if (page == 0) {
        setTitleHead(results?.resultKey);
        const formatResult = results?.tableHead.map((item: IColumns) => ({
          ...item,
          render: (text: any) => {

            return text?.source ? <QuestionDetail source={text.source}>
                <span className={styles.look}>{text.value}</span>
              </QuestionDetail> : <span>
                {text.type && text.type === 'timestamp' ? moment(text.value).format('YYYY年MM月DD日 HH:mm') : text.value}
              </span>;
          },
        }));
        setColumn([...formatResult]);
      }

      if (results?.tableBody && results?.tableBody.length > 0) {

        setDataSource((preDataSource: any[]) => {

          const data = preDataSource || [];
          return [...data, ...results?.tableBody];
        });

        setImgList((preImageList: any[]) => {

          const preList = preImageList || [];
          const newList = results?.tableBody.map((item: { url: string; }) => item?.url).filter((i: string) => !!i) || [];
          return [...preList, ...newList];
        });
      }

      if (pageSize * (page + 1) < row.value) {
        // 查询下一页
        queryResultDetail(page + 1);
      }
    }).catch((err: string) => {
      message.error(err);
    });
  };

  useEffect(() => {
    // 开始从0查询结果
    if (showModal) {
      setDataSource([]);
      setImgList([]);
      queryResultDetail(0); // 循环查询结果知道没内容返回
    }
  }, [showModal]);



  return (
    <div>
      {
        showModal && (
          <DragModal
            wrapClassName="ant-modal-wrap-center"
            width="880px"
            visible={showModal}
            title={titleHead}
            onCancel={() => onCancel()}
            footer={null}
          >
            {
              imgList.length > 0 ? <ImgViewer info={imgList} /> :
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  bordered
                  rowKey={() => Math.random()}
                />
            }

          </DragModal>
        )
      }
    </div>
  );
}
export default QueryDetail;
