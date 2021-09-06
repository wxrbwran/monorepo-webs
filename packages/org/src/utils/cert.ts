export const formatCertificates2Server = (certificates: any) => {
  const certObj: Store = {};
  if (certificates) {
    Object.keys(certificates).forEach((key) => {
      certificates[key].forEach((imgUrl: string, index: number) => {
        certObj[`${key}${index}`] = imgUrl;
      });
    });
    return certObj;
  }
  return null;
};

export const formatCert2Local = (certificates: Store) => {
  const cert: Store = {};
  if (certificates) {
    const keyArr: string[] = Object.keys(certificates);
    keyArr.forEach((item) => {
      const itemName = item.substring(0, item.length - 1);
      if (cert[itemName]) {
        cert[itemName].push(certificates[item]);
      } else {
        cert[itemName] = [certificates[item]];
      }
    });
    return cert;
  }
  return {};
};
