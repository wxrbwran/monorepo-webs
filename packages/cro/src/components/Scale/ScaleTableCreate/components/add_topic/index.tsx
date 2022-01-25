import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import dxt from '@/assets/img/follow-table/dxt.svg';
import wdt from '@/assets/img/follow-table/wdt.svg';
import zdsj from '@/assets/img/follow-table/zdsj.svg';
import CommonIssue from '@/components/CommonIssue';
import ManageIssue from '@/components/ManageIssue';
import * as api from '@/services/api';

interface IProps {
  handleAddQuestion: (addObj: object) => void;
  addPlans: Function;
  location: {
    query: {
      id: string;
      isTemp?: string;
      tempId?: string;
    },
    pathname: string,
  };
  scaleType: 'CRF' | 'SUBJECTIVE' | 'VISIT_CRF' | 'VISIT_SUBJECTIVE' | string;
}
interface IItem {
  question: {
    type: string;
  }
  title: string;
}
// 右侧添加题目ui
function AddTopic(props: IProps) {
  const { scaleType } = props;
  const [infos, setInfos] = useState([]);

  const questionType = [
    {
      type: 'RADIO',
      name: '选择题',
      img: dxt,
    },
    {
      type: 'TEXT',
      name: '问答题',
      img: wdt,
    },
  ];


  if (['SUBJECTIVE', 'CRF', 'VISIT_CRF', 'VISIT_SUBJECTIVE'].includes(scaleType)) {
    questionType.push({
      type: 'COMPLETION',
      name: '多段填空',
      img: zdsj,
    });
  } else {
    // questionType.push({
    //   type: 'END',
    //   name: '终点事件',
    //   img: zdsj
    // })
  }
  const checkboxData = {
    'type': 'RADIO',
    'detail': {
      'checkedArr': [],
      'stem': '',
      'required': true,
      'options': [
        {
          'content': '',
          'checked': false,
        },
        {
          'content': '',
          'checked': false,
        },
      ],
    },
  };
  const textData = {
    'type': 'TEXT',
    'detail': {
      'stem': '',
      'answer': '',
      'required': true,
    },
  };
  const endData = {
    'type': 'END',
    'detail': {
      'stem': '',
      'answer': '',
      'required': true,
    },
  };
  const ddtkData = {
    'type': 'COMPLETION',
    'detail': {
      'stem': '填空1「」，填空2「」',
      'answer': [],
      'content': [],
    },
  };

  const handleAddTm = (type: string) => {
    let addObj = {};
    console.log('type', type);
    switch (type) {
      case 'RADIO':
        addObj = checkboxData;
        break;
      case 'CHECKBOX':
        addObj = checkboxData;
        break;
      case 'TEXT':
        addObj = textData;
        break;
      case 'END':
        addObj = endData;
        break;
      case 'COMPLETION':
        addObj = ddtkData;
        break;
    }
    props.handleAddQuestion(addObj);
  };
  //获取常用题列表
  const fetchList = () => {
    api.subjective.getCommonQuestion().then((res) => {
      setInfos(res.infos);
    });
  };
  useEffect(() => {
    if (props.location.query.isTemp) {
      fetchList();
    }
  }, []);

  const updateInfo = () => {
    fetchList();
  };

  //使用常用题
  const addCommon = (question) => {
    //深拷贝
    let newObj = JSON.parse(JSON.stringify(question));
    props.handleAddQuestion(newObj);
  };
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
            );
          })
        }
      </div>
      {
        props.location.query.isTemp && (
          <>
            <div className="title" style={{ marginTop: 30 }}>我的常用题</div>
            {
              infos.length > 0 ?
                <div className="manage">
                  <ManageIssue infos={infos} updateInfo={updateInfo}><p>管理</p></ManageIssue>
                  <ul>
                    {
                      infos.map((item: IItem, index) => (
                        <li key={index} onClick={() => addCommon(item.question)}>{item.title}</li>
                      ))
                    }
                  </ul>
                </div>
                :
                <div className="send-plan">
                  <p>创建效率低？试试将问题设为常用题吧~</p>
                  <span>
                    <CommonIssue
                      updateInfo={updateInfo}
                    >
                      <span>立即添加</span>
                    </CommonIssue>
                  </span>
                </div>
            }
          </>
        )
      }

    </>
  );
}

export default AddTopic;
