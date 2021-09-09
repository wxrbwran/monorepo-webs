import React, { useEffect } from 'react';
import { useSelector, useDispatch, useStore } from 'umi';
import NavBar from '@/components/NavBar';
import ImWindow from '@/components/ImWindow';
import '@/im_staffs/actions/rtcSupport';
import styles from './index.scss';

interface IProps {
  children: React.ReactElement;
  location: Location;
}

function SecurityLayout({ children, location }: IProps) {
  const excludeRouter = ['patient_panel', 'login', 'find_pwd', 'index_library']; // 不显示导航的页面
  const pathname = location.pathname.split('/')[1];
  console.log('location.pathname', location.pathname);
  // 初始化im-s
  const connected = useSelector((state: IState) => state.im.connected);
  const store = useStore();
  window.$store = window.$store || store;
  const dispatch = useDispatch();
  useEffect(() => {
    // delReadMsg
    /* eslint-disable */
    if (!connected) {
      new Promise((resolve, reject) => {
        dispatch({
          type: 'im/initNIMSDK',
          payload: { resolve },
        });
      }).then((val) => {
        // console.log(val);
      });
    }
  }, []);
   // 初始化im-e
  return (
    <div className={styles.app}>
      <>
        {!excludeRouter.includes(pathname) && <NavBar />}
        {children}
        <ImWindow />
      </>
    </div>
  );
}

export default SecurityLayout;
