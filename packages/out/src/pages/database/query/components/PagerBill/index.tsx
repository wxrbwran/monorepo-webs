import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import BillType from '../BillType'

import styles from '../../index.scss';

const pargerInfo = [
	{
		key: 'LABORATORY',
		value: '化验单'
	}, {
		key: 'CHECK',
		value: '检查单'
	}
]

const laboratoryType = [
	{
		key: 'SHQX',
		value: '生化全项',
	}, {
		key: 'XCG',
		value: '血常规',
	}, {
		key: 'BCG',
		value: '便常规',
	}
]

const checkType = [
	{
		key: 'XZCS',
		value: '超声',
	}, {
		key: 'XDT',
		value: '心电图',
	}
]

function PagerBill() {

	const [tabKey, setTabKey] = useState('');

	const changeTab = (key: string) => {
		if(key === tabKey) {
			setTabKey('');
		} else {
			setTabKey(key);
		}
	}

	return (
		<div className={styles.main}>
			<div className={styles.lable}>纸质单据</div>
			<div className={styles.group_value} style={tabKey ? { paddingBottom: 180 } : { paddingBottom: 22 }}>
				{
					pargerInfo.map((item) => (
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
									item.key === 'LABORATORY' && (
										<BillType
											laboratoryType={laboratoryType}
											toggleTab={()=>setTabKey('')}
										/>
									)
								}
								{
									item.key === 'CHECK' && (
										<BillType
											laboratoryType={checkType}
											toggleTab={()=>setTabKey('')}
										/>
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

export default PagerBill;
