import React, { useState, useRef, FC } from 'react';
import { Tooltip, Row, Col, Button, Avatar } from 'antd';
import dayjs from 'dayjs';
import { defaultAvatar } from 'xzl-web-shared/dist/src/utils/consts';
import Slider from 'react-slick';
import next from './img/right.svg';
import prev from './img/lift.svg';
import styles from './index.scss';
import './slick.scss';

interface IProps {
  info: IGroupMsg;
}
const MsgItem: FC<IProps> = (props) => {
  const { info } = props;
  const { content, images, patients } = info;
  const [view, setView] = useState('limit');
  const [lines, setLines] = useState(5);
  const slider = useRef();
  const handleChangeView = () => {
    const isAllView = view === 'all';
    setLines(isAllView ? 5 : 999);
    setView(isAllView ? 'limit' : 'all');
  };

  const handleClickPrev = () => {
    slider.current.slickPrev();
  };

  const handleClickNext = () => {
    slider.current.slickNext();
  };
  const changePicState = (idx: number) => {
    console.log(idx);
    // const { isShowImages } = this.state;
    // this.setState({
    //   isShowImages: !isShowImages,
    //   activeIndex: idx,
    // });
  };

  const toggleShowImages = (image: string) => {
    // console.log('image', image);
    const index = images.indexOf(image);
    changePicState(index);
    // this.setState({ isShowImages: !isShowImages });
  };

  return (
    <li className={styles.item}>
      {content && (
        <p className={styles.info} style={{ WebkitLineClamp: lines }}>
          {content}
        </p>
      )}
      <Row className={styles.action} justify="space-between">
        <Col>
          {content && (
            <Button type="link" className={styles.viewer} onClick={handleChangeView}>
              {view === 'limit' ? '查看全文' : '收起'}
            </Button>
          )}
        </Col>
        <Col>
          <span className={styles.time}>{dayjs(info.createdAt).format('YYYY.MM.DD HH:mm')}</span>
        </Col>
      </Row>
      {images && (
        <ul className={styles.imgs}>
          {images.map((img: string) => (
            <li className="pointer" onClick={() => toggleShowImages(img)} key={img}>
              <img src={img} alt="" />
            </li>
          ))}
        </ul>
      )}
      {patients && (
        <div className={styles.patients}>
          <h2>接收患者</h2>
          <Slider
            ref={slider}
            dots={false}
            rows={1}
            slidesToShow={14}
            infinite={false}
            variableWidth
            className={styles.patients_list}
          >
            {patients.map((patient: IGroupMsgPatient) => (
              <div className={`${styles.patient} pointer`} key={patient.id} style={{ width: 50 }}>
                <Avatar
                  src={patient.avatar || defaultAvatar}
                  shape="square"
                  size={50}
                  className={styles.avatar}
                />
                <Tooltip placement="bottom" title={patient.name}>
                  <h3 className={styles.name}>{patient.name}</h3>
                </Tooltip>
              </div>
            ))}
          </Slider>
          <img src={prev} onClick={handleClickPrev} className="prev" alt="" />
          <img src={next} onClick={handleClickNext} className="next" alt="" />
        </div>
      )}
    </li>
  );
};
MsgItem.defaultProps = {
  hidePatient: false,
};
export default MsgItem;
