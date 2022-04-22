import * as React from 'react';
import Icon, { ActionType } from './Icon';
import { ToolbarConfig } from './ViewerProps';

export interface ViewerToolbarProps {
  prefixCls: string;
  onAction: (config: ToolbarConfig) => void;
  alt: string;
  width: number;
  height: number;
  attribute: boolean;
  zoomable: boolean;
  rotatable: boolean;
  scalable: boolean;
  changeable: boolean;
  downloadable: boolean;
  noImgDetails: boolean;
  toolbars: ToolbarConfig[];
  activeIndex: number;
  count: number;
  showTotal: boolean;
}

export const defaultToolbars: ToolbarConfig[] = [
  {
    key: 'zoomIn',
    actionType: ActionType.zoomIn,
    text: '放大',
  },
  {
    key: 'zoomOut',
    actionType: ActionType.zoomOut,
    text: '缩小',
  },
  {
    key: 'prev',
    actionType: ActionType.prev,
    text: '上一张',
  },
  {
    key: 'reset',
    actionType: ActionType.reset,
    text: '还原',
  },
  {
    key: 'next',
    actionType: ActionType.next,
    text: '下一张',
  },
  {
    key: 'rotateLeft',
    actionType: ActionType.rotateLeft,
    text: '向左旋转',
  },
  {
    key: 'rotateRight',
    actionType: ActionType.rotateRight,
    text: '向右旋转',
  },
  {
    key: 'scaleX',
    actionType: ActionType.scaleX,
    text: '水平翻转',
  },
  {
    key: 'scaleY',
    actionType: ActionType.scaleY,
    text: '垂直翻转',
  },
  {
    key: 'download',
    actionType: ActionType.download,
    text: '下载',
  },
];

function deleteToolbarFromKey(toolbars: ToolbarConfig[], keys: string[]) {
  const targetToolbar = toolbars.filter((item) => keys.indexOf(item.key) < 0);

  return targetToolbar;
}

export default function ViewerToolbar(props: ViewerToolbarProps) {
  function handleAction(config: ToolbarConfig) {
    props.onAction(config);
  }

  function renderAction(config: ToolbarConfig) {
    let content = null;
    // default toolbar
    if (typeof ActionType[config.actionType] !== 'undefined') {
      content = (
        <>
          <Icon type={config.actionType} />
          <p>{config.text}</p>
        </>
      );
    }
    // extra toolbar
    if (config.render) {
      content = config.render;
    }
    return (
      <li
        key={config.key}
        className={`${props.prefixCls}-btn`}
        onClick={() => { handleAction(config); }}
        data-key={config.key}
      >
        {content}
      </li>
    );
  }
  const attributeNode = props.attribute ? (
    <p className={`${props.prefixCls}-attribute`}>
      {props.alt && `${props.alt}`}
      {props.noImgDetails || <span className={`${props.prefixCls}-img-details`}>
        {`(${props.width} x ${props.height})`}
                             </span>}
      {props.showTotal
        && <span className={`${props.prefixCls}-showTotal`}>{`${props.activeIndex + 1} of ${props.count}`}</span>}
    </p>
  ) : null;
  let { toolbars } = props;
  if (!props.zoomable) {
    toolbars = deleteToolbarFromKey(toolbars, ['zoomIn', 'zoomOut']);
  }
  if (!props.changeable) {
    toolbars = deleteToolbarFromKey(toolbars, ['prev', 'next']);
  }
  if (!props.rotatable) {
    toolbars = deleteToolbarFromKey(toolbars, ['rotateLeft', 'rotateRight']);
  }
  if (!props.scalable) {
    toolbars = deleteToolbarFromKey(toolbars, ['scaleX', 'scaleY']);
  }
  if (!props.downloadable) {
    toolbars = deleteToolbarFromKey(toolbars, ['download']);
  }
  return (
    <div>
      {attributeNode}
      <ul className={`${props.prefixCls}-toolbar`}>
        {toolbars.map((item) => renderAction(item))}
      </ul>
    </div>
  );
}
