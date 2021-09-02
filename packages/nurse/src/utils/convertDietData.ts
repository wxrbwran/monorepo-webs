/* eslint-disable no-restricted-syntax */
import { keys } from 'lodash';

export default function (obj: IDiatContent) {
  const dietCondition = [];
  const dietItems = keys(obj);
  for (const dietItem of dietItems) {
    const data:IFormatData = {};
    switch (dietItem) {
      case 'mainFood':
        data.name = '主食';
        data.value = obj[dietItem] ? obj[dietItem].value : '暂无'; break;
      case 'meat':
        data.name = '肉类';
        data.value = obj[dietItem] ? obj[dietItem].value : '暂无'; break;
      case 'vegetable':
        data.name = '蔬菜';
        data.value = obj[dietItem] ? obj[dietItem].value : '暂无'; break;
      case 'oil':
        data.name = '食用油';
        data.value = obj[dietItem] ? obj[dietItem].value : '暂无'; break;
      case 'milk':
        data.name = '奶类';
        data.value = obj[dietItem] ? obj[dietItem].value : '暂无'; break;
      case 'salt':
        data.name = '食用盐';
        data.value = obj[dietItem] ? obj[dietItem].value : '暂无'; break;
      case 'egg':
        data.name = '蛋黄';
        data.value = obj[dietItem] ? obj[dietItem].value : '暂无'; break;
      case 'fruit':
        data.name = '水果';
        data.value = obj[dietItem] ? obj[dietItem].value : '暂无'; break;
      case 'animalViscera':
        data.name = '动物脑内脏';
        data.value = obj[dietItem] ? obj[dietItem].value : '暂无'; break;
      default:
        break;
    }
    dietCondition.push(data);
  }
  return dietCondition;
}
