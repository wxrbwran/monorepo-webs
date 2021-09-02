interface IIndex {
  [k: string]: any,
}
const morningTimes = [];
const noonTimes = [];
const eveningTimes = [];

let i = 4;
let j = 10;
let k = 16;
let a = 0;
while (i < 10) {
  const time = `0${i}`;
  morningTimes.push(`${time}:00`);
  morningTimes.push(`${time}:30`);
  i++;
}

while (j < 16) {
  noonTimes.push(`${j}:00`);
  noonTimes.push(`${j}:30`);
  j++;
}

while (k <= 23) {
  eveningTimes.push(`${k}:00`);
  eveningTimes.push(`${k}:30`);
  k++;
}
while (a < 4) {
  const time = `0${a}`;
  eveningTimes.push(`${time}:00`);
  eveningTimes.push(`${time}:30`);
  a++;
}

const times:IIndex = {
  morning: morningTimes,
  morningText: '早',
  noon: noonTimes,
  noonText: '中',
  evening: eveningTimes,
  eveningText: '晚',
};

export default times;
