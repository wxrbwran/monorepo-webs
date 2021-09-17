import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import BaseInfo from '../BaseInfo';
// import OtherInfo from '../OtherInfo';
import PagerBill from '../PagerBill';
import QueryScope from '../QueryScope';
import { isEmpty } from 'lodash';
import { SEX, INFO } from '../../consts';
import styles from '../../index.scss';

interface IProps {
  searchStatus: number;
  changeSearchStatus?: (val: number) => void;
  handleSearchData?: (type: string) => void; // 点击继续搜索
}

type IKey = Record<string, {
  name: string;
  unit: string;
}>;

type anyKey = Record<string, any>;

function QueryCondition(props: IProps) {

  const { searchStatus } = props;
  const dispatch = useDispatch();
  const base = useSelector((state: IQuery)=>state.query.base);
  console.log('3222222', base)
  const images = useSelector((state: IQuery)=>state.query.images);
  const other = useSelector((state: IQuery)=>state.query.other);

  const baseObj: IKey = {
    age: { name: '年龄', unit: '岁' },
    weight: { name: '体重', unit: 'kg' },
    height: { name: '身高', unit: 'cm' },
  }
  const checkImgs = ['XZCS', 'XDT'];
  const laboratoryImgs = ['SHQX', 'XCG', 'BCG'];

  const go2Search = () => {
    // @ts-ignore
    props.changeSearchStatus(3);
  }

  const handleClose = (type: string, subType: string) => {
    // type:搜索条件类型，subType: 子项：年龄、身高等
    if(type === 'base') {
      const baseNew: anyKey = base;
      if (subType === 'gender') {
        delete baseNew.gender
      } else {
        const keyName = subType.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase()); // 首字母大字
        delete baseNew[`min${keyName}`];
        delete baseNew[`max${keyName}`];
      }
      dispatch({
        type: 'query/setBaseVal',
        payload: baseNew
      });
    } else if(type === 'images') {
      let imagesNew = [];
      const delIMages = subType === 'check' ? checkImgs : laboratoryImgs;
      imagesNew = images.filter((imgItem) => {
        return !delIMages.includes(imgItem.imageType);
      })
      dispatch({
        type: 'query/setImages',
        payload: imagesNew
      });
    } else if(type === 'other') {
      dispatch({
        type: 'query/setOther',
        payload: null
      });
    }
  }

  const closeAll = () => {
    dispatch({
      type: 'query/delAllQuery',
		});
  }
  const renderBase = (type: string, min: number | undefined, max: number) => {
    return (
      <div>
        <span className="item">{baseObj[type].name} : {`${min}-${max}`}{baseObj[type].unit}</span>
        <CloseOutlined onClick={() => handleClose('base', type)} />
      </div>
    )
  };
  const renderImage = (type: string, img: queryImage[]) => {
    return (
      <div>
        {type === 'check' ? '检查单' : '化验单'}：
        {
          img.map((item, index) => {
            return (<span
              className="item"
              key={item.imageType}>
              {INFO[item.imageType]}
              {index + 1 !== img.length && '、'}
            </span>
            )
          })
        }
        <CloseOutlined onClick={() => handleClose('images', type)} />
      </div>
    )
  }
  const getSearchConditions = useMemo(() => {
    if (!isEmpty(base) || !isEmpty(images) || !isEmpty(other)) {
      const { gender, maxAge, minAge, maxHeight, minHeight, maxWeight, minWeight } = base;
      const checkImages = images.filter((item: {imageType: string}) => checkImgs.includes(item.imageType));
      const laboratoryImages = images.filter((item: { imageType: string }) => laboratoryImgs.includes(item.imageType));
      return () => {
        return (
          <>
            {!!gender &&
              <div>
                <span className="item">性别 :{SEX[gender]}</span>
                <CloseOutlined onClick={() => handleClose('base', 'gender')} />
              </div>
            }
            {!!maxAge && renderBase('age', minAge, maxAge)}
            {!!maxHeight && renderBase('height', minHeight, maxHeight)}
            {!!maxWeight && renderBase('weight', minWeight, maxWeight)}
            {laboratoryImages.length > 0 && renderImage('laboratory', laboratoryImages)}
            {checkImages.length > 0 && renderImage('check', checkImages)}
            {
              !isEmpty(other) && (
                <div>
                  <span>四大代谢:</span>
                  {
                    other.fourHigh && other.fourHigh.map((item: any, index) => {
                      return (<span
                                className="item"
                                key={item}>
                                {INFO[item]}
                                {index+1 !== other.fourHigh?.length && '、'}
                              </span>
                            )
                    })
                  }
                  <CloseOutlined onClick={() => handleClose('other', 'fourHigh')} />
                </div>
              )
            }
          </>
        )
      }
    }
      return () => <></>

  }, [base, images, other])

  return (
    <>
      <div className={styles.con_choose}>
          <span>您已选择：</span>
          <div className={styles.con_list}>
            {getSearchConditions()}
          </div>
          {
            searchStatus === 2 ? (
              <Button type="primary" onClick={go2Search}>继续筛选</Button>
            ) : (
              (!isEmpty(base) || !isEmpty(images) || !isEmpty(other)) &&
              <span onClick={closeAll} className={styles.clear_all}>清除全部</span>
            )
          }
        </div>
        {
          searchStatus !== 2 && (
            <div className={styles.con_list}>
              <QueryScope />
              <BaseInfo/>
              <PagerBill />
              {/* <OtherInfo /> */}
            </div>
          )
        }
        {
          searchStatus === 3 && (
            <div className={styles.search}>
            <Button type="primary" onClick={() => props.handleSearchData('normal')}>继续搜索</Button>
            </div>
          )
        }

    </>
  )
}

export default QueryCondition;
