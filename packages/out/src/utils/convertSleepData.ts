/* eslint-disable no-restricted-syntax */
const questions = {
  SELF_FEELING: '自我感觉睡眠质量',
  SNORING: '是否打鼾',
  SUFFOCATING: '有无憋气憋醒的情况',
  DIFFICULTY_FALLING_ASLEEP: '是否入睡困难',
  EARLY_AWAKENING: '是否早醒',
};

const answers = {
  SELF_FEELING_BEST: '优',
  SELF_FEELING_BETTER: '良',
  SELF_FEELING_BED: '差',
  SNORING_NO: '无',
  SNORING_LIGHT: '轻',
  SNORING_SERIOUS: '重',
  SUFFOCATING_NO: '无',
  SUFFOCATING_OCCASIONALLY: '偶尔',
  SUFFOCATING_OFTEN: '经常',
  DIFFICULTY_FALLING_ASLEEP_EXIST: '是',
  DIFFICULTY_FALLING_ASLEEP_NOT_EXIST: '否',
  EARLY_AWAKENING_EXIST: '是',
  EARLY_AWAKENING_NOT_EXIST: '否',
};

export default function (obj: ISleepContent) {
  const sleepCondition = [];
  if (obj.sleepSituations) {
    for (const sleep of obj.sleepSituations) {
      const data: IFormatData = {};
      data.name = questions[sleep.question];
      data.value = answers[sleep.sleepAnswer];
      sleepCondition.push(data);
    }
  }
  return sleepCondition;
}
