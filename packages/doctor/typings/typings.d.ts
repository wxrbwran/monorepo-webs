declare module 'slash2';
declare module 'antd-theme-webpack-plugin';
declare module 'qrcode.react';

declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'react-copy-to-clipboard';
declare module 'react-fittext';
declare module '@antv/data-set';
declare module 'nzh/cn';
declare module 'webpack-theme-color-replacer';
declare module 'webpack-theme-color-replacer/client';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}

declare interface Window {
  NIM: Store; // SDK
  nim: Store; // NIM 实例
  $dva: Store;
  $store: Store;
  $api: Store;
  reloadAuthorized: Store;
  $storage: {
    setType: (key: 'localStorage' | 'sessionStorage') => any;
    init: () => any;
    getItem: (key: string) => string;
    setItem: (key: string, val: any) => void;
    removeItem: (key: string) => void;
    clear: () => void;
  };
  echarts: any;
}

declare interface ILocation extends Partial<Location> {
  query: Record<string, string>;
}
