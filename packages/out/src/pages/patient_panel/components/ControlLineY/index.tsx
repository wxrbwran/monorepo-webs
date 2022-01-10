import React, { useEffect } from 'react';
import styles from '../../index.scss';

function ControlLineY() {
  let controlLineBar:HTMLElement | null;
  let medicineContent:HTMLElement;
  let medicineHeight: number;
  const handleMouseDown = (e: MouseEvent) => {
    const ev = e || window.event;
    const disY = ev.clientY; // 获取鼠标按下时光标x的值
    const disH = medicineContent.offsetHeight; // 获取拖拽前div的宽
    console.log(disY);
    document.onmousemove = (event) => {
      const ee = event || window.event;
      // 拖拽时为了宽 限制一下范围
      medicineHeight = ee.clientY - (disY - disH);
      if (medicineHeight < 100) {
        medicineHeight = 100;
      } else if (medicineHeight > 600) {
        medicineHeight = 600;
      }
      medicineContent.style.flex = `0 0 ${medicineHeight}px`;
      window.$storage.setItem('medicineHeight', medicineHeight.toString());
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };

  const handleDragControl = () => {
    controlLineBar = document.getElementById('controlLineY') as HTMLElement;
    medicineContent = document.getElementById('medicineContent') as HTMLElement;
    medicineHeight = Number(window.$storage.getItem('medicineHeight'));
    if (medicineHeight) {
      medicineContent.style.flex = `0 0 ${medicineHeight}px`;
    } else {
      medicineContent.style.flex = '0 0 auto';
    }
    controlLineBar.addEventListener('mousedown', handleMouseDown, false);
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    handleDragControl();
    return function cleanup() {
      if (controlLineBar) {
        controlLineBar.removeEventListener('mousedown', handleMouseDown, false);
        controlLineBar = null;
      }
    };
  }, []);
  return (
    <div id="controlLineY" className={styles.controlLineY} style={{ cursor: 'ns-resize', textAlign: 'center', flex: '0 0 20' }} />
  );
}

export default ControlLineY;
