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
  // const [tableData, setTableData] = useState<IData[]>([]);
  const stageToken = localStorage.getItem('xzl-web-doctor_access_token');

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
    document.addEventListener('visibilitychange', function () {
      var isHidden = document.hidden;
      console.log(document.visibilityState);
      if (isHidden) {
      } else {
        // 切换了账号然后重新打开该窗口时
        if (stageToken != localStorage.getItem('xzl-web-doctor_access_token')) {
          history.push('/home');
        }
      }
    });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('xzl-web-doctor_access_token');
    if (!!token) {
      setAuthorizationToken(token);
      setIsLogin(true);
      getCurrentUser();
      if (location.pathname === '/') {
        history.push('/home');
      }
      // mqtt
      // const MQTT = {
      //   server: 'wss://ws.xinzhili.cn',
      //   port: 3333,
      // };
      // const username = 'xzlcorp';
      // const password = '123DEVops321';
      // const clientId = `${localStorage.getItem('xzl-web-doctor_sid')}-${randomString()}`;
      // console.log('clientIdcode', clientId);
      // if(!window.$client){
      //   const client = mqtt.connect(MQTT.server, {
      //     username,
      //     password,
      //     clientId,
      //     port: MQTT.port,
      //     connectTimeout: 600 * 1000
      //   });
      //   window.$client = client;
      //   client.on('message', (tpc, msg:[]) => {
      //     const convertMessage = JSON.parse(msg.toString());
      //     console.log('convertMessage', msg, convertMessage);
      //     if(convertMessage.data){
      //       const { results } = convertMessage.data;
      //       // setTableData([...tableData, ...results]);
      //       dispatch({
      //         type: 'query/setQueryResult',
      //         payload: [...results]
      //       });
      //     }else{
      //       dispatch({
      //         type: 'query/setIsQueryStop',
      //       });
      //     }
      //   });
      // }
    }
  }, []);


  const isHome = location.pathname.includes('/home');
  const isTemp = location.pathname === '/template' || !!location.query.isTemp;
  return (
    <>
      {isLogin ? (
        <>
          <NavBar user={user} location={location} />
          {!isHome && !isTemp && <CommonTab location={location} />}
          <div
            className="main"
            style={{
              marginTop: isHome ? 48 : 97,
              height: isHome ? 'calc(100vh - 48px)' : 'calc(100vh - 97px)',
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
