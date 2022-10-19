
export const generateOtp = () => {
    let otp = "";
  for (let index = 0; index < 4; index++) {
    const randVal = Math.round(Math.random() * 9);
    otp = otp + randVal;
  }
  return otp;
};
