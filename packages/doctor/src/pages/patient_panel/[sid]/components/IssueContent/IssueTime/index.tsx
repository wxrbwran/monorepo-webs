import React from 'react';
import dayjs from 'dayjs';

interface IProps {
  time: number;
}
function IssueTime({ time }: IProps) {
  return (
    <div className="confirm_date">{dayjs(time).format('YYYY-MM-DD HH:mm')}</div>
  );
}
export default IssueTime;
