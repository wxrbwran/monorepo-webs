import React, { useEffect, useState } from 'react';
import { Input, Form, Popconfirm } from 'antd';
import { PlusOutlined, CloseOutlined, EyeOutlined } from '@ant-design/icons';
import request from 'umi-request';
import { isEmpty } from 'lodash';
import Viewer from '@/components/Viewer';
import PROFESSION1 from './img/cert1.png';
import PROFESSION2 from './img/cert2.png';
import QUALIFICATION1 from './img/qual.png';
import BADGE1 from './img/badge.png';
import styles from './index.scss';

interface ICertificates {
  qualification: string[];
  profession: string[];
  badge: string[];
}
interface IProps {
  setFieldsValue: (value: any) => void;
  getFieldValue: (name: string) => ICertificates;
  certificates: ICertificates;
}
interface IViewerImg {
  imgUrl: string;
  keyName: string;
  imgIndex: number;
}
function CertificateEdit(props: IProps) {
  const { setFieldsValue, certificates, getFieldValue } = props;
  const [showViewer, setShowViewer] = useState(false);
  const [showImg, setShowImg] = useState<IViewerImg>();
  const imgList: CommonData = {
    qualification: [QUALIFICATION1],
    profession: [PROFESSION1, PROFESSION2],
    badge: [BADGE1],
  };
  const defaultImg = [QUALIFICATION1, PROFESSION1, PROFESSION2, BADGE1];
  const titleObj: CommonData = {
    qualification: '医师执业证书',
    profession: '医师资格证书',
    badge: '手持工牌照片',
  };
  const [certificateArr, setCertificateArr] = useState<CommonData>(imgList);
  useEffect(() => {
    const newCerArr: CommonData = { ...certificateArr };
    const { qualification, badge, profession } = certificates || {};
    if (!isEmpty(certificates)) {
      if (qualification) {
        newCerArr.qualification = qualification;
      }
      if (badge) {
        newCerArr.badge = badge;
      }
      if (profession) {
        newCerArr.profession = profession;
        if (profession.length === 1) {
          newCerArr.profession.push(PROFESSION2);
        }
      }
      setCertificateArr(newCerArr);
    }
  }, []);
  const imgSuccess = (type: string, imgIndex: number, imgUrl: string) => {
    const newCertificates: CommonData = { ...getFieldValue('certificates') };
    if (newCertificates[type]) {
      if (newCertificates[type][imgIndex]) {
        newCertificates[type][imgIndex] = imgUrl;
      } else {
        newCertificates[type].push(imgUrl);
      }
    } else {
      newCertificates[type] = [imgUrl];
    }
    certificateArr[type][imgIndex] = imgUrl;
    setFieldsValue({
      certificates: newCertificates,
    });
    setCertificateArr({ ...certificateArr });
  };
  const sendFileMsgs = (e: any, type: string, imgIndex: number) => {
    const file = e.target.files[0];
    if (file) {
      window.$api.im
        .filePrepare({ businessType: 6 })
        .then((res: any) => {
          const {
            accessId, encodePolicy, host, key, signature,
          } = res;
          const formData = new FormData();
          formData.set('name', file.name);
          formData.set('key', `${key}${file.name}`);
          formData.set('policy', encodePolicy);
          formData.set('OSSAccessKeyId', accessId);
          formData.set('success_action_status', '200');
          formData.set('callback', '');
          formData.set('signature', signature);
          formData.set('file', file);
          request
            .post(host, {
              data: formData,
            })
            .then(() => {
              imgSuccess(type, imgIndex, `${host}/${key}${file.name}`);
            })
            .catch((err) => {
              console.log('error111', err);
            });
        })
        .catch((err: any) => {
          console.log('err', err);
        });
    }
  };
  // certificates
  const removeImage = (key: string, imgUrl: string, imgIndex: number) => {
    const newCertificates: CommonData = { ...getFieldValue('certificates') };
    newCertificates[key] = newCertificates[key].filter(
      (img: any) => img !== imgUrl,
    );
    setFieldsValue({
      certificates: newCertificates,
    });
    if (key === 'profession' && imgIndex === 0) {
      const twoPic = certificateArr.profession[1];
      certificateArr.profession = [
        twoPic === PROFESSION2 ? PROFESSION1 : certificateArr.profession[1],
        imgList.profession[1],
      ];
    } else {
      certificateArr[key][imgIndex] = imgList[key][imgIndex];
    }
    setCertificateArr({ ...certificateArr });
  };
  const handleShowViewer = (
    imgUrl: string,
    keyName: string,
    imgIndex: number,
  ) => {
    setShowViewer(true);
    setShowImg({
      imgUrl,
      keyName,
      imgIndex,
    });
  };
  const handleImageRotate = (dNo: number) => {
    const newDegree: number = (parseInt(Math.abs(dNo) / 360, 10) + 1) * 360;
    /*  eslint-disable radix */
    const degree: number = dNo < 0 ? dNo + newDegree : dNo;
    const { imgUrl, keyName, imgIndex } = showImg as IViewerImg;
    let newImgUrl = '';
    if (imgUrl.includes('rotate')) {
      const viewImgIdArr = imgUrl.split(',').reverse();
      const degreeNum = (Number(viewImgIdArr[0]) + degree) % 360;
      // @ts-ignore
      viewImgIdArr[0] = degreeNum;
      newImgUrl = viewImgIdArr.reverse().join(',');
    } else {
      newImgUrl = `${imgUrl}?x-oss-process=image/rotate,${degree}`;
    }
    const newCertificates: CommonData = { ...getFieldValue('certificates') };
    const newCertificateArr = certificateArr;
    newCertificates[keyName][imgIndex] = newImgUrl;
    certificateArr[keyName][imgIndex] = newImgUrl;
    setFieldsValue({
      certificates: newCertificates,
    });
    setCertificateArr({ ...newCertificateArr });
  };
  return (
    <div className={styles.certificate}>
      <Form.Item label="" name="certificates">
        <Input type="hidden" />
      </Form.Item>
      {Object.keys(certificateArr).map((item) => (
        <div key={item} className={styles.item}>
          <div className={styles.type}>{titleObj[item]}</div>
          <div className={styles.img_wrap}>
            {certificateArr[item].map((imgUrl: string, imgIndex: number) => {
              if (imgIndex === 1 && certificateArr[item][0] === PROFESSION1) {
                return null;
              }
              return (
                <div
                  key={imgUrl}
                  className={
                    defaultImg.includes(imgUrl) ? styles.upload : styles.has_img
                  }
                >
                  <img src={imgUrl} alt={titleObj[item]} />
                  <div className={styles.action}>
                    <div className={styles.close_btn}>
                      <Popconfirm
                        title="确定删除图片吗？"
                        onConfirm={() => removeImage(item, imgUrl, imgIndex)}
                        onCancel={() => {}}
                        okText="确定"
                        cancelText="取消"
                        onClick={(e: any) => {
                          e.stopPropagation();
                        }}
                      >
                        <CloseOutlined />
                      </Popconfirm>
                    </div>
                    <EyeOutlined
                      onClick={() => handleShowViewer(imgUrl, item, imgIndex)}
                    />
                  </div>
                  <div className={styles.upload_btn}>
                    <PlusOutlined />
                    <div>点击上传</div>
                    <input
                      type="file"
                      onChange={(e) => sendFileMsgs(e, item, imgIndex)}
                      title="请选择图片"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <Viewer
        visible={showViewer}
        images={[{ src: showImg?.imgUrl }]}
        activeIndex={0}
        scalable={false}
        onClose={() => setShowViewer(false)}
        onRotateClick={handleImageRotate}
        onMaskClick={() => setShowViewer(false)}
      />
    </div>
  );
}

export default CertificateEdit;
