import React, { FC, useState, useEffect } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { btnRender } from '@/utils/button';
import { DdtkSeniorInlineType } from '../utils';
import EditDdtkTypeChoice from './EditDdtkTypeChoice';
import { Table, Select } from 'antd';
import { IQaItem } from '../type';
import { cloneDeep } from 'lodash';


interface IProps {
  qas: IQaItem[];
  onSuccess:(data: any[]) => void;
}
const { Option } = Select;
const EditDdtkType: FC<IProps> = (props) => {
  const { children, qas, onSuccess } = props;
  const [showModal, setShowModal] = useState(false);
  const [dataSource, setDataSource] = useState<IQaItem[]>(cloneDeep(qas));
  useEffect(() => {
    setDataSource(qas);
  }, [qas]);
  const handleSubmitModal = () => {
    console.log('======qas', qas);
    console.log('======dataSource', dataSource);
    setShowModal(false);
    onSuccess(dataSource);
  };
  const handleType = (val: string, index: number) => {
    dataSource[index].question_type = val;
    if (['INLINE_RADIO', 'INLINE_CHECKBOX'].includes(val)) {
      if (!dataSource[index].options) {
        dataSource[index].options = ['', ''];
      }
    } else {
      delete dataSource[index].options;
    }
    setDataSource(dataSource);
  };
  const changeQues = (data: IQaItem, inx: number) => {
    dataSource[inx].options = data.options;
    setDataSource(cloneDeep(dataSource));
  };
  const questionContent = (record: IQaItem, index: number) => {
    switch (record.question_type) {
      case 'INLINE_DATE':
        return '由答题者选择年月日';
      case 'INLINE_RADIO':
      case 'INLINE_CHECKBOX':
        return <EditDdtkTypeChoice changeQues={changeQues} data={record} inx={index} />;
      default:
        return '由答题者随便填写';
    }
  };
  const columns = [
    {
      title: '填空',
      render: (text, record, index: number) => <div>{`填空${index + 1}`}</div>,
    },
    {
      title: '题型',
      render: (_text: string, record: IQaItem, index: number) => {
        return (
          <Select
            style={{ width: 160 }}
            onChange={(value: string) => handleType(value, index)}
            defaultValue={record.question_type}
          >
            {Object.keys(DdtkSeniorInlineType).map((type) => (
              <Option key={type} value={type}>
                {DdtkSeniorInlineType[type]}
              </Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: '填空内容',
      dataIndex: 'question_type',
      key: 'question_type',
      width: 435,
      render: (_text: string, record: IQaItem, index: number) => <div> {questionContent(record, index)} </div>,
    },
  ];
  return (
    <>
      <span onClick={() => setShowModal(true)}>{children}</span>
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        width={1200}
        visible={showModal}
        title="修改填空类型"
        onCancel={() => setShowModal(false)}
        footer={null}
        className="topic-list"
        destroyOnClose
        zIndex={1012}
      >
        <p className="text-base mb-10">
          <span>当前题目: </span>
            {
              qas.map((item, inx: number) => (
                <span key={item.question + inx}>
                  <span>{item.question}</span>
                  {
                    inx + 1 !== qas.length && <span>「填空{inx + 1}」</span>
                  }
                </span>
              ))
            }
        </p>
        <Table dataSource={dataSource.slice(0, qas.length - 1)} columns={columns} bordered pagination={false} className="mb-20" />
        {btnRender({
          okText: '确定',
          cancelText: '取消',
          onOk: handleSubmitModal,
          onCancel: () => setShowModal(false),
        })}
      </DragModal>
    </>
  );
};

export default EditDdtkType;
// 最后一个元素，后面不显示填空位
// console.log('fdfd'.split('「」'))    // ['fdfd']
// console.log('fdfd「」'.split('「」'))  //['fdfd', '']
// console.log('fdfd「」ff'.split('「」'))  //['fdfd', 'ff']
// console.log('fdfd「」「」'.split('「」')) // ['fdfd', '', '']
