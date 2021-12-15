import React, { FC } from 'react';
import { Divider, Button } from 'antd';
import AddEditTextModal from './AddEditTextModal';
import TextItem from './TextItem';

interface IProps {
  id: string;
  type: string;
  questions: TIndexItem[];
  onSuccess: () => void;
}

const TextTemplate: FC<IProps> = (props) => {
  const { id, type, questions, onSuccess } = props;
  // components: { RadioItem },
  const getNextGroupNumber = () => {
    if (questions.length === 0) {
      return 0;
    } else {
      const numGroups: number[] = [];
      questions.forEach((c: TIndexItem) => {
        const [_, mid] = c?.group?.split('-') || [];
        numGroups.push(+mid);
      });
      const maxNumber = Math.max(...numGroups);
      return maxNumber + 1;
    }
  };

  // console.log("radio&checkbox questions", questions);
  return (
      <div>
        {questions.map((q: TIndexItem, index: number) => (
          <div key={index} className="mb-10">
            <TextItem item={q} index={index}>
              <AddEditTextModal
                mode="ALTER"
                onSuccess={onSuccess}
                position={getNextGroupNumber()}
                question={q}
                id={id}
                type={type}
              >
                <Button type="primary" ghost className="mx-10" size="small">编辑</Button>
              </AddEditTextModal>
            </TextItem>
          </div>
        ))}
        <Divider plain dashed>
          <AddEditTextModal
            mode="ADD"
            onSuccess={onSuccess}
            position={getNextGroupNumber()}
            id={id}
            type={type}
          >
            <Button type="link">添加新的问答题</Button>
          </AddEditTextModal>
        </Divider>
      </div>
  );
};
export default TextTemplate;
