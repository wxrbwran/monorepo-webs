import React, { FC } from 'react';
import { history, useSelector } from 'umi';

const Auth: FC = (props) => {
  const { children } = props;
  const nonAuthList = ['login', 'find_pwd'];
  const isLogin = useSelector((state) => state.auth.isLogin);
  const location = useSelector((state) => state.router.location);

  const isLoginSome = nonAuthList.some((path) => location.pathname.includes(path));

  console.log(location, 'location');
  // console.log(matchedRoutes, 'matchedRoutes');
  // console.log(routes, 'routes');
  // console.log(action, 'action');
  // if (isLogin && isLoginSome) {
  //   console.log('no no no');
  //   return false;
  // }
  if (!isLogin && !isLoginSome) {
    history.push('/login');
  }
  return <>{children}</>;
};

export default Auth;
