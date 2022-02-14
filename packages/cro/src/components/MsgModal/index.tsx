import React, { useState, useEffect } from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import warning from '@/assets/img/warning.png';
import { parabola } from '@/utils/tools';
import * as api from '@/services/api';
import { message } from 'antd';
import styles from './index.scss';

interface IProps {
  wrapper: any;
  target: any;
  changeShake: (status: boolean) => void;
}
function MsgModal({ wrapper, target, changeShake }: IProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [inviteMsgList, setInviteMsgList] = useState<navBarIMsg[]>([]);
  const [isShow, setShow] = useState(false);
  const [laterId, setLaterId] = useState<string[]>([]);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const animateStyle = {
    transform: `translate(${x}px, ${y}px)`,
    opacity: isVisible ? 1 : 0,
  };

  useEffect(() => {
    const params = {
      pageAt: 1,
      pageSize: 9999,
      type: 1000,
    };
    api.research.fetchSysMessage(params).then((res: { sysMessages: navBarIMsg[] }) => {
      const inviteList: navBarIMsg[] = res.sysMessages.filter(item => (
        item.type === 1000 && item.state === 0),
      );
      console.log('inviteList', inviteList.slice(0, 5));
      setInviteMsgList(inviteList.slice(0, 5));
      if (inviteList.length > 0) {setShow(true);}
    });
  }, []);

  const handleUpdateState = (item: navBarIMsg, state: number) => {
    const { inviterName, projectNsId, inviterSid } = item.body.content;
    const params = {
      doctorName: inviterName,
      id: item.id,
      projectNsId,
      receiverSid: inviterSid,
      state,
    };
    console.log('paramsssss', JSON.stringify(params));
    setLaterId((preLaterId) => [...preLaterId, item.id]);
    api.research.patchSysMessageStatus(params).then(() => {
      message.success('操作成功');
      window.location.reload();
    }).catch(err => {
      console.log('ddddddddw', err);
    });
  };

  const updateLocation = (xNum: number, yNum:number) => {
    setIsVisible(true);
    setX(xNum);
    setY(yNum);
  };

  //动画引导
  const onAnimate = (origin: any) => {
    return new Promise(resolve => {
      function animationDone() {
        setIsVisible(false);
        resolve();
      }

      const config = {
        ballWrapper: wrapper.current,
        origin,
        target: target.current,
        time: 500,
        a: 0.02,
        callback: updateLocation,
        finish: animationDone,
        offset: 8,
      };
      parabola(config);
    });
  };

  const onAdd = (className: string, id: string) => {
    changeShake(false);
    onAnimate(document.querySelector(`.${className}`)).then(() => {
      changeShake(true);
      setLaterId((preLaterId) => [...preLaterId, id]);
    });

  };
  return (
    <>
    {
      isShow && (
        <>
          <div className="header-navbar__msg origin" >
            {
              inviteMsgList.map((item, index) => {
                if (!laterId.includes(item.id)) {
                  return (
                    <div className={styles.invite} key={item.id}>
                      <img src={warning}/>
                      <div>
                        <p>{item.body.msg}</p>
                        <div className={styles.btn}>
                          <p onClick={() => handleUpdateState(item, 1)}><CheckCircleOutlined />同意</p>
                          <p onClick={() => handleUpdateState(item, 2)}><CloseCircleOutlined />拒绝</p>
                          <p
                            className={`await origin${index}`}
                            onClick={() => onAdd(`origin${index}`, item.id)}
                          >
                            稍后处理
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })
            }
          </div>
          <div className="ball" style={animateStyle} />
        </>
      )
    }
    </>
  );
}

export default MsgModal;
