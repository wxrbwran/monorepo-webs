import React from 'react';

interface IProps {
  text: string,
  conditionType: string,
  condition: IFormatData[],
  date: string
}

function LifeCondition(props : IProps) {
  const {
    text, conditionType, condition, date,
  } = props;
  return (
    <div className="life-condition__item">
      <div>{`${text}(${date || ''})`}</div>
      { condition
        && condition.length > 0
        && conditionType ? (
          <ul className="life-condition__item-content">
            {conditionType === 'DIET' && condition
              .map((dietItem) => (
                <li key={dietItem.name}>
                  { dietItem.name }
                  ：
                  { dietItem.value }
                </li>
              ))}
            {conditionType === 'SPORT' && condition
              .map((sportItem) => (
                <li key={sportItem.name}>
                  {sportItem.name}
                  ：
                  {sportItem.value }
                </li>
              ))}
            {conditionType === 'SLEEP' && condition
              .map((sleepItem) => (
                <li key={sleepItem.name}>
                  { sleepItem.name }
                  ：
                  { sleepItem.value }
                </li>
              ))}
          </ul>
        )
        : <p className="life-condition__item-content">暂无相关信息</p> }
    </div>
  );
}

export default LifeCondition;
