import * as yup from 'yup';

const addProductCategorySchema = yup.object().shape({
  name: yup.string().required(),
});

export {
  // eslint-disable-next-line import/prefer-default-export
  addProductCategorySchema,
};
