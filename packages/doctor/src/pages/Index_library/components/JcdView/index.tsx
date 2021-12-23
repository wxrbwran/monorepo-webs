import React, { FC, useState, useEffect } from 'react';
import { useSelector, useLocation } from 'umi';
import { Space, Button, Empty } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import * as api from '@/services/api';
import { documentMap, documentTypeSource } from 'xzl-web-shared/dist/utils/consts';
import CopyDocument from '../../components/CopyDocument';
import CompletionTemplate from './Completion/CompletionTemplate';
import RadioTemplate from './Radio/RadioTemplate';
import TextTemplate from './Text/TextTemplate';
import { isEmpty } from 'lodash';
import styles from './index.scss';

interface IProps {
  id: string;
  type: string
}

const JcdView: FC<IProps> = (props) => {
  const { id, type } = props;
  const { query: { src } } = useLocation();
  console.log('fdfdfdsss', location);

  const curDocument = useSelector((state: IState) => state.document.curDocument);
  const [completions, setCompletions] = useState<TIndexItem[]>([]);
  const [radioAndCheckboxs, setRadioAndCheckboxs] = useState<TIndexItem[]>([]);
  const [texts, setTexts] = useState<TIndexItem[]>([]);

  const getJcdTemplate = async () => {
    const res = await api.indexLibrary.fetchImageTemplate({ id });
    const data = res.list[0]?.data || [];
    // setQuestions(data);
    setCompletions(data.filter((datum: TIndexItem) => datum.question_type === 'COMPLETION'));
    setRadioAndCheckboxs(
      data.filter((datum: TIndexItem) => ['CHECKBOX', 'RADIO'].includes(datum.question_type as string)),
    );
    setTexts(data.filter((datum: TIndexItem) => ['TEXT'].includes(datum.question_type as string)));
  };

  useEffect(() => {
    getJcdTemplate();
  }, [id, type]);

  const onSuccess = () => {
    getJcdTemplate();
  };

  console.log('curDocument', curDocument);
  console.log('======32', src);
  const templateProps = {
    id,
    type,
    onSuccess,
    isShowEdit: src === 'ONESELF',
  };
  return (
    <div className={`w-full ${styles.topic_list}`}>
      <h2 className="font-bold text-base mr-20 mt-10 p-20">
        {curDocument.type && (
          <span className="inline-block mr-10">{`${documentMap[curDocument.type]}-${documentTypeSource[src]}-${
            curDocument.name
          }`}</span>
        )}
        <CopyDocument type={type} onSuccess={onSuccess} document={curDocument}>
          <Button icon={<CopyOutlined className="relative top-1" style={{ fontSize: '16px' }} />}>
            复制{documentMap[curDocument.type]}
          </Button>
        </CopyDocument>
      </h2>
      <Space direction="vertical" className="w-full px-20">
        {
          isEmpty(completions) && isEmpty(radioAndCheckboxs) && isEmpty(texts) && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }
        <CompletionTemplate { ...templateProps } questions={completions} />
        <RadioTemplate { ...templateProps } questions={radioAndCheckboxs} />
        <TextTemplate { ...templateProps } questions={texts} />
      </Space>
    </div>
  );
};

export default JcdView;
