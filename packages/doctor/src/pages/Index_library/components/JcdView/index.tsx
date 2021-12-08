import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'umi';
import { Space } from 'antd';
import * as api from '@/services/api';
import { documentMap } from 'xzl-web-shared/src/utils/consts';
import CompletionTemplate from './Completion/CompletionTemplate';
import RadioTemplate from './Radio/RadioTemplate';
import TextTemplate from './Text/TextTemplate';

interface IProps {
  id: string;
  type: string
}

const JcdView: FC<IProps> = (props) => {
  const { id, type } = props;
  const curDocument = useSelector((state: IState) => state.document.curDocument);
  const [completions, setCompletions] = useState<TIndexItem[]>([]);
  const [radioAndCheckboxs, setRadioAndCheckboxs] = useState<TIndexItem[]>([]);
  const [texts, setTexts] = useState<TIndexItem[]>([]);

  const getJcdTemplate = async () => {
    const res = await api.indexLibrary.fetchImageTemplate({ id });
    const { data } = res.list[0];
    // setQuestions(data);
    setCompletions(data.filter((datum: TIndexItem) => datum.question_type === 'COMPLETION'));
    setRadioAndCheckboxs(
      data.filter((datum: TIndexItem) => ['CHECKBOX', 'RADIO'].includes(datum.question_type as string)),
    );
    setTexts(data.filter((datum: TIndexItem) => ['TEXT'].includes(datum.question_type as string)));

    console.log(radioAndCheckboxs);
    console.log(texts);

  };

  useEffect(() => {
    getJcdTemplate();
  }, [id, type]);

  const onSuccess = () => {
    getJcdTemplate();
  };

  return (
    <div className="w-full">
      <h2 className="font-bold text-base mr-20 mt-10 p-20">
        {curDocument.type && (
          <span>{`${documentMap[curDocument.type]}-系统添加-${curDocument.name}`}</span>
        )}
      </h2>
      <Space direction="vertical" className="w-full px-20">
        <CompletionTemplate id={id} type={type} onSuccess={onSuccess} questions={completions} />
        <RadioTemplate id={id} type={type} onSuccess={onSuccess} questions={radioAndCheckboxs} />
        <TextTemplate id={id} type={type} onSuccess={onSuccess} questions={texts} />
      </Space>
    </div>
  );
};

export default JcdView;
