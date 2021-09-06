import React, { useState, useEffect } from 'react';
import { handleBaseObj } from '../../util';
import { INFO } from '../../consts';
import { sexList } from '@/utils/consts';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import { Pagination } from 'antd';
import { history } from 'umi';
import { useDispatch } from 'react-redux';
import moment from 'moment';
// import { infos } from './mock';
import styles from './index.scss';
import * as api from '@/services/api';

interface IProps {
  children: React.ReactElement;
}
interface IItem {
  condition: {
    base: {
      gender: string,
      minAge: number,
      maxAge: number,
      minWeight: number,
      maxWeight: number,
      minHeight: number,
      maxHeight: number

    }[];
    images: [];
    other: {
      fourHigh: []
    };
  }
}

interface IImages {
  imageType: string,
  startAt: number,
  endAt: number
}

function QueryHistory(props: IProps) {

  const dispatch = useDispatch()
  const { children } = props;
    const [showModal, setShowModal] = useState(false);
    const [infos, setInfos] = useState([]);
    const [pageAt, setPageAt] = useState(1);
    const [total, setTotal] = useState(1);

    useEffect(() => {
      if(showModal) {
        const params = {
          pageAt,
          pageSize: 15
        }
        api.query.getReportQuery(params).then(res => {
          setInfos(res.queryInfoList);
          setTotal(res.total)
        })
      }
    }, [showModal])

    const handlePageClick = (page: number) => {
      setPageAt(page);
      const params = {
        pageAt: page,
        pageSize: 15,
      }
      api.query.getReportQuery(params).then((res: {queryInfoList: []}) => {
        setInfos(res.queryInfoList);
      })
    }

    const go2Search = (item: IItem)=> {
      setShowModal(false);
      const baseData = handleBaseObj(item.condition.base);
      if (baseData?.gender) {
        baseData.gender = Number(baseData.gender) === 1 ? 'MALE' : 'FEMALE';
      }
      dispatch({
				type: 'query/setBaseVal',
        payload: baseData
      });
      dispatch({
        type: 'query/setImages',
        payload: item.condition.images
      });
      dispatch({
        type: 'query/setOther',
        payload: item.condition.other
      });
      setTimeout(()=>{
        history.replace(`/database/query/result`);
      },800)
    }
  return (
    <>
      <div style={{ display: 'inline' }} onClick={() => setShowModal(!showModal)}>{children}</div>
			{showModal && (
        <DragModal
          visible={showModal}
          title={'搜索历史'}
          width={800}
          wrapClassName="ant-modal-wrap-center query_history"
          onCancel={() => setShowModal(false)}
          maskClosable
          footer={null}
          className={styles.query_history}
        >
					<ul>
            {
              infos.map((item: IItem, index)=>{
                const { images, other, base } = item.condition;
                const { gender, maxAge, minAge, maxHeight, minHeight, maxWeight, minWeight } = handleBaseObj(base);
                return (
                  <li className={styles.info} onClick={()=>go2Search(item)} key={index}>
                  {
                      gender && (
                      <p><span>性别:</span> <span>{sexList[gender]}</span></p>
                    )
                  }
                  {
                    minAge && (
                      <p><span>年龄:</span> <span>{minAge}</span>-<span>{maxAge}</span>岁</p>
                    )
                  }
                  {
                    minWeight && (
                      <p><span>体重:</span> <span>{minWeight}</span>-<span>{maxWeight}</span>kg</p>
                    )
                  }
                  {
                    minHeight && (
                      <p><span>身高:</span> <span>{minHeight}</span>-<span>{maxHeight}</span>cm</p>
                    )
                  }
                    {
                      images.map((mItem: IImages, mIndex)=>{
                        const mKey = `${mIndex}${mItem.imageType}`
                        return (
                          <p key={mKey}>
                            <span>{INFO[mItem.imageType]} </span>
                            {
                              mItem.startAt && mItem.endAt ?
                                <>
                                  (<span>{moment(mItem.startAt).format('YYYY-MM-DD')}</span>
                                  <span>至</span>
                                  <span>{moment(mItem.endAt).format('YYYY-MM-DD')}</span>)
                                </>
                              :
                                <span>(全部日期)</span>
                            }
                          </p>
                        )
                      })
                    }

                  {
                    !!other && (
                      <p>
                        <span>四大代谢疾病: </span>
                        {
                          other.fourHigh.map((hItem)=>(
                            <span key={hItem}>{INFO[hItem]}、</span>
                          ))
                        }
                      </p>
                    )
                  }
                </li>
                )
              })
            }
          </ul>
          <div className={styles.footer}>
            <Pagination
              total={total}
              current={pageAt}
              defaultCurrent={1}
              pageSize={15}
              onChange={handlePageClick}
            />
          </div>
        </DragModal>
      ) }
    </>
  )
}

export default QueryHistory;
