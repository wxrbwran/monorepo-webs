import React, { useState, useEffect } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import { btnRender } from '@/utils/button';
import CustomChoice from '../custom_choice';
import { Table, Select, Checkbox } from 'antd';
import { IQuestions } from '@/utils/consts';
import './index.scss';

const Option = Select.Option;

interface IProps {
  questions: IQuestions[];
  changeQues: (newQues: IQuestions[]) => void;
  quesIndex: number;
  item: IQuestions;
  children: React.ReactElement;
  handSaveDdtkModify: () => void;
}
interface IData {
  key: number;
  name: string;
}
const AddPatient = (props: IProps) => {
  const { questions, changeQues, quesIndex, item, children, handSaveDdtkModify } = props;
  console.log('questions', questions, item);
  const [showModal, setShowModal] = useState(false);
  const [dataSource, setDataSource] = useState<IData[]>([]);
  const [currentStem, setCurrentStem] = useState('');

  const [questionJson, setQuestionJson] = useState<any>([]);
  const [typeArr, setTypeArr] = useState<string[]>([]);

  useEffect(() => {
    console.log('questionJson', questionJson);
  }, [questionJson]);

  useEffect(() => {
    if (showModal){
      let stemArr = [];
      if (typeof(item.detail.stem) === 'string'){
        stemArr = item.detail.stem?.split('＿＿＿');
        setCurrentStem(item.detail.stem);
      } else {
        stemArr = [...item.detail.stem];
        setCurrentStem(item.detail.stem.join('＿＿＿'));
      }
      // 去掉最后一个元素
      stemArr.pop();

      stemArr.forEach((_item: string, idx: number) => {
        dataSource[idx] = {
          key: idx,
          name: `填空${idx + 1}`,
        };
        if (questions[quesIndex].detail.content[idx]?.type){
          questions[quesIndex].detail.content[idx] = {
            ...questions[quesIndex].detail.content[idx],
          };
        } else {
          questions[quesIndex].detail.content[idx] = {
            type: 'text',
            required: true,
          };
        }
      });
      setDataSource([...dataSource]);
      changeQues([...questions]);
    }
  }, [showModal]);

  const questionChoice = [
    {
      type: 'text',
      value: '填空题',
    },
    {
      type: 'radio',
      value: '单选题',
    },
    {
      type: 'checkbox',
      value: '多选题',
    },
    {
      type: 'date',
      value: '日期',
    },
  ];

  const elements = (type: string) => {
    switch (type) {
      case 'date':
        return {
          name: '',
          type: 'text',
          inputType: 'date',
          title: '',
          isRequired: true,
          startWithNewLine: false,
          titleLocation: 'left',
        };
      default:
        return {
          name: '',
          type: 'text',
          title: '',
          isRequired: true,
          startWithNewLine: false,
          titleLocation: 'left',
        };
    }
  };

  const changeQuestionType = (value: string, record: any) => {
    console.log('record', record);
    questionJson[record.key] = { ...elements(value) };
    questionJson[record.key].name = `${record.name}:`;
    questionJson[record.key].title = `${record.name}:`;
    typeArr[record.key] = value;
    setQuestionJson([...questionJson]);
    setTypeArr([...typeArr]);

    if (['radio', 'checkbox'].includes(value)){
      questions[quesIndex].detail.content[record.key] = {
        ...questions[quesIndex].detail.content[record.key],
        type: value,
        checkedArr: [],
        options: [
          {
            content: '',
            checked: false,
          },
          {
            content: '',
            checked: false,
          },
        ],
      };
    } else {
      questions[quesIndex].detail.content[record.key] = {
        type: value,
        required: questions[quesIndex].detail.content[record.key].required,
      };
    }
    changeQues([...questions]);
  };

  const questionType = (record: any) => {
    // console.log('--------999999', questions[quesIndex].detail.content[record.key].type);
    return (
      <Select
        style={{ width: 160 }}
        onChange={(value: string) => changeQuestionType(value, record)}
        // defaultValue='text'
        defaultValue={questions[quesIndex].detail.content[record.key].type}
      >
        {questionChoice.map((ques) => (
          <Option key={ques.type} value={ques.type}>
            {ques.value}
          </Option>
        ))}
      </Select>
    );
  };

  const questionContent = (record: any) => {
    // console.log('record', record.key, questions);
    switch (questions[quesIndex].detail.content[record.key].type) {
      case 'date':
        return '由答题者选择年月日';
      case 'radio':
      case 'checkbox':
        return <CustomChoice
          questions={questions}
          changeQues={changeQues}
          quesIndex={quesIndex}
          item={item}
          optionIdx = {record.key}
        />;
      default:
        return '由答题者随便填写';
    }
  };

  const changeRequired = (e: any, record: any) => {
    questions[quesIndex].detail.content[record.key].required = e.target.checked;
    changeQues([...questions]);
  };

  const handleSubmitModal = () => {
    setShowModal(false);
    handSaveDdtkModify();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // const dataSource = [
  //   {
  //     key: 0,
  //     name: '姓名',
  //     // type: 32,
  //     // content: '西湖区湖底公园1号',
  //     // required: true
  //   },
  //   {
  //     key: 1,
  //     name: '生出日期',
  //     // type: 32,
  //     // content: '西湖区湖底公园1号',
  //     // required: true
  //   },
  //   // {
  //   //   key: '3',
  //   //   name: '胡彦斌',
  //   //   type: 32,
  //   //   content: '西湖区湖底公园1号',
  //   //   required: true
  //   // },
  //   // {
  //   //   key: '4',
  //   //   name: '胡彦祖',
  //   //   type: 32,
  //   //   content: '西湖区湖底公园1号',
  //   //   required: true
  //   // },
  // ];

  const columns = [
    {
      title: '填空',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '题型',
      dataIndex: 'type',
      key: 'type',
      render: (_text: any, record: any) => <div>{questionType(record)}</div>,
    },
    {
      title: '填空内容',
      dataIndex: 'content',
      key: 'content',
      width: 435,
      render: (_text: any, record: any) => <div>{questionContent(record)}</div>,
    },
    {
      title: '必填',
      dataIndex: 'required',
      key: 'required',
      render: (_text: any, record: any) => (
        <Checkbox onChange={
          (e) => changeRequired(e, record)}
          defaultChecked={questions[quesIndex].detail.content[record.key].required}
        />
      ),
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
      >
        <p className="text-base mb-10">
          当前题目: {currentStem}
        </p>
        <Table dataSource={dataSource} columns={columns} bordered pagination={false} className="mb-20"/>
        {btnRender({
          okText: '确定',
          cancelText: '取消',
          onOk: handleSubmitModal,
          onCancel: handleCloseModal,
        })}
      </DragModal>
    </>
  );
};
export default AddPatient;
