// "certificates": {
//   "badge0": "a.jpeg",
//   "profession0": "b.jpeg",
//   "profession1": "c.jpeg",
//   "qualification0": "d.jpeg"
//   },
// to
// "certificates": {
//     "badge": ["a.jpeg"],
//     "profession": ["b.jpeg", "c.jpeg"],
//     "qualification0": ["d.jpeg"]
//   },
const formatCert = (certificates: ICert & CommonData) => {
  const cert: CommonData = {};
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

export default formatCert;
