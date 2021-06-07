import { AppContext } from 'App';
import { useContext } from 'react';

const useToast = () => {
  const { snackbar } = useContext(AppContext);
  return snackbar;
};

export default useToast;
