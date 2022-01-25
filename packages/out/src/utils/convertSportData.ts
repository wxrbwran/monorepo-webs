/* eslint-disable no-restricted-syntax */
import { keys } from 'lodash';

const patterns = {
  STROLL: '散步',
  BRISK_WALKING: '快走',
  RUNNING: '跑步',
  BICYCLING: '骑车',
  BADMINTON: '羽毛球',
  TENNIS: '乒乓球',
  SWIMMING: '游泳',
  DANCE: '跳舞',
  TAI_JI: '太极',
  CLIMBING: '爬山',
  DUMBBELL: '哑铃',
  OTHER_AEROBIC: '其他有氧运动',
  OTHER_ANAEROBIC: '其他无氧运动',
  OTHER: '其他',
};

const strength = {
  SLIGHT: '微微出汗',
  SWEAT: '呼吸加快+出汗',
  PROFUSE: '大汗淋漓',
  POOR_BREATH: '呼吸不畅',
  PALPITATION: '心慌胸痛',
};

export default function (obj: ISportContent) {
  const sportCondition = [];
  const sportArray = [];
  const sportItems = keys(obj);
  for (const key of sportItems) {
    const data: IFormatData = {};
    switch (key) {
      case 'regular':
        data.name = '规律运动';
        if (obj[key]) {
          data.value = '是';
        } else {
          data.value = '否';
        }
        break;
      case 'patterns':
        data.name = '运动方式';
        for (const pattern of obj[key]) {
          sportArray.push(patterns[pattern]);
        }
        data.value = sportArray.join(',');
        break;
      case 'strength':
        data.name = '运动强度';
        data.value = strength[obj.strength];
        break;
      case 'time':
        data.name = '运动时间';
        data.value = obj.time.value;
        break;
      case 'heartRate':
        data.name = '运动后心率监测';
        data.value = obj.heartRate.monitor
          ? `${obj.heartRate.value}次` : '暂无检测';
        break;
      default:
        break;
    }
    sportCondition.push(data);
  }
  return sportCondition;
}
