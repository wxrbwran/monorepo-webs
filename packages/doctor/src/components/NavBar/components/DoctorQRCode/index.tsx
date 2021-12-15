import React, { FC, useState, useEffect } from 'react';
import { Tabs, Spin, Button } from 'antd';
// import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import { useSelector } from 'umi';
import DragModal from 'xzl-web-shared/dist/src/components/DragModal';
import { Role, isDoctor } from 'xzl-web-shared/dist/src/utils/role';
import OrgListBtn from './OrgListBtn';
import DoctorDetailEwm from './OrgDetail/ewm';
// import DoctorDetailWxEwm from './OrgDetail/wxEwm';
import styles from './index.scss';
import { IState } from 'packages/doctor/typings/model';

const { TabPane } = Tabs;
const DoctorQRCode: FC = ({ children }) => {
  const organizations: IOrganizations = useSelector((state: IState) => state.user.organizations);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [downImgUrl, setDownImgUrl] = useState<string>('');
  const [currentOrg, setCurrentOrg] = useState({});
  const [orgList, setOrgList] = useState<any[]>([]);
  useEffect(() => {
    if (organizations.teams.length > 0) {
      const filterOrgList: any[] = [];
      console.log('organizations232', organizations);
      organizations.teams.forEach((item) => {
        let orgItem: CommonData = {};
        item.members.forEach((member) => {
          if (member.role === Role.ORG.id) {
            orgItem.orgName = member.name;
          } else if (isDoctor(member.role) || Role.SYS_DOCTOR.id) {
            // 如果没有保存过医生姓名  或者 上次保存的医生角色是非独立角色的医生（优先展示作为独立医生的角色的信息）
            if (!orgItem?.name || orgItem.role !== Role.ALONE_DOCTOR.id) {
              console.log('------00', member);
              orgItem = {
                ...orgItem,
                ...member,
              };
            }
          }
        });
        if (orgItem?.orgName) {
          filterOrgList.push(orgItem);
        }
      });
      console.log('filterOrgList', filterOrgList);
      setOrgList(filterOrgList);
      setCurrentOrg(filterOrgList[0]);
    }
  }, [organizations]);
  const handleShowModal = () => {
    setShowModal(true);
  };
  const hadleHideModal = () => {
    setShowModal(false);
  };
  const handleToggleTab = (key: string) => {
    console.log('切换二维码/小程序码tab', key);
  };
  const handleToggleOrg = (org: Iorg) => {
    setCurrentOrg(org);
  };
  const handleDownload = (dom: string) => {
    setLoading(true);
    const domNode = document.getElementById(dom);
    html2canvas(domNode as HTMLElement, {
      useCORS: true,
      backgroundColor: null,
      scale: 1.5,
      width: domNode.offsetWidth,
      height: dom === 'wxewm' ? 480 : 401,
    }).then((canvas) => {
      const qrCodeDownloadUrl = canvas.toDataURL('image/png', 1.0).replace('image/png', 'image/octet-stream');
      // 兼容ie
      if (navigator.userAgent.indexOf('Trident') !== -1) {
        const arr = qrCodeDownloadUrl.split(',');
        const mime = arr[0].match(/:(.*?);/) as Array<any>[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        // eslint-disable-next-line no-plusplus
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        window.navigator.msSaveBlob(new Blob([u8arr], { type: mime }), `${currentOrg.name}.png`);
        setLoading(false);
      } else {
        setLoading(false);
        setDownImgUrl(qrCodeDownloadUrl);
      }
    });
  };
  useEffect(() => {
    if (downImgUrl) {
      const aDom = document.getElementById('downloadImg');
      try {
        (aDom as HTMLElement).click();
      } catch (err: any) {
        console.log('下载二维码失败', err);
      }
    }
  }, [downImgUrl]);
  console.log('currentOrg', currentOrg);
  return (
    <div className={styles.qrcode}>
      <div onClick={handleShowModal}>
        {children}
      </div>
      <DragModal
        title="我的名片"
        footer={null}
        width={800}
        visible={showModal}
        onCancel={hadleHideModal}
        maskClosable
        className={styles.ewm_modal}
        wrapClassName="ant-modal-wrap-center"
      >
        <>
          <a
            id="downloadImg"
            className={styles.hidden_a}
            href={downImgUrl}
            src="image/png"
            download={`${currentOrg.name}.png`}
          >
            hidden img
          </a>
          <Tabs
            defaultActiveKey="ewm"
            onChange={handleToggleTab}
            className={styles.qr_tabs}
            centered
            renderTabBar={() => <></>}
          >
            <TabPane tab="二维码" key="ewm">
              <OrgListBtn
                handleToggleOrg={handleToggleOrg}
                orgList={orgList}
                type="ewm"
              />
              <DoctorDetailEwm currentOrg={currentOrg} />
              <Button className={styles.download} onClick={() => handleDownload('ewm')}>
                <Spin spinning={loading}>
                  下载图片
                </Spin>
              </Button>
            </TabPane>
            {/* <TabPane tab="小程序码" key="wxEwm">
              <OrgListBtn
                handleToggleOrg={handleToggleOrg}
                orgList={orgList}
                type="wxEwm"
              />
              <DoctorDetailWxEwm />
              <Button className={styles.download} onClick={() => handleDownload('wxewm')}>
                <Spin spinning={loading}>
                  下载图片
                </Spin>
              </Button>
            </TabPane> */}
          </Tabs>
        </>
      </DragModal>
    </div>
  );
};

export default DoctorQRCode;
