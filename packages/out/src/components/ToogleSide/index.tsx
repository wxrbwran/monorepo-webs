import React, { useState } from 'react';
import './index.scss';
import { DoubleLeftOutlined, DoubleRightOutlined} from '@ant-design/icons';

interface IProps {
  children: React.ReactElement[]
}
function ToogleSide(props: IProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleOpenSide = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className='toogle-side'>
      <div
        className={['toogle-side__left', isOpen ? '' : 'close'].join(' ')}
      >
        <div onClick={handleOpenSide}>
          {
            isOpen ?
              <DoubleLeftOutlined className="mb-25 text-lg pr-10"/> :
              <DoubleRightOutlined className="mb-25 text-lg pr-10" />
          }
        </div>
        <div className="cont" style={{ width: isOpen ? '100%' : '0'}}>
          {props.children[0]}
        </div>
      </div>
      <div className="toogle-side__right">
        {props.children[1]}
      </div>
    </div>
  )
}

export default ToogleSide;
