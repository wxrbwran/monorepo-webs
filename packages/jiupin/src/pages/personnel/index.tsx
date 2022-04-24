import React, { FC, useEffect } from 'react';
import SideMenu from './component/SideMenu';
import { useDispatch, useHistory } from 'umi';

const Personnel: FC = (props) => {
  const dispatch = useDispatch();
  console.log(12111, props);
  const { children } = props;
  const history = useHistory();
  useEffect(() => {
    dispatch({
      type: 'personnel/fetchRoleList',
      payload: {
        nsId: window.$storage.getItem('nsId'),
        state: 1,
      },
    });
    history.push('/personnel/org-structure');
  }, []);
  // fetchRoleList
  return (
    <div className='flex h-full'>
      <SideMenu />
      {children}
    </div>
  );
};

export default Personnel;
