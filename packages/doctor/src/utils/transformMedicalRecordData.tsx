import { keys } from 'lodash';
import React from 'react';

interface IFour {
  name?: string;
  status?: string | number | boolean;
  time?: string | number | boolean;
  medicine?: string | number | boolean;
}
interface IOther {
  name?: string;
  status?: string | number | boolean;
  time?: string | number | boolean;
  diseaseStatus?: string | number | boolean;
}
interface IRlated {
  name?: string;
  text?: React.ReactElement | string;
}
export const illnessName:CommonData = {
  // four
  hypertension: '高血压病',
  hyperlipemia: '高脂血症',
  hyperglycemia: '糖尿病',
  hyperuricemia: '高尿酸血症',
  // other
  nephroticSyndrome: '肾功能不全',
  renalArteryStenosis: '肾动脉狭窄',
  sleepApnea: '睡眠呼吸暂停综合症',
  duodenalUlcer: '胃-十二指肠溃疡',
  pylori: '幽门螺旋杆菌感染',
  // related
  familyHistory: '家族史',
  coronary: '冠心病',
  gout: '痛风',
  tumour: '肿瘤',
  peripheralVascular: '外周血管病',
  smoking: '吸烟史',
  drinking: '饮酒史',
  allergy: '过敏史',
};
export const smokingLevel = {
  LEVEL_ONE: '每天1-5支',
  LEVEL_TWO: '每天5-10支',
  LEVEL_THREE: '每天10-20支',
  LEVEL_FOUR: '每天20支以上',
};
export const drinkLevel = {
  LEVEL_ZERO: '不喝酒',
  LEVEL_ONE: '少量',
  LEVEL_TWO: '多量',
  LEVEL_THREE: '超量',
};
export default function transformMedicalRecordData(type: string, obj:{ [key:string]:any }) {
  /* eslint-disable */
	const keysArray = keys(obj);
	if (keysArray.some(key => !!obj[key])) {
		const four = ['hypertension', 'hyperglycemia', 'hyperlipemia', 'hyperuricemia'];
		const other = [
			'nephroticSyndrome', 'renalArteryStenosis',
			'sleepApnea', 'duodenalUlcer', 'pylori'];
		const related = ['familyHistory', 'smoking', 'drinking', 'allergy'];
		let list;
		let fourHigh:IFour[] = [];
		let otherDia:IOther[] = [];
		let relatedHis: IRlated[] = [];
		four.forEach((ill) => {
			const data:IFour = {};
			data.name = illnessName[ill];
			data.status = obj[ill];
			data.time = obj[ill + 'Since'];
			data.medicine = obj[ill + 'Pharmacy'];
			fourHigh.push(data);
		});
		other.forEach((ill) => {
			const data:IOther = {};
			data.name = illnessName[ill];
			data.status = obj[ill];
			data.time = obj[ill + 'Since'];
			data.diseaseStatus = '';
			switch (ill) {
				case 'pylori':
					data.diseaseStatus = obj[ill + 'Status']
					break;
				default:
					data.diseaseStatus = obj[`${ill}Cure`]
			}
			otherDia.push(data);
		});
		if (obj.extraDisease && obj.extraDisease.length > 0) {
		  obj.extraDisease.forEach((other: { diseaseName: string; since: string; diseaseCure: string; }) => {
		    const data:IOther = {};
		    data.name = other.diseaseName;
		    data.status = 'SICK';
		    data.time = !!other.since ? other.since : '';
				data.diseaseStatus = other.diseaseCure
		    otherDia.push(data);
		  });
		}
		related.forEach((ill) => {
			const data:IRlated = {};
			data.name = illnessName[ill];
			if (ill === 'familyHistory') {
				if (!!obj.familyHistory &&
					obj.familyHistory === 'SICK') {
					// todo: 家族史详情
					data.text = <div>
						{
							['father', 'mother', 'brother'].map((role) => {
								const history = `${role}FamilyHistory`;
								let roleName = null;
								switch (role) {
									case 'father':
										roleName = '父亲'; break;
									case 'mother':
										roleName = '母亲'; break;
									case 'brother':
										roleName = '兄弟姐妹'; break;
								}
								let arr: string[] = []
								for (let i in obj[history]) {
									if (obj[history][i]) {
										arr = [...arr, illnessName[i]]
									}
								}
								if (arr.length > 0) {
									return (
										<div key={role}>
											{roleName}&nbsp;|&nbsp;
											{
												arr.map((item, idx) => {
													if (idx === arr.length - 1) {
														return item
													}
													return `${item}、`
												})
											}
										</div>
									)
								}
							})
						}
					</div>;
				} else {
					data.text = '无'
				}
			}
			if (ill === 'smoking') {
				if (obj.smoking === 'SICK') {
					const since = !!obj.smokingSince ?
						`吸烟${obj.smokingSince}年 ` : '';
          data.text = `${since} ${smokingLevel?.[obj.smokingLevel] || ''}`;
					if (obj.quitSmoking === 'QUITED') {
						if (!!obj.quitSmokingSince) {
							data.text += `  已戒烟${obj.quitSmokingSince}年`;
						} else {
							data.text += `  已戒烟`;
						}
					} else if (obj.quitSmoking === 'REMAIN') {
						data.text += ` 未戒烟`;
					}
				} else {
					data.text = '无';
				}
			}
			if (ill === 'drinking') {
				if (obj.drinking === 'SICK') {
					const since = !!obj.drinkingSince ?
						`饮酒${obj.drinkingSince}年 ` : '';

          data.text = `${since} ${drinkLevel?.[obj.drinkingLevel] || ''}` ;
					if (obj.quitDrinking === 'QUITED') {
						if (!!obj.quitDrinkingSince) {
							data.text += `  已戒酒${obj.quitDrinkingSince}年`;
						} else {
							data.text += `  已戒酒`;
						}
					} else if (obj.quitDrinking === 'REMAIN') {
						data.text += ` 未戒酒`;
					}
				} else {
					data.text = '无';
				}
			}
			if (ill === 'allergy') {
				if (obj.allergy === 'SICK') {
					data.text = !!obj.allergyInfo ?
						`${obj.allergyInfo}` : '无';
				} else {
					data.text = '无';
				}
			}
			relatedHis.push(data);
		});
		switch (type) {
			case 'other':
				list = otherDia;
				break;
			case 'four':
				list = fourHigh;
				break;
			case 'related':
				list = relatedHis;
				break;
			default:
		}
		return list;
	}
	return [];
	/* eslint-disable */
}
