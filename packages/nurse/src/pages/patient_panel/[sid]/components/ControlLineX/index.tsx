import React, { useEffect } from 'react';
import styles from '../../index.scss';

function ControlLineX() {
  let controlLine: HTMLElement | null;
  let leftPanel: HTMLElement;
  let rightPanel: HTMLElement;
  let parentNode: HTMLElement;
  let leftWidth: string | number | null = null;
  let rightWidth: string | number | null = null;

  const resizeWindow = () => {
    const width = (rightPanel as HTMLElement).offsetWidth;
    if (controlLine) {
      (controlLine as HTMLElement).style.right = `${width}px`;
    }
  };
  const handleMouseDown = (e) => {
    const ev = e || window.event;
    const disX = ev.clientX; // 获取鼠标按下时光标x的值
    const disW = leftPanel.offsetWidth; // 获取拖拽前div的宽
    document.onmousemove = (event) => {
      const ee = event || window.event;
      // 拖拽时为了宽 限制一下范围
      const parentWidth = parentNode.offsetWidth;
      leftWidth = ee.clientX - (disX - disW);
      rightWidth = parentWidth - leftWidth;
      if (leftWidth < 680) {
        leftWidth = 680;
        rightWidth = parentWidth - leftWidth;
      } else if (rightWidth < 500) {
        rightWidth = 500;
        leftWidth = parentWidth - rightWidth;
      }
      window.$storage.setItem('leftWidth', leftWidth.toString());
      window.$storage.setItem('rightWidth', rightWidth.toString());
      leftPanel.style.flex = `1 1 ${leftWidth}px`;
      (controlLine as HTMLElement).style.right = `${rightWidth}px`;
      rightPanel.style.flex = `1 1 ${rightWidth}px`;
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
  const handleDragControl = () => {
    controlLine = document.getElementById('controlLine') as HTMLElement;
    leftPanel = document.getElementById('leftPanel') as HTMLElement;
    rightPanel = document.getElementById('rightPanel') as HTMLElement;
    parentNode = leftPanel.parentNode as HTMLElement;
    leftWidth = window.$storage.getItem('leftWidth');
    rightWidth = window.$storage.getItem('rightWidth');
    if (!!leftWidth && !!rightWidth) {
      leftPanel.style.flex = `1 1 ${leftWidth}px`;
      rightPanel.style.flex = `1 1 ${rightWidth}px`;
      const width = rightPanel.offsetWidth;
      controlLine.style.right = `${width}px`;
    } else {
      leftWidth = 0;
      controlLine.style.right = '615px';
      rightWidth = 500;
    }
    console.log(1111112, controlLine);
    controlLine.addEventListener('mousedown', handleMouseDown, false);
    window.onresize = resizeWindow;
  };
  useEffect(() => {
    handleDragControl();
    return function cleanup() {
      if (controlLine) {
        controlLine.removeEventListener('mousedown', handleMouseDown, false);
        controlLine = null;
      }
    };
  }, []);
  return <div id="controlLine" className={styles.control_line} />;
}

export default ControlLineX;
