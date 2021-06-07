/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Container from '@material-ui/core/Container';

import { ILoginProps } from 'interfaces/screens/Login.interface';
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import { loginSchema } from 'utils/validation-schema/login.vs';
import { useMutation } from '@apollo/client';
import { SIGNIN_USER } from 'graphql/mutation/login';
import useToast from 'hooks/useToast';
import useAuth from 'hooks/useAuth';
import { useNavigate } from '@reach/router';

const useStyles = makeStyles(() => createStyles({
  container: {
    height: '100vh',
  },
  formField: {
    margin: '10px 0',
  },
}));

// eslint-disable-next-line
function Login(props: ILoginProps) {
  const classes = useStyles();
  const navigate = useNavigate();
  const toast = useToast();
  const { setToken } = useAuth();

  const [signInUser] = useMutation(SIGNIN_USER, {
    onError: (err) => {
      toast.onOpenSnackbar({
        open: true,
        message: err.message,
        severity: 'error',
      });
    },
    onCompleted: ({ signInUser: res }) => {
      localStorage.setItem('token', res.token);
      setToken(res.token);
      navigate('dashboard', { replace: true });
    },
  });

  return (
    <Container>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.container}
      >
        <Grid item xs={12} md={4}>
          <Card>
            <>
              <Formik
                initialValues={{
                  email: undefined,
                  password: undefined,
                }}
                validationSchema={loginSchema}
                onSubmit={(values) => {
                  signInUser({
                    variables: {
                      email: values.email,
                      password: values.password,
                    },
                  });
                }}
              >
                {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  touched,
                  errors,
                  isValid,
                  dirty,
                }) => {
                  const sharedProps = {
                    onChange: handleChange,
                    onBlur: handleBlur,
                    fullWidth: true,
                    className: classes.formField,
                  };

                  const handleClickSubmit = (e: any) => handleSubmit(e);

                  return (
                    <CardContent>
                      <Typography
                        variant="h4"
                        component="h4"
                      >
                        Tiange Login
                      </Typography>
                      <form>
                        <TextField
                          {...sharedProps}
                          label="Email"
                          name="email"
                          variant="filled"
                          value={values.email}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email ? errors.email : ''}
                        />
                        <TextField
                          {...sharedProps}
                          value={values.password}
                          label="Password"
                          name="password"
                          type="password"
                          variant="filled"
                          error={Boolean(touched.password && errors.password)}
                          helperText={touched.password && errors.password ? errors.password : ''}

                        />
                        <Grid
                          container
                          direction="row"
                          justify="flex-end"
                          alignItems="flex-end"
                        >
                          <Button
                            color="primary"
                            size="large"
                            variant="contained"
                            className={classes.formField}
                            disabled={!(isValid && dirty)}
                            onClick={handleClickSubmit}
                          >
                            Login
                          </Button>
                        </Grid>
                      </form>
                    </CardContent>
                  );
                }}
              </Formik>
            </>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
