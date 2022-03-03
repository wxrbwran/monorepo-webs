
import React, { useState, useEffect } from 'react';
import { Card, Cascader, message, Tree } from 'antd';
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { IChecked } from '../../index';
import checkChoicePng from '@/assets/img/check_choice.png';
import checkUnChoicePng from '@/assets/img/check_unchoice.png';
import * as api from '@/services/api';
import { handleFormatValues, handleShouldValues, ResearchSourceType, transformDynamicToStatic } from '@/pages/query/util';
import { history, useSelector, useDispatch } from 'umi';
import styles from './index.scss';
interface IProps {
  currentField: IChecked
  onValueChange: (items: IChecked[]) => void
  type: 'fieldChoice' | 'ruleChoice'
}

function FieldCard({ currentField, onValueChange, type }: IProps) {

  const [formatData, setFormatData] = useState<IChecked>(currentField);
  const projectSid = window.$storage.getItem('projectSid');
  const { projectRoleType, projectNsId, roleType } = useSelector((state: IState) => state.project.projDetail);


  useEffect(() => {
    setFormatData(currentField);
  }, [currentField]);

  useEffect(() => {

    if (onValueChange) {
      onValueChange(formatData);
    }
  }, [formatData]);

  const fetchKvScope = (item: IChecked) => {

    if (!item.option) {
      // 获取填充yu
      api.query.fetchKvScope({ kp: item.name }).then((res) => {
        if (res.values.length > 1) {
          item.option = res.values;
        }
      })
        .catch((err: string) => {
          message.error(err);
        });
    }
  };

  const onChange = (value, selectedOptions, item) => {
    if (selectedOptions && selectedOptions.length > 0) {
      if (type == 'fieldChoice') {
        item.fieldCheck = true;
      } else {
        item.ruleCheck = true;
      }
    } else {

      if (type == 'fieldChoice') {
        item.fieldCheck = false;
      } else {
        item.ruleCheck = false;
      }

    }
    fetchKvScope(item);
    setFormatData({ ...formatData });
  };

  const onCheckChoice = (item) => {

    if (type == 'fieldChoice') {
      if (item.description == '姓名') {
        item.fieldCheck = true;
      } else {
        item.fieldCheck = !item.fieldCheck;
      }
    } else {
      item.ruleCheck = !item.ruleCheck;
    }
    fetchKvScope(item);
    setFormatData({ ...formatData });
  };

  const optionLists = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      // isLeaf: true,
      loading: false,
      children: [
        {
          value: 'dynamic1',
          label: '啦啦啦啦 1111 Dynamic 1',
        },
        {
          value: 'dynamic2',
          label: '啦啦啦啦 1111 Dynamic 22',
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      isLeaf: false,
    },
  ];

  // 点击

  const [options, setOptions] = React.useState(optionLists);

  const onChanged = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  const loadData = selectedOptions => {

    console.log('============= loadData loadData');
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // load options lazily
    // setTimeout(() => {
    targetOption.loading = false;
    targetOption.children = [
      {
        value: 'nanjing122312',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ];
    // setOptions([...options]);
    setFormatData({ ...formatData });
    // }, 300);
  };



  const onItemClick = (item, pageAt) => {


    console.log('============= onItemClick onItemClick', JSON.stringify(item));
    if (item.isLeaf == false && item.children.length == 0) { // 说明子节点是动态的，并且没有获取过，需要请求

      item.loading = true;
      setFormatData({ ...formatData });

      if (item?.items?.length > 0 && item.items[0].type.includes('dynamic')) {

        transformDynamicToStatic(item.items[0], projectSid, projectRoleType, ResearchSourceType).then((itemsRes) => {

          const a = itemsRes.slice(10 * pageAt, 10 * (pageAt + 1));
          item.items = [item.items[0], ...a];
          const concatChildrens = item?.items ? item.items?.filter(t => !!t.show).map((i: IField, idx: number) => ({
            title: i.description,
            key: `${i.name}_${idx}`,
            value: i.description,
            label: i.description,
            parent: item?.description,
            parentName: item?.name,
            children: [],
            isLeaf: !(i?.items && i?.items[0]?.type.includes('dynamic')),
            ...i,
          })) : [];
          if (item.children.length < 100) {
            item.children = [...item.children, ...concatChildrens, {
              value: '加载更多',
              disabled: true,
              label: <button className='more' onClick={() => onItemClick(item, pageAt + 1)}>加载更多</button>,
            }];

          } else {
            item.children = [...item.children, ...concatChildrens];
          }
          item.loading = false;
          setFormatData({ ...formatData });

        }).catch((err) => {

          message.error(err);
        });
      }

      // item.children = [
      //   {
      //     label: `${item.label} 1111`,
      //     value: 'dynamic1',
      //     isLeaf: false,
      //     loading: false,
      //     // children: [
      //     //   {
      //     //     value: 'nanjing',
      //     //     label: 'Nanjing',
      //     //     children: [
      //     //       {
      //     //         value: 'zhonghuamen',
      //     //         label: 'Zhong Hua Men',
      //     //       },
      //     //     ],
      //     //   },
      //     // ],
      //   },
      //   {
      //     label: `${item.label}  22222`,
      //     value: 'dynamic2',
      //   },
      // ];

      // item.children = itemTemp?.items ? itemTemp.items?.filter(t => !!t.show).map((i: IField, idx: number) => ({
      //   title: i.description,
      //   key: `${i.name}_${index + 1}${idx}`,
      //   value: i.description,
      //   label: i.description,
      //   parent: res.keys[0].items[i]?.description,
      //   parentName: res.keys[0].items[i]?.name,
      //   subParent: itemTemp.description,
      //   subParentName: itemTemp.name,
      //   subParentAssign: itemTemp.assign,
      //   children: [],
      //   isLeaf: !(i?.items && i?.items[0]?.type.includes('dynamic')),
      //   ...i,
      // })) : [],

      // item.loading = false;

      // setFormatData({ ...formatData });
      // setOptions(optionLists);
    }

  };

  console.log('============== load page', JSON.stringify(formatData?.checkSources[0]));

  return (
    <>
      <div className={`flex flex-row flex-wrap ${styles.fieldCard}`}>
        {
          formatData && formatData?.checkSources?.map((item, index) => {
            if (index == 0) {
              console.log('============== item item', JSON.stringify(item), index);
            }
            if (item.isLeaf && item.children.length == 0) {
              return (
                <div className='flex flex-row items-center w-200 mt-15 mb-15' onClick={() => { onCheckChoice(item); }}>
                  <img src={(type == 'fieldChoice' ? item.fieldCheck : item.ruleCheck) ? checkChoicePng : checkUnChoicePng} height="16" />
                  <div className='ml-10'>{item.title}</div>
                </div>
              );
            } else {
              if (index == 0) {
                console.log('============== item.children item.children', item.children.length % 10 > 0);
              }
              // styles.hasMoreCascader `${item.children.length % 10 > 0 ?  : ''
              return (
                <Cascader dropdownClassName={styles.hasMoreCascader} options={item.children} loadData={loadData} onChange={(value, selectedOptions) => onChange(value, selectedOptions, item)} multiple>
                  <div className='flex flex-row items-center w-200 mt-15 mb-15' onClick={() => onItemClick(item, 0)}>
                    <img src={(type == 'fieldChoice' ? item.fieldCheck : item.ruleCheck) ? checkChoicePng : checkUnChoicePng} height="16" />
                    <div className='ml-10'>{item.title}</div>
                    {
                      item.loading && <LoadingOutlined />
                    }
                  </div>
                </Cascader>
              );
            }
          })
        }
      </div>
    </>
  );
}

export default FieldCard;

