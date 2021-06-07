import { gql } from '@apollo/client';

const CREATE_PRODUCT_CATEGORY = gql`
  mutation createProductCategory($name: String!) {
    createProductCategory(name: $name) {
      id
      name
    }
  }
`;

const UPDATE_PRODUCT_CATEGORY = gql`
  mutation updateProductCategory($name: String!, $id: ID!) {
    updateProductCategory(name: $name, id: $id) {
      id
      name
    }
  }
`;

export {
  CREATE_PRODUCT_CATEGORY,
  UPDATE_PRODUCT_CATEGORY,
};
