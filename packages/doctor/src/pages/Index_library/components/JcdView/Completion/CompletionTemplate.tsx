import React, { FC } from 'react';
import { Divider, Button } from 'antd';
import AddEditInputModal from './AddEditCompletion';
import CompletionItem from './CompletionItem';

interface IProps {
  id: string;
  type: string;
  questions: TIndexItem[];
  onSuccess: () => void;
}

const CompletionTemplate:FC<IProps> = (props) => {
  const { id, type, questions, onSuccess } = props;
  const getNextGroupNumber = () => {
    if (questions.length === 0) {
      return 0;
    } else {
      const numGroups: number[] = [];
      questions.forEach(c => {
        const [_start, mid, _] = c.group?.split('-') || [];
        // console.log("mid", mid);
        numGroups.push(+mid);
      });
      const maxNumber = Math.max(...numGroups);
      return maxNumber + 1;
    }
  };
  return (
    <div>
      {questions.map((q, index) => (
        <CompletionItem item={q} key={index}>
          <AddEditInputModal
            mode="ALTER"
            questions={questions.filter((filterQuestion) => {
              return (
                filterQuestion.group !== q.group &&
                filterQuestion.group?.includes(q.group as string)
              );
            })}
            title={q}
            id={id}
            type={type}
            position={getNextGroupNumber()}
            onSuccess={onSuccess}
          >
            <>
              <Button className="mx-10" type="primary" ghost size="small">
                编辑
              </Button>
            </>
          </AddEditInputModal>
        </CompletionItem>
      ))}
      <Divider plain dashed>
        <AddEditInputModal
          onSuccess={onSuccess}
          position={getNextGroupNumber()}
          id={id}
          type={type}
          mode="ADD"
        >
          <Button type="link">添加新的多段填空</Button>
        </AddEditInputModal>
      </Divider>
    </div>
  );
};
export default CompletionTemplate;
