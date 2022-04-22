declare interface ModalProps {
  title?: string;
  extra?: React.ReactElement;
}

declare interface Window {
  $api: Store;
  $table_current: number;
  $storage: {
    setType: (key: 'localStorage' | 'sessionStorage') => any;
    init: () => any;
    getItem: (key: string) => string;
    setItem: (key: string, val: any) => void;
    removeItem: (key: string) => void;
    clear: () => void;
  };
}
interface CommonData {
  [index: string]: any;
}
interface IRole {
  id?: string;
  name?: string;
  labels?: string[];
  interval?: IInterval;
  rsConfig?: IRsConfig;
  subject?: ISubject;
}
interface Iwcl {
  wcId?: string;
  ns?: INs;
  roles?: IRole[]
}
