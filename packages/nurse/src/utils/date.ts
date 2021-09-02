export const getDateVal = (val: number | null, type: string) => {
  if (val) {
    switch (type) {
      case 'year':
        return new Date(val).getFullYear();
      case 'month':
        return new Date(val).getMonth() + 1;
      case 'day':
        return new Date(val).getDate();
      default:
        return '';
    }
  }
  return '';
};

export const getDurationText = (ms: number) => {
  const allSeconds = parseInt(ms / 1000, 0);
  let result = '';
  let hours = '';
  let minutes = '';
  let seconds = '';
  if (allSeconds >= 3600) {
    hours = parseInt(allSeconds / 3600, 0);
    result += `00${hours}`.slice(-2);
    result += ':';
  }
  if (allSeconds >= 60) {
    minutes = parseInt((allSeconds % 3600) / 60, 0);
    result += `00${minutes}`.slice(-2);
    result += ':';
  } else {
    result += '00 : ';
  }
  seconds = parseInt((allSeconds % 3600 % 60), 0);
  result += `00${seconds}`.slice(-2);
  return result;
};
