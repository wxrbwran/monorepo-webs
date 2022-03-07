import moment from 'moment';
import React from 'react';
import { List, Space, Tooltip } from 'antd';
import { BloodType2 } from '@/utils/tools';
import { yinYangMap } from 'xzl-web-shared/dist/utils/consts';
import { getReferenceTitle } from 'xzl-web-shared/dist/utils/tool';

const measuredAt = (format?: string) => ({
  title: '时间',
  dataIndex: 'measuredAt',
  key: 'measuredAt',
  width: 160,
  render: (text: number) => {
    return (
     <div>{ moment(text).format(format || 'YYYY/MM/DD HH:mm')}</div>
    );
  },
});
export const bpCol = [
  measuredAt(),
  {
    title: '收缩压',
    dataIndex: 'high',
    key: 'high',
    width: 160,
  },
  {
    title: '舒张压',
    dataIndex: 'low',
    key: 'low',
    width: 160,
  },
  {
    title: <div className="w-160">心率</div>,
    dataIndex: 'HEART_RATE',
    key: 'HEART_RATE',
    // width: 160,
    render: (text: number) => <div className="w-160">{text}</div>,
  },
];
export const weightCol = [
  measuredAt(),
  {
    title: '体重/KG',
    dataIndex: 'WEIGHT',
    key: 'WEIGHT',
    width: 160,
  },
];
export const stepCol = [
  measuredAt(),
  {
    title: '步数',
    dataIndex: 'STEP',
    key: 'STEP',
    width: 160,
  },
];
const getGluTit = () => {
  const colList: CommonData[] = [];
  Object.keys(BloodType2).forEach((key, index) => {
    colList.push({
      title: <div className="w-160">{BloodType2[key]}</div>,
      dataIndex: key,
      key,
      width: index === Object.keys(BloodType2).length - 1 ? 'auto' : 160,
      render: (text: number) => <div className="w-160">{text}</div>,
    });
  });
  return colList;
};
export const gluCol = [measuredAt(), ...getGluTit()];

const time = {
  title: '时间',
  dataIndex: 'time',
  key: 'time',
  width: 160,
  render: (data: { time: number }, record: any) => {
    console.log('data32322', record);
    return (
      <div>
        { record?.unknownReport?.unknownReport && '*' }
        { moment(data?.time).format('YYYY/MM/DD')}
      </div>
    );
  },

};
// 有子分类的数据格式
interface IHasSubItem {
  title: string;
  children: {
    title: string;
    dataIndex: string;
    key: string;
  }[];
}
export const getCustomCol = (headList: string[] | IHasSubItem[]) => {
  console.log('getCustomCol headList', headList);
  const lastInx = headList.length - 1;
  // 后端返回数据格式：无子分类的，headList 是数据里直接对应字段名，有子分类的，数据里是col对象。
  if (typeof headList[0] !== 'string') {
    const itemList = headList.map((item, index: number) => {
      const curItem: IHasSubItem = item as IHasSubItem;
      // console.log('getCustomCol', curItem);
      curItem.children = (item as IHasSubItem).children.map((subitem) => ({
        ...subitem,
        render: (record: { time: number; snap: { referenceList: TReference[] } }) => {
          // console.log('record', record);
          const referenceList = record?.snap?.referenceList || [];
          console.log('record referenceList', referenceList);
          if (referenceList.length === 0) {
            return null;
          }
          return (
            <List
              size="small"
              dataSource={referenceList}
              renderItem={(ref: TReference) => {
                const text = `${ref.note || ''}${getReferenceTitle(ref) || ''}${ref.unit || ''}`;
                return (
                  <List.Item className="mx-auto text-center text-sm">
                    <Space className="w-full justify-center" style={{ display: 'flex' }}>
                      {(ref.value || ref.secondValue || ref.indexValue) && (
                        <>
                          {
                            ref.type === 'RADIO' && (
                            <>
                              {yinYangMap[ref.indexValue as string]}
                              <div style={{ color: '#ff0000' }}>{`${ref.note || ''} ${yinYangMap[ref.value as string]}`}</div>
                            </>
                            )
                          }
                          {
                            ref.type === 'OTHER' && (
                              <>
                                {ref.indexValue}
                                <div style={{ color: '#ff0000' }}> {ref.value}</div>
                              </>
                            )
                          }
                          {
                            !['OTHER', 'RADIO'].includes(ref.type) && (
                              <>
                                <div>{ref.indexValue}</div>
                                  {text && (
                                    <div
                                      className="truncate"
                                      title={text}
                                      style={{ color: '#ff0000', maxWidth: 200 }}
                                    >
                                      <Tooltip placement="topRight" title={text}>
                                        {text}
                                      </Tooltip>
                                    </div>
                                  )}
                              </>
                            )
                          }
                        </>
                      )}
                    </Space>
                  </List.Item>
                );
              }}
            />
          );
          // console.log('record', record);
          // const { unit, value, advices } = record || {};
          // const [minVal, maxVal] = advices || [];
          // return (
          //   <div>
          //     <div style={index === lastInx ? { textAlign: 'center' } : {}}>
          //       {`${value ?? ''} ${unit || ''}`}
          //     </div>
          //     {minVal && minVal !== 'empty' && maxVal && maxVal !== 'empty' && (
          //       <div style={{ color: '#ff0000' }}>{`${minVal}-${maxVal}`}</div>
          //     )}
          //   </div>
          // );
        },
      }));
      return curItem;
    });
    return [time, ...itemList];
  }
  const itemList = (headList as string[]).map((headTit: string, index: number) => ({
    title: (
      <div style={index === lastInx ? { textAlign: 'left', paddingLeft: 47 } : {}}>{headTit}</div>
    ),
    dataIndex: headTit,
    key: headTit,
    width: index === lastInx ? 'auto' : 160,
    render: (text: { value: number; unit: string; time: number }) => {
      const { unit, value } = text || {};
      return (
        <div style={index === lastInx ? { textAlign: 'left', paddingLeft: 47 } : {}}>
          {`${value || ''} ${unit || ''}`}
        </div>
      );
    },
  }));
  return [time, ...itemList];
};
