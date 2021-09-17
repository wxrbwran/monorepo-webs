import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select, Checkbox, DatePicker, Button } from 'antd';
import moment from 'moment';
import styles from '../../index.scss';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface IProps {
  laboratoryType: { key: string; value: string }[];
  toggleTab: () => void;
}

const timeType = [
  {
    key: 'ALL',
    value: '全部',
  },
  {
    key: 'CUSTOM',
    value: '自定义',
  },
];

function BillType(props: IProps) {
  const dispatch = useDispatch();
  const { laboratoryType, toggleTab } = props;
  const [type, changeType] = useState({}); // {SHQX:'CUSTOM', XCG: 'ALL'}
  const [imgkey, setImgkey] = useState<string[]>([]); // ['SHQX','XCG','BCG']
  const [reportData, setReportData] = useState({}); // {SHQX: {endAt: '', startAt: '',imageType: ''}, XCG: {}}
  const images = useSelector((state: IQuery) => state.query.images);

  const changeVal = (e: any, key: string) => {
    const isChecked = e.target.checked; // 选中取消选中状态
    if (isChecked) {
      setImgkey([...imgkey, key]);
      setReportData({
        ...reportData,
        [key]: {
          imageType: key,
          startAt: null,
          endAt: null,
        },
      });
    } else {
      setImgkey(imgkey.filter((item) => item !== key));
      delete type[key];
      delete reportData[key];
    }
  };

  const handleGetType = (value: string, key: string) => {
    changeType({ ...type, [key]: value });
  };

  const changeDate = (_date: any, dateString: string[], key: string) => {
    // console.log('date', date, dateString, key);
    setReportData({
      ...reportData,
      [key]: {
        startAt: moment(dateString[0]).valueOf(),
        endAt: moment(dateString[1]).valueOf(),
        imageType: key,
      },
    });
  };

  const onCancel = () => {
    changeType({});
    setImgkey([]);
    setReportData({});
    toggleTab();
  };

  const onOk = () => {
    const val = [...Object.values(reportData), ...images];
    const obj: CommonData = {};
    const newImages = val.reduce((cur, next) => {
      if (!obj[next.imageType]) {
        obj[next.imageType] = true;
        cur.push(next);
      }
      return cur;
    }, []);
    toggleTab();
    dispatch({
      type: 'query/setImages',
      payload: newImages,
    });
  };

  return (
    <div className={styles.indicator_wrapper}>
      {laboratoryType.map((item) => (
        <div className={styles.indicator} key={item.key}>
          <Checkbox onChange={(e) => changeVal(e, item.key)}>{item.value}</Checkbox>
          {imgkey.includes(item.key) && (
            <>
              <div className={styles.time_type}>
                <span className={styles.label}>时间：</span>
                <Select
                  style={{ width: 91 }}
                  onChange={(value) => handleGetType(value, item.key)}
                  defaultValue="ALL"
                >
                  {timeType.map((vitem) => (
                    <Option value={vitem.key} key={vitem.key}>
                      {vitem.value}
                    </Option>
                  ))}
                </Select>
              </div>
              {type[item.key] === 'CUSTOM' && (
                <RangePicker
                  onChange={(date, dateString) => changeDate(date, dateString, item.key)}
                />
              )}
            </>
          )}
        </div>
      ))}
      <div className={styles.save_btn}>
        <Button onClick={onCancel}>取消</Button>
        <Button type="primary" onClick={onOk}>
          {' '}
          确定{' '}
        </Button>
      </div>
    </div>
  );
}

export default BillType;
