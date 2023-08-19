// constants.js

export const srcImg = (() => {
  const src1 = "http://192.168.1.163:4000";
  const src2 = "http://192.168.0.101:4000";

  return src1 ? src1 : src2;
})();