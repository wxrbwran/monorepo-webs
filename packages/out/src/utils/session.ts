type Ires = Record<string, string>;

export const updateSession = (res: Ires) => {
  window.$storage.setItem('uid', res.uid);
  window.$storage.setItem('access_token', res.access_token);
  window.$storage.setItem('refresh_token', res.refresh_token);
};

export const clearSession = () => {
  ['access_token', 'refresh_token', 'uid'].forEach((item) => {
    window.$storage.removeItem(item);
  });
};
