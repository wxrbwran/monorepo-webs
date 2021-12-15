/**
 * Created by wuxiaoran on 2019/1/8.
 */
import type { FC } from 'react';
import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { useSelector } from 'umi';
import DragModal from 'xzl-web-shared/dist/src/components/DragModal';
import UploadImageWithCrop from '@/components/UploadImageWithCrop';
import defaultHospitalBg from './img/default_hospital_bg.png';
import defaultHospitalLogo from './img/default_hospital_logo.png';
import style from './index.scss';

const UploadInfo: FC = (props) => {
  const { children } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const currentOrgInfo = useSelector((state: IState) => state.org.currentOrg.orgBase);
  const [introduction, setIntroduction] = useState(currentOrgInfo.introduction);
  // const introduction = currentOrgInfo.introduction;
  const logoUrl = '';
  const pictureUrl = '';
  return (
    <>
      <div style={{ display: 'inline' }} onClick={() => setShowModal(!showModal)}>
        {children}
      </div>
      <DragModal
        width={1000}
        visible={showModal}
        onCancel={() => setShowModal(!showModal)}
        title="医院资料"
        forceRender
        footer={null}
      >
        <div className="hospital-info">
          <div className={style.content}>
            <div className={style.item}>
              <h3 className={style.label}>医院logo</h3>
              <div className={style.image}>
                <div className={style.preview}>
                  <div className={style.img}>
                    <img src={logoUrl || defaultHospitalLogo} alt="" />
                  </div>
                  <UploadImageWithCrop type="logo" success={() => {}}>
                    <Button className={style.btn}>上传logo</Button>
                  </UploadImageWithCrop>
                </div>
              </div>
            </div>
            <div className={style.item}>
              <h3 className={style.label}>医院图片</h3>
              <div className={style.image}>
                <div className={style.preview}>
                  <div className={style.img}>
                    <img src={pictureUrl || defaultHospitalBg} alt="查看大图" />
                  </div>
                  <UploadImageWithCrop type="logo" success={() => {}}>
                    <Button className={style.btn}>更换图片</Button>
                  </UploadImageWithCrop>
                </div>
              </div>
            </div>
            <div className={style.item}>
              <h3 className={style.label}>医院介绍</h3>
              <div className={style.preview} style={{ width: '100%' }}>
                <div className={style.img}>
                  <Input.TextArea
                    value={introduction}
                    autoSize={{ minRows: 5, maxRows: 10 }}
                    onChange={(e) => {
                      setIntroduction(e.target.value);
                    }}
                  />
                </div>
                {/* <Button type="primary" ghost>
                  保存医院介绍
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </DragModal>
    </>
  );
};

export default UploadInfo;
