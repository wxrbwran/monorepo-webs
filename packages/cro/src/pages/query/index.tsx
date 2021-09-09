import React, { useState, useEffect } from 'react';
import * as api from '@/services/api';
import { message, Checkbox } from 'antd';
import { history, useSelector, useDispatch } from 'umi';
import ToogleSide from '@/components/ToogleSide';
import FieldCard from './components/field_card';
import PreTable from './components/pre_table';
import { handleFormatValues } from './util';
import styles from './index.scss';
import { IState } from 'typings/global';
import { setSubscribe } from '@/utils/mqtt';
interface IProps {
}
export interface IChecked {
  label?: string,
  title?: string,
  parent: string,
  type?: string,
  name: string,
  assign?: any,
  key?: string
  items: any[];
  description: string;
}
interface IFields {
  items: IFieldItem[]
}
interface IFieldItem {
  description: string,
  name: string,
  items: any[];
}

const CheckboxGroup = Checkbox.Group;
function Query({ }: IProps) {
  const dispatch = useDispatch();
  const projectSid = window.$storage.getItem('projectSid');
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  const groupList = useSelector((state: IState) => state.project.objectiveGroup)
  const [card, setCard] = useState<IFieldItem[]>([]);
  const [checkedField, setCheckedField] = useState<IChecked[]>([]);
  const [active, setActive] = useState<string[]>([]); // 用来控制菜单前面圆点的样式
  const [allFields, setAllFields] = useState<IFields>();
  const [groupIds, setGroupIds] = useState<string[]>(["PROJECT_ALL"]);
  const tableData = useSelector((state: IState) => state.query.tableData);

  useEffect(() => {
    api.query.fetchFields().then((res) => {
      setAllFields(res.keys[0]);
      setCard([res.keys[0].items[0]]);
      setActive([res.keys[0].items[0].name]);
    })
    .catch((err:string) => {
      message.error(err);
    });
  }, [])

  /** 数据去重 */
  const unique = (arr: any[], key: string) => {
    const res = new Map();
    return arr.filter((item) => !res.has(item[key]) && res.set(item[key], 1));
  };

  const handleChangeTab = (item: IFieldItem, index: number) => {
    const FIELDCARD = document.getElementById('FIELD_CARD');
    if (FIELDCARD) {
      setTimeout(() => {
        FIELDCARD.scrollTop = 999999;
      }, 300);
    }
    const info = item.items[0];
    if(active.includes(item.name)){
      return;
    }
    if (info.type.includes('dynamic') ){
      // 动态加载
      const params: { kp: string, rsList: { sid: string}[], scaleType?: string } = {
        kp: item.name,
        rsList: [{ sid: projectSid }],
      }
      if(['主观量表', '客观检查', 'CRF量表'].includes(item.description)){
        params.scaleType = item.name.toUpperCase()
      }
      api.query.fetchNodeEl(
        info.assign.value,
        params
      ).then((res) => {
        // '终点事件' '主观量表', '客观检查', 'CRF量表' 有全选功能
        if(allFields && res.items.length > 0){
          if(['主观量表', '客观检查', 'CRF量表'].includes(item.description)){
            allFields.items[index].items[0] = {
              description: `全部${item.description}`,
              items: [{...allFields.items[index].items[0]}, ...res.items],
              level: "abstract",
              name: `${item.name}.all`,
              show: true,
              type: "entity"
            }
          }else{
            allFields.items[index].items = [{...allFields.items[index].items[0]}, ...res.items];
          }
          setAllFields({...allFields});
        }
      })
      .catch((err:string) => {
        message.error(err);
      });
    }else{
      if(allFields){
        // 加后面”&&“的判断是为了关闭”终点事件“卡片后再次点击左侧tab追加新的”终点事件“卡片时不再重复执行以下操作
        if(['终点事件'].includes(item.description) && allFields.items[index].items.length>1){
          allFields.items[index].items = [{
            description: '全部事件',
            items: [...item.items],
            level: "abstract",
            name: "end-event.all",
            show: true,
            type: "entity"
          }]
          setAllFields({...allFields});
        }
      }
    }
    setCard(unique([...card, item], 'name'));
    setActive(Array.from(new Set([...active, item.name])));
  }

  const deepTree = (parent: string, name: string) => {
    let result: any = {}
    allFields?.items.forEach((item, index) => {
      if(item.description === parent){
        result.parentIndex = index
      }
      item.items.forEach((el, idx) => {
        if(el.description === name){
          result.childIndex = idx
        }
      })
    })
    return result;
  }

  const onValueChange = (item: IChecked, checked:boolean) => {
    if(checked){
      api.query.fetchKvScope({kp: item.name}).then((res) => {
        if(res.values.length>1){
          const newItem = {...item, option: res.values}
          setCheckedField((pre) => [...pre, newItem]);
        }else {
          setCheckedField((pre) => [...pre, item]);
        }
      })
      .catch((err:string) => {
        message.error(err);
      });
    }else{
      setCheckedField((pre) => [...pre.filter((f)=> f.key !== item.key)]);
    }
  }

  const handleExpand = (node: IChecked) => {
    // 点击下拉箭头，异步加载数据
    const info = node.items[0];
    api.query.fetchNodeEl(
      info.assign.value,
      {
        kp: node?.name,
        value: node?.description,
        rsList: [{ sid: projectSid }]
      }
    ).then((res) => {
      if(allFields){
        const { parentIndex, childIndex } = deepTree(node.parent, node.description);
        const defaultEl = allFields.items[parentIndex].items[childIndex].items;
        allFields.items[parentIndex].items[childIndex].items = [...defaultEl, ...res.items];
        setAllFields({...allFields});
      }
    })
    .catch((err:string) => {
      message.error(err);
    });
  }

  const handleChangeGroup = (checkedValues:any[]) => {
    console.log('checkedValues', checkedValues);
    setGroupIds(checkedValues);
  }

  const handleSubmit = async (values: any) => {
    console.log('values', values);
    dispatch({
      type: 'query/clearQueryResult'
    });
    const rules = handleFormatValues(values);
    console.log('rule', rules)
    if(rules){
      history.replace(`/query/query_result`);
      const params: any = {
        rules: [{
          match: {
            must: rules
          }
        }],
        sid: localStorage.getItem('xzl-web-doctor_sid'),
        role: window.$storage.getItem('croRoleType'),
        projectSid,
        projectNsId
      }
      if(!groupIds.includes('PROJECT_ALL') && groupIds.length>0){
        params.groupNsId=[...groupIds];
      }
      const { rule_id } = await api.query.fetchQueryId(params);

      const start = Date.now();
      // 初始为0，一旦查询到数据就+1，证明有查询结果
      let isEmpty = 0;
      const timer = setInterval(async() => {
        // 5分钟之后终止查询
        if (Date.now() - start > 5*60*1000) {
          clearInterval(timer);
          dispatch({
            type: 'query/setIsQueryStop',
          });
          // return;
        }
        // 20s后如果一条数据也没有查到，证明无查询结果，终止查询
        if(Date.now() - start > 20*1000 && !isEmpty) {
          clearInterval(timer);
          dispatch({
            type: 'query/setIsQueryStop',
          });
        }
        const { results } = await api.query.fetchQueryResult(rule_id);
        dispatch({
          type: 'query/setQueryResult',
          payload: [...results]
        });
        if(results.length >0){
          isEmpty++
        }
      }, 2000);
      window.$timer = timer;
      // setSubscribe(rule_id);
    }
  }
  const closeCard = (description: string, name: string) => {
    const filterFields = checkedField.filter(item => item.parent!==description);
    setCheckedField([...filterFields]);
    setCard(card.filter(item => item.name !== name));
    setActive(active.filter(item => item !== name));
  }
  const options = groupList.map((item:{groupName: string, groupId: string,})=> ({
    label: item.groupName,
    value: item.groupId,
  }));

  options.unshift(
    {
      label: "全部受试者",
      value: 'PROJECT_ALL',
    }
  )
  console.log('checkedField', checkedField);
  return (
    <div className={styles.query}>
      <ToogleSide>
        <div className={styles.left}>
          {allFields && allFields.items
            .map((item, index) => (
              <div
                className={active.includes(item.name) ? styles.active : ''}
                title={item.description}
                onClick={() => handleChangeTab(item, index)}
                key={item.name}
              >
                <span>·</span>{item.description}
              </div>
          ))}
        </div>
        <div className={styles.right}>
          <span className={styles.scope}>查询范围：</span>
          <CheckboxGroup
            options={options}
            onChange={handleChangeGroup}
            value={groupIds}
          />
          <div className={styles.r_top} id="FIELD_CARD">
            {
              card.map((item) => (
                <FieldCard
                  key={item.name}
                  currentCardFields={item}
                  closeCard={closeCard}
                  onValueChange={onValueChange}
                  handleExpand={handleExpand}
                />
              ))
            }
          </div>
          {
            unique(checkedField, 'key').length>0 && (
              <div className={styles.r_bottom}>
                <PreTable checkedField={unique(checkedField, 'key')} onSubmit={handleSubmit}/>
              </div>
            )
          }
        </div>
      </ToogleSide>
    </div>
  )
}

export default Query;
