interface Ires {
  [key:string]: string;
}

export const updateSession = (res:Ires) => {
  window.$storage.setItem('user', res.uid);
  window.$storage.setItem('access_token', res.access_token);
  window.$storage.setItem('refresh_token', res.refresh_token);
};

export const clearSession = () => {
  [
    'access_token',
    'refresh_token',
    'user',
    'role',
    'uid',
    'tel',
    'relationRef',
    'institutionId',
    'reduxState',
    'openedSub',
    'activeNavInstitutionId',
    'institutionName',
    'accid2session',
    'activeNavPath',
    'QCDoctorId',
    'onlyConsultations',
  ]
    .forEach((item) => {
      localStorage.removeItem(item);
    });
};
