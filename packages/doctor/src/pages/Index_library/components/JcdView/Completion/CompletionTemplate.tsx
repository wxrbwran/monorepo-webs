import React, { FC, useState, useEffect } from 'react';
import CompletionItem from './CompletionItem';
import TopicAddBtn from '@/components/CheckImgStructured/compontents/TopicAddBtn';
import { formatTempDdtk } from '@/components/CheckImgStructured/compontents/utils';

interface IProps {
  id: string;
  type: string;
  questions: TIndexItem[];
  onSuccess: () => void;
  isShowEdit: boolean;
}

const CompletionTemplate:FC<IProps> = (props) => {
  const { id, questions, onSuccess, isShowEdit } = props;
  const [ques, setQues] = useState<TIndexItem[][]>([]);
  useEffect(() => {
    setQues(formatTempDdtk(questions));
  }, [questions]);
  const editProps = {
    templateId: id,
    handleDelQuestion: onSuccess,
    handleSaveQuestion: onSuccess,
    isShowEdit,
    topicType: 'COMPLETION',
  };
  return (
    <div>
      <div className={ques?.length > 0 ? 'shadow p-10' : ''}>
        {ques.map((q, index) => (
          <CompletionItem groupQas={q} inx={index} key={q?.[0]?.uuid!}>
            <TopicAddBtn
              actionType="edit"
              initData={q}
              editGroupInx={index}
              {...editProps}
            />
          </CompletionItem>
        ))}
      </div>
      <TopicAddBtn
        {...editProps}
        actionType="add"
      />
    </div>
  );
};
export default CompletionTemplate;
