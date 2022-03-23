import React, {
  FC, useEffect, useState, useRef, useMemo,
} from 'react';
import { Tabs } from 'antd';
import { useDispatch } from 'react-redux';
import StructuredDetailHydPanel from '../StructuredDetailHydPanel';
import StructuredDetailJcdPanel from '../StructuredDetailJcdPanel';
import { outTypes } from '../utils';
import styles from './index.scss';
import { isEmpty, cloneDeep } from 'lodash';
import EmptyIcon from '@/assets/img/jgh_empty.png';
import { IApiDocumentList, IStructuredDetailProps } from 'typings/imgStructured';

const { TabPane } = Tabs;
const StructuredDetail: FC<IStructuredDetailProps> = (props) => {
  const { hydData, jcdData, images, handleRefresh, handleClose, jcdOriginIds, groupId,
  } = props;
  console.log('hydData232', hydData);
  console.log('jcdData', jcdData);
  const initTypeTabs = () => {
    let jctAndOther = [];
    const jcdD = jcdData.filter(item => item.meta.title === 'JCD');
    const otherD = jcdData.filter(item => item.meta.title === 'OTHER');
    if (!isEmpty(jcdD)) {
      jctAndOther.push({ outType: 'JCD', initData: jcdD });
    }
    if (!isEmpty(otherD)) {
      jctAndOther.push({ outType: 'OTHER', initData: otherD });
    }
    const hydTab = hydData.map((hydItem: IApiDocumentList) => {
      return { ...hydItem, outType: hydItem.outType };
    });
    const datas = [...hydTab, ...jctAndOther];
    return isEmpty(datas) ? [] : datas;
  };
  const dispatch = useDispatch();
  const isRefreshParent = useRef(false);
  // 保存各个分类的方法队列 - 检查单、图片不清晰、非医学单据
  const [hydCallbackFns, setHydCallbackFns] = useState<CommonData>({});
  const [jcdCallbackFns, setJcdCallbackFns] = useState<CommonData>({});
  const [isViewOnly, setisViewOnly] = useState(!isEmpty(hydData) || !isEmpty(jcdData)); // true仅查看 false编辑中
  const [typeTabs, setTypeTabs] = useState<any[]>(initTypeTabs());
  const [activeType, setActiveType] = useState(initTypeTabs()[0]);

  useEffect(() => {
    const tabs: any[] = initTypeTabs();
    setTypeTabs(tabs);
    setActiveType(tabs.filter(item => !['NOT_CLEAR', 'NOT_HYD_JCD'].includes(item.outType))?.[0]?.outType);
  }, [hydData, jcdData]);

  useEffect(() => () => {
    // 在组件销毁时判断：如果保存成功了，刷新下单据列表，更新数据
    if (isRefreshParent.current && handleRefresh) { handleRefresh(); }
    dispatch({
      type: 'structured/saveAddQa',
      payload: { currEditData: {} },
    });
  }, []);

  // 删除页签的回调
  const handelTabsEdit = (deleteType: string) => {
    const newTabs = typeTabs.filter(item => item.outType !== deleteType);
    if (deleteType === activeType && !(isEmpty(newTabs))) {
      setActiveType(newTabs?.[newTabs?.length - 1].outType);
    }
    setTypeTabs(cloneDeep(newTabs));
  };

  const showTypeTabs = typeTabs.filter(typeItem => !['NOT_CLEAR', 'NOT_HYD_JCD'].includes(typeItem.outType));
  const fetInitData = (inx: number) => {
    // 化验单是 documentList， 检查单是initData
    if (showTypeTabs[inx]?.documentList) {
      return showTypeTabs?.[inx];
    } else if (showTypeTabs[inx]?.initData) {
      return showTypeTabs[inx]?.initData;
    }
    return [];
  };
  const renderTabPane = useMemo(() => {
    return (itemTabType: any, inx: number) => {
      let dom: any = null;
      const typeStart = itemTabType;
      const baseProps = {
        outType: typeStart,
        tabKey: itemTabType,
        // imageId,
        images,
        groupId,
        initData: fetInitData(inx),
      };
      switch (typeStart) {
        case 'HYD':
          dom = <StructuredDetailHydPanel
            setHydCallbackFns={setHydCallbackFns}
            hydCallbackFns={hydCallbackFns}
            {...baseProps}
          />;
          break;
        case 'OTHER':
        case 'JCD':
          dom = <StructuredDetailJcdPanel
            jcdCallbackFns={jcdCallbackFns}
            setJcdCallbackFns={setJcdCallbackFns}
            {...baseProps}
          />;
          break;
        default:
          dom = <div>无数据</div>;
          break;
      }
      return dom;
    };
  }, [isViewOnly, typeTabs]);
  console.log('typeTabs909', typeTabs, isViewOnly);
  const typeTabsText = typeTabs.map(typeItem => typeItem.outType);
  return (
    <div className={`flex-1 mx-20 mt-10 ${styles.structrued} ${styles.disabled}`}>
      {
        typeTabs.length > 0 && (
          <>
            <div className={`mt-15 ${styles.structured_content}`}>
              <Tabs
                type="editable-card"
                onEdit={handelTabsEdit}
                hideAdd
                activeKey={activeType}
                onChange={(tab: string) => setActiveType(tab)}
              >
                {
                  showTypeTabs
                    .map((itemTab: any, inx) => (
                      <TabPane
                        tab={outTypes?.[itemTab.outType]}
                        key={itemTab.outType}
                        forceRender={true}
                      >
                        {renderTabPane(itemTab.outType, inx)}
                      </TabPane>
                    ))
                }
              </Tabs>
            </div>
          </>
        )
      }
      {
        isEmpty(typeTabs) && (
          <div className={styles.no_tab}>
            <img className="w-100 h-66" src={EmptyIcon} alt="请选择图片类型" />
            <div className="mt-10">请选择图片类型</div>
          </div>
        )
      }
    </div>
  );
};
export default StructuredDetail;
