import React from 'react';

interface IProps {
  toast: string;
}
// 提示Toast
function ToastText({ toast }: IProps) {
  return (
    <>
      {
        !!toast && (
          <div className="toast">
            {toast}
          </div>
        )
      }
    </>
  );
}
export default ToastText;
