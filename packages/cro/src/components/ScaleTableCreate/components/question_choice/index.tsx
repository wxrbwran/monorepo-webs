import React from 'react';
import { Input, Checkbox, Radio } from 'antd';
import delIcon from '@/assets/img/follow-table/delete-icon.svg';
import { RadioChangeEvent } from 'antd/lib/radio';
import { BorderOutlined, CloseOutlined } from '@ant-design/icons';
import { IQuestions } from '@/utils/consts';

interface IProps {
  questions: IQuestions[];
  changeQues: (newQues: IQuestions[]) => void;
  handleSaveStem: (e: React.ChangeEvent<HTMLInputElement>, quesIndex: number) => void;
  handleDelStem: (quesIndex: number) => void;
  setEditIndex: (inx: number) => void;
  quesIndex: number;
  editIndex: number;
  item: IQuestions;
  scaleType: string;
}
function QuestionChoice(props: IProps) {
  const {
    questions,
    changeQues,
    quesIndex,
    editIndex,
    item,
    handleSaveStem,
    handleDelStem,
    setEditIndex,
    scaleType,
  } = props;
  // 删除选项
  const handleDelOptions = (oIndex: number) => {
    const newOptions = questions[quesIndex].detail.options.filter(
      (quesItem: any, index: number) => {
        console.log(quesItem);
        return index !== oIndex;
      },
    );
    questions[quesIndex].detail.options = newOptions;
    changeQues([...questions]);
  };
  // 添加选项 index表示第几题
  const handleAddOptions = () => {
    // const newOptions = questions;
    questions[quesIndex].detail.options.push({
      content: '',
      checked: false,
    });
    changeQues([...questions]);
  };
  // 修改题型
  const handleChangeTx = (e: RadioChangeEvent) => {
    console.log(33, e.target.value);
    console.log(questions[quesIndex]);
    questions[quesIndex].type = e.target.value;
    changeQues([...questions]);
  };

  // 保存输入的选项   保存后不可再编辑，只能删除
  const handleSaveOption = (
    ev: React.FocusEvent<HTMLInputElement>,
    oIndex: number,
  ) => {
    const val = ev.target.value;
    if (val.trim()) {
      questions[quesIndex].detail.options[oIndex].content = val;
      changeQues([...questions]);
    }
  };
  const changeRequired = (e: any) => {
    questions[quesIndex].detail.required = e.target.checked;
    changeQues([...questions]);
  };
  const showInx = scaleType !== 'CRF';
  return (
    <div
      className={`topic-item ${editIndex === quesIndex ? 'edit' : ''}`}
      key={quesIndex}
      onClick={() => setEditIndex(quesIndex)}
    >
      <div
        className={['issue', !!item.detail.stem ? '' : 'input-empty', showInx ? '' : 'pl0'].join(
          ' ',
        )}
      >
        {showInx && <span className="issue__index">{quesIndex + 1}、</span>}
        <Input
          placeholder={`${showInx ? quesIndex + 1 + '、' : ''} 请输入问题`}
          value={item.detail.stem}
          onChange={(ev) => handleSaveStem(ev, quesIndex)}
        />
        <img className="issue__delete" src={delIcon} onClick={() => handleDelStem(quesIndex)} />
      </div>
      <div className="options-list">
        {item.detail.options.map((option, oIndex) => {
          if (!!option.content) {
            return (
              <div className="item input-empty" key={oIndex}>
                <Checkbox>{option.content}</Checkbox>
                <CloseOutlined onClick={() => handleDelOptions(oIndex)} />
              </div>
            );
          } else {
            return (
              <div className="item input-empty" key={oIndex}>
                <BorderOutlined />
                <Input
                  placeholder={`选项${oIndex + 1}`}
                  onBlur={(ev) => handleSaveOption(ev, oIndex)}
                />
                <CloseOutlined onClick={() => handleDelOptions(oIndex)} />
              </div>
            );
          }
        })}
      </div>
      <div className="choice-tx">
        <div className="add-options" onClick={() => handleAddOptions()}>
          +添加选项
        </div>
        <div>
          <Checkbox onChange={(e) => changeRequired(e)} checked={item.detail.required}>必填</Checkbox>
          <Radio.Group onChange={(e) => handleChangeTx(e)} defaultValue={item.type}>
            <Radio value="RADIO">单选</Radio>
            <Radio value="CHECKBOX">多选</Radio>
          </Radio.Group>
        </div>
      </div>
    </div>
  );
}

export default QuestionChoice;
