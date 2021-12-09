import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import * as api from '@/services/api';
// import AlreadyReplyTable from '../components/already_reply_table';
import { useSelector } from 'umi';
import styles from './index.scss';
import { IState } from 'typings/global';
import moment from 'moment';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import ScaleTableDetailEcho from '@/components/ScaleTableDetailEcho';
import { IQuestions } from '@/utils/consts';
import { fetchRolePropValue } from 'xzl-web-shared/src/utils/role';
interface IProps {
  location: {
    query: {
      id: string;
    }
  };
}
function Reply({ location }: IProps) {
  const [dataSource, setDataSource] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [questions, setQuestions] = useState<IQuestions[]>([]);
  const [scaleName, setScaleName] = useState('');
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  useEffect(() => {
    api.subjective.getCrfScaleReplyList({
      scaleGroupId: location.query.id,
      projectNsId,
    }).then((res) => {
      if (res.crfScaleReplyList.length > 0) {
        setDataSource(res.crfScaleReplyList);
        setScaleName(res.scaleName);
      }
    });
  }, []);
  const handleShowDetail = (data: { result: IQuestions[] }) => {
    setQuestions(data.result);
    setShowModal(true);
  };
  const columns: any = [
    {
      title: '研究者姓名(角色)',
      dataIndex: 'doctorNameAndRoles',
      render: (text: any[]) => {
        // const type = window.$storage.getItem('croLabel');
        return text.map((item) => item.doctorName + '(' + (item.roleType?.split('.')[1] === 'aeJk0w' ? '暂未分配' : fetchRolePropValue(item.roleType, 'desc')) + ')').join(',');
      },
    },
    {
      title: '受试者',
      dataIndex: 'patientName',
    },
    {
      title: '发送时间',
      dataIndex: 'createdAt',
      render: (text: any, _record: any) => (
        <div>{moment(text).format('YYYY-MM-DD')}</div>
      ),
    },
    {
      title: '填写状态',
      dataIndex: 'status',
      render: (text: number, record: any) => {
        return (
          text === 1 ? '未填写' :
            <Button type="link" onClick={() => handleShowDetail(record)}>点击查看</Button>
        );
      },
    },

  ];
  return (
    <div className={styles.reply_wrap}>
      <div style={{ marginTop: 8 }}>
        <Table
          dataSource={dataSource}
          columns={columns}
        // pagination={false}
        />
      </div>
      <DragModal
        wrapClassName="ant-modal-wrap-center detail"
        width="800px"
        className={styles.detail}
        visible={showModal}
        title=''
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <ScaleTableDetailEcho scaleType="CRF" scaleName={scaleName} questions={questions} />
      </DragModal>
    </div>
  );
}
export default Reply;
