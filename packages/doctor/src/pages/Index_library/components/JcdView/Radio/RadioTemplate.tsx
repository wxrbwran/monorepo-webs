import React, { FC } from 'react';
import RadioItem from './RadioItem';
import TopicAddBtn from '@/components/CheckImgStructured/compontents/TopicAddBtn';

interface IProps {
  id: string;
  type: string;
  questions: TIndexItem[];
  onSuccess: () => void;
  isShowEdit: boolean;
}

const RadioTemplate: FC<IProps> = (props) => {
  const { id, questions, onSuccess, isShowEdit } = props;
  const editProps = {
    templateId: id,
    handleDelQuestion: onSuccess,
    handleSaveQuestion: onSuccess,
    isShowEdit: isShowEdit,
    topicType: 'RADIO',
  };
  return (
    <div>
      <div className="shadow p-10">
        {questions.map((c, index) => (
          <RadioItem item={c} index={index} key={index}>
            <TopicAddBtn
              actionType="edit"
              initData={c}
              editGroupInx={index}
              {...editProps}
            />
          </RadioItem>
        ))}
      </div>
      <TopicAddBtn
        {...editProps}
        actionType="add"
      />
    </div>
  );
};
export default RadioTemplate;
