import { yinYangMap } from './consts';

export const getReferenceTitle = (reference: TReference): string => {
  const { type, value, secondValue } = reference;
  switch (type) {
    case 'RANGE':
      return `${value}-${secondValue}`;
    case 'GT':
      return `>${value}`;
    case 'LT':
      return `<${secondValue}`;
    case 'AROUND':
      return `${value}±${secondValue}`;
    case 'RADIO':
      return `${yinYangMap[value as string]}`;
    case 'OTHER':
    default:
      return '';
  }
};

export const noop = () => {};
