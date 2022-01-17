import React, { FC, useState } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { Checkbox, Row, Col, message } from 'antd';
import styles from './index.scss';
import { Button } from 'antd';
import ListItem from '../../../ListItem';
import { IList } from '../../../../const';
import * as api from '@/services/api';
import { useSelector } from 'umi';
import { fileTypes } from '../../util';

export interface ContentListModel {
  title: string,
  lists: IList[],
  type: string,
}

export interface DoctorOrgsProp {

  show: boolean; // 选择机构的弹窗是否展示
  orgs: any[]; // 选择机构的数据源
  defaultChoiceOrg: any; // 默认选中的机构
}

interface IProps {

  type: 'crf' | 'education' | 'suifang';
  choicesContentList: any[];
  onSaveChoices: (choiceIds: IList[]) => void; // 选中的所有数据id,
  onDragModalDidShow: () => void; // 弹窗显示会调
}

const ChoiceContent: FC<IProps> = (props) => {
  const { children, onSaveChoices, type, onDragModalDidShow, choicesContentList } = props;
  const [showModal, setshowModal] = useState(false);
  const [contentList, setContentList] = useState<ContentListModel[]>([]);
  const currentOrgInfo = useSelector((state: IState) => state.user.currentOrgInfo);

  const [choices, setChoices] = useState<IList[]>([]);



  // 查询随访表列表
  const getPublicizeScaleList = (scaleType: number) => {
    api.education.getPublicizeScale({
      operatorSid: window.$storage.getItem('sid'),
      operatorWcId: window.$storage.getItem('wcId'),
      ownershipSid: currentOrgInfo.sid,
      roleType: window.$storage.getItem('roleId'),
      type: scaleType, //0：随访表 1：CRF量表
    }).then((res) => {

      const list: any[] = [];
      const fileType = fileTypes.filter((file) => {
        if (scaleType == 0) {
          return file.type == 'accompany';
        } else {
          return file.type == 'crf';
        }
      })[0];
      const unChoicesList = res.list.filter(p => !choicesContentList.find((item) => item.id == p.id));
      if (unChoicesList.length > 0) {
        list.push({
          title: fileType.name,
          lists: unChoicesList.map((item) => {
            return ({
              ...item,
              extraFileType: { ...fileType },
            });
          }),
          ...fileType,
        });
      }
      setContentList(list);
    })
      .catch((err: string) => {
        message.error(err?.result);
      });
  };


  // 查询随访表列表
  const getPublicizeList = () => {
    api.education.getPublicizeList({
      // fromSid: window.$storage.getItem('orgSid'),
      types: ['DOCUMENT', 'VIDEO', 'ARTICLE', 'AUDIO', 'PICTURE'],
      operatorSid: window.$storage.getItem('sid'),
      operatorWcId: window.$storage.getItem('wcId'),
      ownershipSid: currentOrgInfo.sid,
      roleType: window.$storage.getItem('roleId'),
    }).then((res) => {

      const list: any[] = [];
      fileTypes.forEach((fileType: any) => {

        const unChoicesList = res.list.filter(p => !choicesContentList.find((item) => item.id == p.id));
        if (unChoicesList.filter(p => p.type === fileType.code).length > 0) {
          list.push({
            title: fileType.name,
            lists: unChoicesList.filter(p => p.type === fileType.code).map((item) => {
              return ({
                ...item,
                extraFileType: { ...fileType },
              });
            }),
            ...fileType,
          });
        }
      });
      setContentList(list);
    })
      .catch((err: string) => {
        message.error(err?.result);
      });
  };

  const getContentListSources = () => {

    console.log('===============getContentListSources getContentListSources ');
    if (type == 'education') {
      getPublicizeList();
    } else if (type == 'suifang') {
      getPublicizeScaleList(0);
    } else {
      getPublicizeScaleList(1);
    }
  };

  const handleShowModal = () => {

    // 每次弹窗重新弹出时, 清空选中的数据源
    setChoices([]);
    setshowModal(true);
    onDragModalDidShow();
    // 请求接口
    getContentListSources();
  };

  const onChange = (val) => {

    const source = contentList.flatMap((model) => model.lists).filter((item) => val.includes(item.id));
    setChoices(source);
  };

  // 点击取消
  const onCancelChoices = () => {

    setshowModal(false);
  };

  const checkBoxDom = (item: ContentListModel) => (
    <>
      {
        !!item.lists.length && (
          <>
            <p className='font-bold mb-15 text-base'>{`·${item.title}`}</p>
            <Row wrap>
              {
                item.lists.map(i => (
                  <Col className="mr-40 mb-30" key={i.id}>
                    <Checkbox value={i.id}>
                      <ListItem type={item.type} item={i} />
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
    <div>
      <div onClick={handleShowModal}>{children}</div>
      <DragModal
        wrapClassName="ant-modal-wrap-center cancel_text_blue"
        width={1000}
        maskClosable
        visible={showModal}
        onCancel={() => setshowModal(false)}
        title={'选择发送内容'}
        footer={null}
        destroyOnClose
      >
        <div className={styles.choice_doctor}>
          {
            <Checkbox.Group onChange={onChange} >
              {
                contentList?.length > 0 &&
                contentList.map((item) => (checkBoxDom(item)))
              }
            </Checkbox.Group>
          }
          <div className='flex flex-row justify-center'>
            <Button className="w-98 mt-20 mb-0 mr-20" type="primary" onClick={onCancelChoices}>取消</Button>
            <Button className="w-98 mt-20 mb-0 " type="primary" onClick={() => { setshowModal(false); onSaveChoices(choices); }}>完成</Button>
          </div>

        </div>
      </DragModal>
    </div>
  );
};

export default ChoiceContent;
