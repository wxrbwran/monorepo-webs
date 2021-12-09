import React, { FC } from 'react';
import { Button, Divider } from 'antd';
import AddEditRadioModal from './AddEditRadioModal';
import RadioItem from './RadioItem';

interface IProps {
  id: string;
  type: string;
  questions: TIndexItem[];
  onSuccess: () => void;
}

const RadioTemplate: FC<IProps> = (props) => {
  // props: ["id", "type", 'onSuccess', 'questions'],
  const { id, questions, onSuccess } = props;

  const getNextGroupNumber = () => {
    if (questions.length === 0) {
      return 0;
    } else {
      const numGroups: number[] = [];
      questions.forEach((c) => {
        const [_start, mid, _] = c.group?.split('-') || [];
        // console.log("mid", mid);
        numGroups.push(+(mid || 0));
      });
      const maxNumber = Math.max(...numGroups);
      return maxNumber + 1;
    }
  };
  // console.log("radio&checkbox questions", questions);
  return (
    <div>
      {questions.map((c, index) => (
        <RadioItem item={c} index={index} key={index}>
          <AddEditRadioModal
            mode="ALTER"
            onSuccess={onSuccess}
            title={c}
            questions={questions.filter((filterQuestion) => {
              return (
                filterQuestion.group !== c.group &&
                filterQuestion.group?.includes(c.group as string)
              );
            })}
            position={getNextGroupNumber()}
            id={id}
          >
            <Button className="mx-10" type="primary" ghost size="small">
              编辑
            </Button>
          </AddEditRadioModal>
        </RadioItem>
      ))}
      <Divider plain dashed>
        <AddEditRadioModal
          mode="ADD"
          onSuccess={onSuccess}
          position={getNextGroupNumber()}
          id={id}
        >
          <Button type="link">添加新的选择题</Button>
        </AddEditRadioModal>
      </Divider>
    </div>
  );
};
export default RadioTemplate;
