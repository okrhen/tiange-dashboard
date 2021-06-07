import { AppContext } from 'App';
import { useContext } from 'react';

const useAuth = () => {
  const { auth } = useContext(AppContext);
  return auth;
};

export default useAuth;
