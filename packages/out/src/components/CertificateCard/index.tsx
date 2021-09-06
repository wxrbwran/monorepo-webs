import React, { useEffect, useState } from 'react';
import { formatCert2Local } from '@/utils/cert';
import PROFESSION1 from '../CertificateEdit/img/cert1.png';
import PROFESSION2 from '../CertificateEdit/img/cert2.png';
import QUALIFICATION1 from '../CertificateEdit/img/qual.png';
import BADGE1 from '../CertificateEdit/img/badge.png';
import styles from './index.scss';

interface IProps {
  userInfo: ISubject;
}
interface ICertItem {
  name: string;
  img: string[];
  bgClass: string;
}
function CertificateCard({ userInfo }: IProps) {
  let certificates: Store = {};
  const [cert, setCert] = useState<ICertItem[]>([]);
  const defaultImg = [QUALIFICATION1, PROFESSION1, PROFESSION2, BADGE1];
  useEffect(() => {
    certificates = formatCert2Local(userInfo.certificates) || {};
    const { qualification, profession, badge } = certificates;
    let certArr = [PROFESSION1, PROFESSION2];
    if (profession && profession.length > 0) {
      const [img1, img2] = profession;
      certArr = [img1 || PROFESSION1, img2 || PROFESSION2];
    }
    const certList: ICertItem[] = [
      {
        name: '医师执业证书',
        img: qualification && qualification.length > 0 ? [qualification[0]] : [QUALIFICATION1],
        bgClass: 'qualif',
      },
      {
        name: '医师资格证书',
        img: certArr,
        bgClass: 'cert',
      },
      {
        name: '手持工牌照片',
        img: badge && badge.length > 0 ? [badge[0]] : [BADGE1],
        bgClass: 'badge',
      },
    ];
    setCert(certList);
  }, [userInfo]);
  return (
    <div className={styles.cert}>
      {cert.map((item) => (
        <div className={styles.cert__item} key={item.name}>
          <div className={styles.cert__imgs}>
            {item.img.map((v: string, vIndex) => (
              <div key={v}>
                {!defaultImg.includes(v) ? (
                  <img src={v} alt="" />
                ) : (
                  <div className={styles[item.bgClass + vIndex]}>
                    <span>暂无上传</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className={`${styles.cert__tit} mt-10`}>{item.name}</div>
        </div>
      ))}
    </div>
  );
}
export default CertificateCard;
