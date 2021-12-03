import type { IIndexItem } from './index';

export const isSystem = (h: IIndexItem) => h.source === 'SYSTEM';
export const isOneSelf = (h: IIndexItem, sid: string) => h.source === 'DOCTOR' && h.sourceSid === sid;
export const isOthers = (h: IIndexItem, sid: string) => h.source === 'DOCTOR' && h.sourceSid !== sid;
