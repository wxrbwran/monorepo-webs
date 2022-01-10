import util from '@/utils/im_utils';

/**
 * 重新计算时间头
 */
const reCalcAllMessageTime = (msglist) => {
  // 过滤掉类型为timeTag的消息记录，因为计算时间头的时候是拿新的一条记录的time与上条记录的time做比较，而timeTag类型的消息记录不是真正的消息，是网易云信定义的自己的时间头
  const filterMsgList = msglist.filter(
    (item) => item.type !== 'timeTag' && item.type !== 'notification',
  );
  // console.log('filterMsgList', filterMsgList);
  const tempArr = [...filterMsgList];
  if (tempArr.length === 0) return [];
  // 计算时差
  // console.log('tempArr', tempArr);
  tempArr.forEach((msg, index) => {
    if (index === 0) {
      // console.log('msg5555', msglist);
      /* eslint-disable no-param-reassign */
      msg.displayTimeHeader = util.calcTimeHeader(msg.time);
    } else {
      const delta = (msg.time - tempArr[index - 1].time) / (120 * 1000);
      if (delta > 1) {
        // 距离上一条，超过两分钟重新计算头部
        msg.displayTimeHeader = util.calcTimeHeader(msg.time);
      }
    }
  });
  return tempArr;
};

export default reCalcAllMessageTime;
