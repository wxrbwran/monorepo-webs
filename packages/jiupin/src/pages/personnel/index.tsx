import React, { FC, useEffect } from 'react';
import SideMenu from './component/SideMenu';
import { useDispatch, useHistory } from 'umi';

const Personnel: FC = (props) => {
  const dispatch = useDispatch();
  const { children, location } = props;
  const history = useHistory();
  useEffect(() => {
    if (location.pathname === '/personnel') {
      dispatch({
        type: 'personnel/fetchRoleList',
        payload: {
          nsId: window.$storage.getItem('nsId'),
          state: 1,
        },
      });
      history.push('/personnel/org-structure');
    }
  }, [location]);
  // fetchRoleList
  return (
    <div className='flex h-full'>
      <SideMenu />
      {children}
    </div>
  );
};

export default Personnel;
