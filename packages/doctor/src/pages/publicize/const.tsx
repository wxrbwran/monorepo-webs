export interface IList {
  content: {
    address: string;
    convertAddress: string;
    cover: string;
    filename: string;
  };
  id: string;
  type: number;
  inSchedule: boolean; // 是否有发送计划
}
export interface IScale {
  id: number;
  title: string;
  subTitle: string;
  question: [];
}
export interface Ioptions {
  content: string;
  checked?: boolean;
}
export interface IQuestions {
  type: string;
  code?: number;
  detail: {
    checkedArr?: string[] | string; // 多选题，h5填写完返回的是string[]。单选题，h5返回的是string
    stem: string | string[];
    options: Ioptions[];
    answer?: string | string[];
  };
}
export interface IValues {
  conditions: {
    id: string;
    type: string;
    value: string;
    min: number;
    max: number;
  }[];
  custom: number[];
  frequencyType: string;
  group: string[];
  time: string;
  content?: IList[];
}
export interface IRule {
  condition: {
    items: {
      name: string;
      description: string;
      items: {
        name: string;
      }[];
    }[];
  };
  namespace: {
    name: string;
  };
  start: {
    name: string;
  };
}
export const EducationType = {
  video: '视频',
  accompany: '随访表',
  document: '文件',
  article: '文章',
  picture: '图片',
  audio: '音频',
  crf: 'CRF量表',
};
export const AcceptType = {
  video: '.mp4',
  document: '.doc,.docx,.xlsx,.xls,.pdf',
  picture: '.jpg,.jpeg,.png',
  audio: '.mp3, .wav',
};
export const businessType = {
  video: 4,
  document: 300,
  picture: 0,
  audio: 4,
};
export const sendType = [
  {
    key: 'once',
    value: '自定义',
  },
  {
    key: 'rolling',
    value: '循环下发',
  },
];
export const staticType = [
  {
    key: 'age',
    value: '年龄',
  },
  {
    key: 'sex',
    value: '性别',
  },
  {
    key: 'diagnosis',
    value: '诊断',
  },
  {
    key: 'treatment',
    value: '处理',
  },
];
export const beforeEl =
  '<!DOCTYPE html>' +
  '<html lang="en">' +
  '  <head>' +
  '    <meta charset="UTF-8" />' +
  '    <meta http-equiv="X-UA-Compatible" content="IE=edge" />' +
  '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />' +
  '    <title>Document</title>' +
  '    <style>' +
  '      img, video {' +
  '        width: 100%;' +
  '      }' +
  '    </style>' +
  '    <script>' +
  '      document.onclick = function (event) {' +
  '        event = event || window.event;' +
  "        console.log('event', event);" +
  '        fetchJSPost.postMessage(JSON.stringify({ src: event.target.currentSrc }));' +
  '      };' +
  '    </script>' +
  '  </head>' +
  '  <body>';
export const alfterEl = '  </body>' + '</html>';
