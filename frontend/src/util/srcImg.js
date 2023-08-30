// constants.js

export const srcImg = (() => {
  const src1 = "http://13.212.56.39:8080/api/v1/files/image";
  const src2 = "http://192.168.0.101:4000";

  return src1 ? src1 : src2;
})();