import { gql } from '@apollo/client';

const SIGNIN_USER = gql`
  mutation signInUser($email: String!, $password: String!) {
    signInUser(email: $email, password: $password) {
      token
    }
  }
`;

export {
  // eslint-disable-next-line import/prefer-default-export
  SIGNIN_USER,
};
