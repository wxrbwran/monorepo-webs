export const isSystem = (h: TIndexItem) => h.source === 'SYSTEM';
export const isOneSelf = (h: TIndexItem, sid: string) =>
  (h.source === 'DOCTOR' || !h.source) && (h.sourceSid === sid);
export const isOthers = (h: TIndexItem, sid: string) =>
  (h.source === 'DOCTOR' || !h.source) && h.sourceSid !== sid;
