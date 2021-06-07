import * as yup from 'yup';
import { requiredEmailString, requiredString } from './common.vs';

const loginSchema = yup.object().shape({
  email: requiredEmailString,
  password: requiredString,
});

export {
  // eslint-disable-next-line import/prefer-default-export
  loginSchema,
};
