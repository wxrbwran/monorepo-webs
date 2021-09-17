import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Radio, InputNumber, Button, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from '../../index.scss';

const RadioGroup = Radio.Group;
const baseInfo = [
  {
    key: 'SEX',
    value: '性别',
  },{
    key: 'AGE',
    value: '年龄',
  },{
    key: 'WEIGHT',
    value: '体重',
  },{
    key: 'HEIGHT',
    value: '身高',
  }
];

function BaseInfo() {

	const dispatch = useDispatch()
  const [tabKey, setTabKey] = useState('');
  const [val, setVal] = useState<CommonData>({});

  const changeTab = (key: string) => {
		if(key === tabKey) {
			setTabKey('')
		} else {
			setTabKey(key);
		}
  }
	const changeVal = (name: string, e: any) => {
		if(name === 'gender'){
      const newVal = {...val, [name]: e.target.value}
			setVal(newVal)
			dispatch({
				type: 'query/setBaseVal',
				payload: {
					gender: e.target.value,
				}
      });
		}else {
      setVal({...val, [name]: e})
		}
  }
	const onSearch = (name: string) => {
		const max = val[`max${name}`];
		const min = val[`min${name}`];
		if (!min || !max || (Number(min) < 0)) {
			message.error('请输入正确数值');
		} else if(min >= max){
			message.error('请输入正确数值区间');
		}else {
			setTabKey('')
			dispatch({
				type: 'query/setBaseVal',
				payload: {
					[`min${name}`]: val[`min${name}`],
					[`max${name}`]: val[`max${name}`],
				}
      });
		}

  }

  return (
    <div className={styles.main}>
			<div className={styles.lable}>基本资料</div>
			<div className={styles.group_value} style={tabKey ? { paddingBottom: 60 } : {paddingBottom: 22 }}>
			{
				baseInfo.map((item)=> (
				<div className={styles.item_box} key={item.key}>
					<div
						onClick={() => changeTab(item.key)}
						className={item.key === tabKey ? `${styles.title} ${styles.active}` : styles.title}
					>
						{item.value} <DownOutlined />
					</div>
					<div
						style={item.key === tabKey ? { display: 'block' } : { display: 'none' }}
						className={styles.value}
					>
					{
						item.key === 'SEX' && (
							<RadioGroup onChange={(value) => changeVal('gender', value)}>
								<Radio value="MALE">男</Radio>
								<Radio value="FEMALE">女</Radio>
							</RadioGroup>
						)
					}
					{
						item.key === 'AGE' && (
						<>
							<InputNumber
								min={1}
								onChange={(value) => changeVal('minAge', value)}
							/>
							<span> - </span>
							<InputNumber
								min={1}
								onChange={(value) => changeVal('maxAge', value) }
							/>
							<Button
								className={styles.sure}
								onClick={() => onSearch('Age')}
							>确定</Button>
						</>
						)
					}
					{
						item.key === 'WEIGHT' && (
						<>
							<InputNumber
								min={1}
								onChange={(value) => changeVal('minWeight', value)}
							/>
							<span> - </span>
							<InputNumber
								min={1}
								onChange={(value) => changeVal('maxWeight', value) }
							/> kg
							<Button
								className={styles.sure}
								onClick={() => onSearch('Weight')}
							>确定</Button>
						</>
						)
					}
					{
						item.key === 'HEIGHT' && (
						<>
							<InputNumber
								min={1}
								onChange={(value) => changeVal('minHeight', value)}
							/>
							<span> - </span>
							<InputNumber
								min={1}
								onChange={(value) => changeVal('maxHeight', value) }
							/> CM
							<Button
								className={styles.sure}
								onClick={() => onSearch('Height')}
							>确定</Button>
						</>
						)
					}
					</div>
				</div>
				))
			}
			</div>
    </div>
  )
}

export default BaseInfo;
