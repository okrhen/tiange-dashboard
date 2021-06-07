import * as yup from 'yup';

const requiredEmailString = yup.string().email().required();
const requiredString = yup.string().required();
const requiredNumber = yup.number().required();

export {
  requiredEmailString,
  requiredString,
  requiredNumber,
};
