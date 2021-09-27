import React, { useState, useEffect } from 'react';
import { Checkbox, Row, Col, Radio } from 'antd';
import { history, useDispatch, useSelector } from 'umi';
import type { IList } from '../../const';
import ListItem from '../ListItem';
import * as api from '@/services/api';
import tip from '@/assets/img/suifang/tip.svg';
import { WarningFilled } from '@ant-design/icons';
import styles from './index.scss';

interface IProps {
  location: {
    pathname: string;
  };
  changeContent: (checked: string) => void;
  defaultChecked: string;
}
function SendContent({ location, changeContent, defaultChecked }: IProps) {
  const dispatch = useDispatch();
  const isScale = location.pathname.includes('scale');
  const [pubList, setPubList] = useState<IList[]>([]);
  const [scaleList, setScaleList] = useState<IList[]>([]);
  const currentOrgInfo = useSelector((state: IState) => state.education.currentOrgInfo);

  // 查询视频、文件列表
  const getPublicizeList = () => {
    api.education.getPublicizeList({
      // fromSid: window.$storage.getItem('orgSid'),
      types: ['DOCUMENT', 'VIDEO', 'ARTICLE', 'AUDIO', 'PICTURE'],
      operatorSid: window.$storage.getItem('sid'),
      operatorWcId: window.$storage.getItem('wcId'),
      ownershipSid: currentOrgInfo.sid,
      roleType: window.$storage.getItem('roleId'),
    }).then((res) => {
      setPubList(res.list);
      dispatch({
        type: 'education/saveSendContent',
        payload: [...res.list],
      });
    })
      .catch((err: string) => {
        console.log('err', err);
      });
  };
  // 查询随访表列表
  const getPublicizeScaleList = () => {
    api.education.getPublicizeScale({
      operatorSid: window.$storage.getItem('sid'),
      operatorWcId: window.$storage.getItem('wcId'),
      ownershipSid: currentOrgInfo.sid,
      roleType: window.$storage.getItem('roleId'),
    }).then((res) => {
      setScaleList(res.list);
      dispatch({
        type: 'education/saveSendContent',
        payload: [...res.list],
      });
    })
      .catch((err: string) => {
        message.error(err?.result);
      });
  };

  useEffect(() => {
    if (isScale){
      getPublicizeScaleList();
    } else {
      getPublicizeList();
    }
  }, []);

  const onChange = (e: any) => {
    console.log('checkedValues', isScale ? e.target.value : e);
    changeContent(isScale ? e.target.value : e.join());
  };

  const fileType = [
    {
      name: '视频',
      code: 1,
      type: 'video',
    }, {
      name: '文件',
      code: 2,
      type: 'document',
    }, {
      name: '文章',
      code: 3,
      type: 'article',
    }, {
      name: '图片',
      code: 4,
      type: 'picture',
    }, {
      name: '音频',
      code: 6,
      type:'audio',
    },
  ];

  const checkBoxDom = (item: { name: string, type: string, code: number }) => (
    <>
      {
        !!pubList.filter(p => p.type === item.code).length && (
          <>
            <p className='font-bold mb-15'>{`·${ item.name}`}</p>
            <Row wrap>
              {
                pubList.filter(p => p.type === item.code).map(i => (
                  <Col className="mr-40 mb-30" key={i.id}>
                    <Checkbox value={i.id}>
                      <ListItem type={item.type} item={i}/>
                    </Checkbox>
                  </Col>
                ))
              }
            </Row>
          </>
        )
      }
    </>
  );

  return (
    <div className={styles.send_content}>
      <p className='mb-30'>
        <img src={tip} alt="" className='mr-5 align-baseline'/>
        提示：如果你没有找到想发送的文件，
        <span
          onClick={() => history.replace('/publicize/files')}
          className={`${styles.link} cursor-pointer mr-50`}
        >
          请点击这里创建
        </span>
        <WarningFilled style={{ color: '#FF7664' }} /> 注意: 创建发送计划后随访表将不可修改或删除
      </p>
      {/* <p className="text-center relative -top-54">
        <WarningFilled style={{color: '#FF7664'}} /> 注意: 创建发送计划后随访表将不可修改或删除
      </p> */}
      {
        isScale ? (
          <>
          {
            !!scaleList.length && (
              <>
                <p className='font-bold mb-15'>· 随访表</p>
                <Radio.Group onChange={onChange} defaultValue={defaultChecked}>
                  <Row wrap>
                    {
                      scaleList.map(item => (
                        <Col className="mr-40 mb-30 flex justify-center" key={item.id}>
                          <Radio value={item.id}>
                            <ListItem type='accompany' item={item}/>
                          </Radio>
                        </Col>
                      ))
                    }
                  </Row>
                </Radio.Group>
              </>
            )
          }
          </>
        ) : (
          <Checkbox.Group onChange={onChange} defaultValue={defaultChecked.split(',')}>
            {
              fileType.map((item)=>(checkBoxDom(item)))
            }
          </Checkbox.Group>
        )
      }
    </div>
  );
}

export default SendContent;
