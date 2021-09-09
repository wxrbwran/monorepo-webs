import React from 'react';
import { Card, Tree } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { IChecked } from '../../index';

interface IProps {
  currentCardFields: IField
  onValueChange: (item: IChecked, checked: boolean) => void
  closeCard: (description: string, name: string) => void;
  handleExpand: (node: IChecked) => void
}
interface IField {
  description: string;
  items: any[];
  name: string;
}

function FieldCard({ currentCardFields, onValueChange, closeCard, handleExpand }: IProps) {

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck = (checkedKeys: React.Key[], info: any) => {
    console.log('onCheck', checkedKeys, info);
    if(info.node?.children?.length === 0){
      onValueChange(info.node, info.checked);
    } else {
      info.node.children.forEach((item: IChecked) => {
        onValueChange(item, info.checked);
      })
    }
  };

  const onLoadData = ({ key, children }: any) => {
    return new Promise<void>(resolve => {
      if (children) {
        resolve();
        return;
      }
    });
  }

  const onExpand = (expandedKeysValue: React.Key[], el: any) => {
    console.log('onExpand', expandedKeysValue, el);
    if(['结构化数据'].includes(el.node.parent) && el.node.children.length === 0){
      handleExpand(el.node);
    }
  };

  console.log('currentCardFields~', currentCardFields);
  // 格式化成tree组件所需的数据格式，isLeaf是控制是否显示下拉箭头(false显示，true不显示)
  // disabled: 异步加载的父级元素默认设置成不可点击，仅可通过点击下拉箭头异步加载数据
  const formatData = currentCardFields?.items?.filter(f => !!f.show).map((item: IField, index: number) => ({
    title: item.description,
    key: `${item.name}_${index}`,
    parent: currentCardFields?.description,
    children: item?.items ? item.items?.filter(t => !!t.show).map((i: IField, idx: number) => ({
      title: i.description,
      key: `${i.name}_${index+1}${idx}`,
      parent: currentCardFields?.description,
      subParent: item.description,
      children: [],
      isLeaf: !(i?.items && i?.items[0]?.type.includes('dynamic')),
      ...i
    })) : [],
    isLeaf: ['终点事件'].includes(currentCardFields.description) ? false : !(item?.items && item?.items[0].type.includes('dynamic')),
    disabled: item?.items && item?.items[0].type.includes('dynamic') && item?.items.length===1,
    ...item
  }))

  console.log('formatData', formatData);
  console.log('currentCardFields', currentCardFields);

  return (
    <Card size="small"
      title={currentCardFields?.description}
      style={{ width: 208 }}
      extra={<CloseOutlined onClick={()=> closeCard(currentCardFields.description, currentCardFields.name)}/>}
    >
      <Tree
        checkable
        selectable={false}
        // onSelect={onSelect}
        onCheck={onCheck}
        loadData={onLoadData}
        onExpand={onExpand}
        treeData={formatData}
      />
    </Card>
  )
}

export default FieldCard;
