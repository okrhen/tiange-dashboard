import { ApolloProvider } from '@apollo/client';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import client from 'config/apollo/client';
import React, { useState } from 'react';
import AppRouter from 'router';
import styled, { createGlobalStyle } from 'styled-components';

const Container = styled.div`
  height: 100vh;
  
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0
  }
`;

interface IAppContextProps {
  snackbar: {
    onOpenSnackbar: React.Dispatch<React.SetStateAction<InitProps>>;
  }
  auth: {
    token?: string
    setToken: React.Dispatch<React.SetStateAction<string | undefined>>
  }
}

export const AppContext = React.createContext<IAppContextProps>({
  snackbar: {
    onOpenSnackbar: () => null,
  },
  auth: {
    token: undefined,
    setToken: () => null,
  },
});

interface InitProps {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info'
}

const initialValues: InitProps = {
  open: false,
  message: '',
  severity: 'success',
};

function App() {
  const appToken = localStorage.getItem('token') || undefined;
  const [openSnackbar, setOpenSnackbar] = useState<InitProps>(initialValues);
  const [token, setToken] = useState<string | undefined>(appToken);

  const handleClose = () => setOpenSnackbar(initialValues);

  return (
    <AppContext.Provider
      value={{
        snackbar: {
          onOpenSnackbar: setOpenSnackbar,
        },
        auth: {
          token,
          setToken,
        },
      }}
    >
      <ApolloProvider client={client}>
        <GlobalStyle />
        <Snackbar
          open={openSnackbar.open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleClose} severity={openSnackbar.severity}>
            {openSnackbar.message}
          </Alert>
        </Snackbar>
        <Container>
          <AppRouter />
        </Container>
      </ApolloProvider>
    </AppContext.Provider>
  );
}

export default App;
