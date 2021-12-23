import React, { FC } from 'react';
import TextItem from './TextItem';
import TopicAddBtn from '@/components/CheckImgStructured/compontents/TopicAddBtn';

interface IProps {
  id: string;
  type: string;
  questions: TIndexItem[];
  onSuccess: () => void;
  isShowEdit: boolean;
}

const TextTemplate: FC<IProps> = (props) => {
  const { id, questions, onSuccess, isShowEdit } = props;
  const editProps = {
    templateId: id,
    handleDelQuestion: onSuccess,
    handleSaveQuestion: onSuccess,
    isShowEdit: isShowEdit,
    topicType: 'TEXT',
  };
  // console.log("radio&checkbox questions", questions);
  return (
      <div>
        <div className="shadow p-10">
          {questions.map((q: TIndexItem, index: number) => (
            <div key={index} className="mb-10">
              <TextItem item={q} index={index}>
                <TopicAddBtn
                  actionType="edit"
                  initData={q}
                  editGroupInx={index}
                  {...editProps}
                />
              </TextItem>
            </div>
          ))}
        </div>
        <TopicAddBtn
          {...editProps}
          actionType="add"
        />
      </div>
  );
};
export default TextTemplate;
