import * as yup from 'yup';

const addProductSchema = yup.object().shape({
  name: yup.string().required(),
});

export {
  // eslint-disable-next-line import/prefer-default-export
  addProductSchema,
};
