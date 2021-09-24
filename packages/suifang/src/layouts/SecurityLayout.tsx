import React, { useState, useEffect } from 'react';
import PageLoading from '@/components/PageLoading';
import CommonTab from '@/components/CommonTab';
import NavBar from '@/components/NavBar';
import { setAuthorizationToken } from '@/services/http';
import { useSelector, useDispatch } from 'react-redux';
import { history } from 'umi';
import './index.scss';

interface IProps {
  children: React.ReactElement;
  location: {
    query: {
      projectName: string;
      projectSid: string;
      isTemp?: string;
    };
    pathname: string;
  };
}
interface IState {
  user: {
    user: {
      avatar: string;
    };
    relationship: object;
    legalRelationship: object;
    institution: object;
  };
}

function SecurityLayout({ children, location }: IProps) {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const user = useSelector((state: IState) => state.user.user);
  const relationship = useSelector((state: IState) => state.user.relationship);
  const legalRelationship = useSelector((state: IState) => state.user.legalRelationship);
  const institution = useSelector((state: IState) => state.user.institution);

  const getCurrentUser = () => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
        payload: {
          wcIds: [localStorage.getItem('xzl-web-doctor_wcId')],
        },
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('xzl-web-doctor_access_token');
    if (!!token) {
      setAuthorizationToken(token);
      setIsLogin(true);
      getCurrentUser();
      if (location.pathname === '/') {
        history.push('/patients');
      }
    }
  }, []);

  return (
    <>
      {isLogin ? (
        <>
          <NavBar user={user} location={location} />
          <CommonTab location={location} />
          <div
            className="main"
            style={{
              marginTop: 97,
              height: 'calc(100vh - 97px)',
            }}
          >
            {React.cloneElement(children, {
              user,
              relationship,
              legalRelationship,
              institution,
            })}
          </div>
        </>
      ) : (
        <PageLoading />
      )}
    </>
  );
}

export default SecurityLayout;
