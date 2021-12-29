export var EducationType = {
    video: '视频',
    accompany: '随访表',
    document: '文件',
    article: '文章',
    picture: '图片',
    audio: '音频',
};
export var AcceptType = {
    video: '.mp4',
    document: '.doc,.docx,.xlsx,.xls,.pdf',
    picture: '.jpg,.jpeg,.png',
    audio: '.mp3, .wav',
};
export var businessType = {
    video: 4,
    document: 300,
    picture: 0,
    audio: 4,
};
export var sendType = [
    {
        key: 'normal',
        value: '自定义',
    },
    {
        key: 'rolling',
        value: '循环下发',
    },
];
export var staticType = [
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
export var beforeEl = '<!DOCTYPE html>' +
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
export var alfterEl = '  </body>' + '</html>';
