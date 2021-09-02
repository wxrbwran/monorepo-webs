import React, { FC, useState } from 'react';
import { Tooltip, Input, message } from 'antd';
import * as api from '@/services/api';

interface IProps {
  data: {note: string, sid: string, name: string, remark: string};
  note: string;
  refreshList: () => void;
}
const Note: FC<IProps> = ({ note, data, refreshList }) => {
  const [editNote, setEditNote] = useState(note);
  const [isEdit, setIsEdit] = useState(false);

  const handleEditNote = () => {
    setIsEdit(true);
  };
  const onChangeNote = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditNote(e.target.value);
  };
  const endEditNote = () => {
    console.log(data, editNote);
    setIsEdit(false);
    if (data.remark !== editNote) {
      api.base.patchRemarkInfo({
        memberSid: data.sid,
        remark: editNote,
      }).then(() => {
        message.success('编辑成功！');
        refreshList();
      });
    }
  };
  return (
    <div onClick={handleEditNote}>
      {isEdit
        ? (
          <div className="note-edit">
            <Input
              autoFocus
              defaultValue={note}
              onChange={onChangeNote}
              onBlur={endEditNote}
              onPressEnter={endEditNote}
              maxLength={15}
            />
          </div>
        )
        : (
          <Tooltip title={note}>
            <span>{note || '无'}</span>
          </Tooltip>
        )}
    </div>
  );
};

export default Note;
