import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { btnRender } from '@/utils/button';
import { useDispatch, useSelector } from 'umi';

// 检查设备支持情况
// netcall.js里当拨打和接听时，会进行webrtc是否支持与音视频设备检查，页面只需要在检查结果没返回时，显示检查中提示即可
function DeviceSupport() {
  // 如果没有检查过设备
  // 1.来电，先显示来电界面，当点击接听，提示检查插件
  // 2.拨打，直接显示检查插件，检查通过则显示拨打界面，不通过显示错误提示
  // 如果检查过。
  // webrtc支持，本地会存储下来为true
  // 音视频如果本地存储imErrorInfo=5，则表示没有音视频设备，这里用数字存储，是方便错误信息提示
  const { deviceCheckStatus, netcallStatus } = useSelector((state: IState) => state.im.netcallData);
  const myNetcall = useSelector((state: IState) => state.im.myNetcall);
  const [isshow, setIsShow] = useState<boolean>(false);
  const dispatch = useDispatch();
  const closeModal = () => {
    myNetcall.reject(); // 拒绝
    setIsShow(false);
    dispatch({
      type: 'im/UPDATE_NETCALL_DATA',
      payload: {
        deviceCheckStatus: 1,
      },
    });
  };
  useEffect(() => {
    console.log('netcallStatus222', netcallStatus);
  }, [netcallStatus]);
  useEffect(() => {
    // 0 不支持，1支持 2检测中
    if (deviceCheckStatus === 0 || deviceCheckStatus === 2) {
      let show = true;
      if (window.$storage.getItem('webrtc')) {
        show = false;
      }
      setIsShow(show);
    }
  }, [deviceCheckStatus]);
  const showWebnetError = () => {
    const imErrorInfo = Number(window.window.$storage.getItem('imErrorInfo')); // 获取最新错误码
    switch (imErrorInfo) {
      case 1:
        return (
          <>
            <div className="error_text">
              请安装插件PC Agent，下载插件后，请手动安装,方可使用音视频功能！
              拒绝调用插件申请会导致无法唤起插件,需重启浏览器
            </div>
            { btnRender({
              okText: '下载插件',
              onOk: () => {
                window.location.href = 'https://yx-web-nosdn.netease.im/package/1543999612/WebAgent_Setup_V2.9.0.1204.zip';
              },
              onCancel: () => setIsShow(false),
              cancelText: '暂不下载',
            }) }
          </>
        );
      case 2:
      case 3: // webnet
      case 4: // webrtc
      case 5: // 未找到麦克风或者摄像头
        return (
          <>
            <div className="error_text">
              {imErrorInfo === 2 && '当前系统不支持音视频功能，请使用win7、win10系统'}
              {imErrorInfo === 3 && '当前浏览器不支持音视频功能，请使用 Chrome、IE 11 或者 Edge 浏览器'}
              {imErrorInfo === 4 && '当前浏览器不支持完整的WebAudio功能, 无法使用音视频功能, 请使用最新版chrome、Firefox浏览器'}
              {imErrorInfo === 5 && '未找到设备(请检查摄像头麦克风是否正常）!'}
            </div>
            { btnRender({
              onCancel: closeModal,
              cancelText: '知道了，挂断',
              noOk: true,
            }) }
          </>
        );
      default:
        return (
          <div className="error__text">通话失败，未知错误，请使用最新版chrome浏览器</div>
        );
    }
  };
  return (
    <div>
      {
        isshow && (
          <div className="check_agent">
            {
              deviceCheckStatus === 0
                ? showWebnetError()
                : (
                  <div className="check_ing">
                    <LoadingOutlined />
                    <span>检查插件中</span>
                    <span className="dotting" />
                  </div>
                )
            }
          </div>
        )
      }
    </div>
  );
}

export default DeviceSupport;
