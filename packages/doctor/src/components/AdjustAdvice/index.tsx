import React, { useState } from 'react';
import { Input } from 'antd';
import { AdviceTitle } from '@/utils/tools';

interface IProps {
  isInput: boolean;
  handleChangeNote: (val: string) => void;
  width?: string;
}
function AdjustAdvice({ isInput, handleChangeNote, width } : IProps) {
  const roleId = window.$storage.getItem('roleId') || '';
  const [note, setNote] = useState();
  const changeNote = (e: any) => {
    setNote(e.target.value);
    handleChangeNote(e.target.value);
  };
  return (
    <div style={{ width: width || 550, margin: '0 auto 30px' }}>
      <h3>
        { AdviceTitle[roleId] }
      </h3>
      {
        isInput ? (
          <Input.TextArea
            value={note}
            autoSize={{ minRows: 1, maxRows: 3 }}
            onChange={changeNote}
          />
        ) : (
          <div>{note || '无'}</div>
        )
      }
    </div>
  );
}

export default AdjustAdvice;
