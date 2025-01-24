const requiredAndErrorMessage: [boolean, string] = [
  true,
  '{PATH} field is required!',
];
const requiredAndNonNegativeErrorMessage: [number, string] = [
  0,
  'value of {PATH} can not be negative',
];

const commonConstants = {
  requiredAndErrorMessage,
  requiredAndNonNegativeErrorMessage,
};

export default commonConstants;
