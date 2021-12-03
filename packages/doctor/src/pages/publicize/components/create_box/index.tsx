import React from 'react';
import { useParams } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import styles from './index.scss';
import { sfTypeUrl } from '../../utils';

interface IProps {
  onClick: () => void;
}
function PatientEducation({ onClick }: IProps) {
  const { type } = useParams<{ type: string }>();


  return (
    <div className={styles.create_new} onClick={onClick}>
      <PlusOutlined />
      <span>创建新{sfTypeUrl?.[type].text}</span>
    </div>
  );
}

export default PatientEducation;
