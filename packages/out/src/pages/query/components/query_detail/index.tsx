import React, { useState, useEffect } from 'react';
import { message, Table } from 'antd';
import * as api from '@/services/api';
import moment from 'moment';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import ImgViewer from '../img_viewer';
import QuestionDetail from '../Scale/QuestionDetail';
import styles from './index.scss';
import { isEmpty } from 'lodash';
import ImageList from 'xzl-web-shared/dist/components/CheckImages/ImageList';



interface IProps {
  children: React.ReactElement;
  row: {
    text: any;
    record: any;
    tree: any;
    resultKey: string;
    value: number,
    kp: string,
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


  const [hideCont, setHideCont] = useState(false);
  const [checkMeta, setCheckMeta] = useState<any>({});
  const [sid, setSid] = useState<any>();

  const queryResultDetail = (page: number) => {

    const pageSize = 10;
    api.patient_query.fetchQueryResultDetail(
      {
        sid: row.record.item.row_key,
        dataIndex: row.tree.dataIndex,
        actionLogId: row.resultKey,
        page: page,
        pageSize: pageSize,
      }).then((results) => {

      console.log('===================== results ', JSON.stringify(results));
      if (row.kp.includes('meta-jcd') || row.kp.includes('meta-other')) {

        setTitleHead(results?.resultKey);
        setSid(results?.sid);
        setCheckMeta((preCheckMeta: any[]) => {

          const data = preCheckMeta || [];
          return { ...data, ...results.meta };
        });
      } else {
        if (page == 0) {
          setTitleHead(results?.resultKey);
          const formatResult = results?.tableHead?.map((item: IColumns) => ({
            ...item,
            render: (text: any) => {
              return text?.source ? <QuestionDetail source={text.source}>
                  <span className={styles.look}>{text.value}</span>
                </QuestionDetail> : <span>
                  {text.type && text.type === 'timestamp' && moment(text.value ?? '').format('YYYY???MM???DD???') != 'Invalid date' ? moment(text.value ?? '').format('YYYY???MM???DD???') : (item?.kp == 'attach' ? {
                    'YANG': '???',
                    'YIN': '???',
                  }[text.value] ?? text.value : text.value ?? '')}
                </span>;
            },
          }));
          if (formatResult) {
            setColumn([...formatResult]);
          } else {
            setColumn([]);
          }
        }

        if (results?.tableBody && results?.tableBody?.length > 0) {

          setDataSource((preDataSource: any[]) => {

            const data = preDataSource || [];
            return [...data, ...results?.tableBody];
          });

          setImgList((preImageList: any[]) => {

            const preList = preImageList || [];
            const newList = results?.tableBody?.map((item: { image_url: string; }) => item?.image_url).filter((i: string) => !!i) || [];
            return [...preList, ...newList];
          });
        }
      }

      if (pageSize * (page + 1) < row.value) {
        // ???????????????
        queryResultDetail(page + 1);
      }
    }).catch((err: string) => {
      message.error(err ?? '');
    });
  };

  useEffect(() => {
    // ?????????0????????????
    if (showModal) {
      setDataSource([]);
      setImgList([]);
      setCheckMeta({});
      queryResultDetail(0); // ???????????????????????????????????????
    }
  }, [showModal]);

  return (
    <div>
      {
        // showModal && (
        <DragModal
          // wrapClassName="ant-modal-wrap-center"
          width="880px"
          visible={showModal}
          title={titleHead}
          onCancel={() => onCancel()}
          footer={null}
          wrapClassName={`${hideCont ? 'mode_hide' : 'ant-modal-wrap-center'}`}  // mode_block 
          mask={!hideCont}
          // width="1200px"
          // visible={showModal}
          // title={activeItem?.name || '??????'}
          // onCancel={() => setShowModal(false)}
          // footer={null}
          style={{ display: hideCont ? 'none' : 'block' }}
        >
          {
            isEmpty(checkMeta) ?
              <>
                {
                  imgList.length > 0 ? <ImgViewer info={imgList} /> :
                    <Table
                      columns={columns}
                      dataSource={dataSource}
                      bordered
                      rowKey={() => Math.random()}
                    />
                }
              </>
              :
              <ImageList
                data={checkMeta}
                handleHideCont={() => setHideCont(!hideCont)}
                refresh={() => { }}
                sid={sid}
              />
          }

        </DragModal>
        // )
      }
    </div>
  );
}
export default QueryDetail;
