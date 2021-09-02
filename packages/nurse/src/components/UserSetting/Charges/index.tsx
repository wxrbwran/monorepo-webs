import React, { useState } from 'react';
import ChargesCard from './ChargesCard';
import ChargesEdit from './ChargesEdit';

interface IProps {
  onClose: () => void;
}
function Charges(props: IProps) {
  const [isEdit, setIsEdit] = useState(false);
  const toggleEdit = () => {
    if (isEdit) {
      // 调用保存修改收费接口
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  };
  return (
    <div>
      {
        isEdit
          ? <ChargesEdit
              {...props}
              toggleEdit={toggleEdit}
          />
          : <ChargesCard
              {...props}
              toggleEdit={toggleEdit}
          />
      }
    </div>
  );
}

export default Charges;
