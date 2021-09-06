import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import dxt from '@/assets/img/dxt.svg';
import wdt from '@/assets/img/wdt.svg';
import zdsj from '@/assets/img/zdsj.svg';

interface IProps {
  handleAddQuestion: (addObj: object) => void;
  location: {
    query: {
      id: string;
    },
    pathname: string,
  };
}
// 右侧添加题目ui
function AddTopic(props: IProps) {

  const questionType = [
    {
      type: 'RADIO',
      name: '选择题',
      img: dxt
    },
    {
      type: 'TEXT',
      name: '问答题',
      img: wdt
    },
    {
      type: 'COMPLETION',
      name: '多段填空',
      img: zdsj
    }
  ];
  const checkboxData = {
    "type": "RADIO",
    "detail": {
      "checkedArr": [],
      "stem": "",
      "options": [
        {
          "content": "",
          "checked": false
        },
        {
          "content": "",
          "checked": false
        },
      ]
    }
  };
  const textData = {
    "type": 'TEXT',
    "detail": {
      "stem": '',
      "answer": ''
    }
  };
  const endData = {
    "type": 'END',
    "detail": {
      "stem": '',
      "answer": ''
    }
  };
  const ddtkData = {
    "type": 'COMPLETION',
    "detail": {
      "stem": '填空1＿＿＿，填空2＿＿＿',
      "answer": []
    }
  };

  const handleAddTm = (type: string) => {
    let addObj = {}
    console.log('type',type);
    switch (type) {
      case 'RADIO':
        addObj = checkboxData;
        break;
      case 'CHECKBOX':
        addObj = checkboxData;
        break;
      case "TEXT":
        addObj = textData;
        break;
      case "END":
        addObj = endData;
        break;
      case "COMPLETION":
        addObj = ddtkData;
        break;
      default:
        addObj = {}
    }
    props.handleAddQuestion(addObj)
  }

  return (
    <>
      <div className="title">添加题目</div>
      <div className="add-topic">
        {
          questionType.map(item => {
            return (
              <div className="add-topic-item" key={item.type} onClick={() => handleAddTm(item.type)}>
                <div className="tit">
                  <img src={item.img} alt="" />{item.name}
                </div>
                <div className='plus'><PlusOutlined /></div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default AddTopic;
