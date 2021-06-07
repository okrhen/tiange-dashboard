import {
  Breadcrumbs, Grid, TextField, Typography, makeStyles, Button, CircularProgress,
} from '@material-ui/core';
import { Formik } from 'formik';
import { CancelOutlined, Save } from '@material-ui/icons';
import { Link, navigate, WindowLocation } from '@reach/router';
import { ILoginProps } from 'interfaces/screens/Login.interface';
import React, { useContext, useState } from 'react';
import { addProductCategorySchema } from 'utils/validation-schema/categories.vs';
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT_CATEGORY, UPDATE_PRODUCT_CATEGORY } from 'graphql/mutation/categories';
import { Alert } from '@material-ui/lab';
import { AppContext } from 'App';
import { IHasError } from 'interfaces/screens/ProductCategories';

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    width: '100%',
  },
  formGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    boxSizing: 'border-box',
    marginTop: 20,
    width: '100%',
  },
}));

const FooterAction = ({ valid, onSubmit, isSubmitting }: any) => {
  const handleCancel = () => navigate('../categories', { replace: true });

  return (
    <Grid
      container
      justify="flex-end"
      spacing={2}
    >
      <Grid item>
        <Button
          size="large"
          color="secondary"
          disableElevation
          variant="contained"
          endIcon={<CancelOutlined />}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Grid>
      <Grid item>
        <Button
          size="large"
          color="primary"
          disableElevation
          variant="contained"
          disabled={!valid || isSubmitting}
          onClick={onSubmit}
          endIcon={isSubmitting
            ? <CircularProgress size={20} color="inherit" />
            : <Save />}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

const initialValues = {
  form: {
    name: '',
    id: '',
  },
  errorState: {
    message: '',
    error: false,
  },
};

const isAddCategory = (location: WindowLocation<unknown> | undefined) => {
  let isCreate = true;
  if (location) {
    const { state: { name } }: any = location;
    if (name) {
      isCreate = false;
    }
  }

  return isCreate;
};

function AddCategories(props: ILoginProps) {
  const { location } = props;
  const isAddNew = isAddCategory(location);

  if (!isAddNew && location) {
    const { state: { name: productCategoryName, id: ID } }: any = location;
    initialValues.form = {
      name: productCategoryName,
      id: ID,
    };
  }

  const { snackbar } = useContext(AppContext);
  const classes = useStyles();
  const [hasError, setHasError] = useState<IHasError>(initialValues.errorState);

  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const [createProductCategory] = useMutation(CREATE_PRODUCT_CATEGORY, {
    onError: (err) => {
      setIsFormSubmitting(false);
      setHasError({
        error: true,
        message: err.message,
      });
    },
    onCompleted: ({ createProductCategory: res }) => {
      setIsFormSubmitting(false);
      snackbar.onOpenSnackbar({
        open: true,
        message: `${res[0]?.name} added successfully.`,
        severity: 'success',
      });
    },
  });

  const [updateProductCategory] = useMutation(UPDATE_PRODUCT_CATEGORY, {
    onError: (err) => {
      setIsFormSubmitting(false);
      setHasError({
        error: true,
        message: err.message,
      });
    },
    onCompleted: ({ updateProductCategory: res }) => {
      setIsFormSubmitting(false);
      snackbar.onOpenSnackbar({
        open: true,
        message: `${res[0]?.name} updated successfully.`,
        severity: 'success',
      });
    },
  });

  return (
    <div className={classes.container}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color="inherit"
          to="../"
          replace
        >
          Categories
        </Link>
        <Typography color="textPrimary">
          {isAddNew ? 'Add New' : 'Edit'}
          {' '}
        </Typography>
      </Breadcrumbs>
      <main className={classes.content}>
        <Formik
          enableReinitialize
          initialValues={initialValues.form}
          validationSchema={addProductCategorySchema}
          onSubmit={(values) => {
            setIsFormSubmitting(true);
            if (isAddNew) {
              createProductCategory({ variables: { name: values.name } });
            } else {
              updateProductCategory({ variables: { name: values.name, id: values.id } });
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
            dirty,
            isSubmitting,
          }) => (
            <>
              {hasError.error && (
                <Alert
                  severity="error"
                  className={classes.formGroup}
                >
                  {hasError.message}
                </Alert>
              )}
              <Grid
                container
                xs={12}
                item
                className={classes.formGroup}
              >
                <TextField
                  name="name"
                  variant="outlined"
                  label="Category Name"
                  value={values.name}
                  fullWidth
                  onChange={(e) => {
                    setHasError(initialValues.errorState);
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name ? 'Field is required.' : ''}
                />
              </Grid>
              <FooterAction
                onSubmit={handleSubmit}
                valid={isValid && dirty}
                isSubmitting={isSubmitting && isFormSubmitting}
              />
            </>
          )}
        </Formik>
      </main>
    </div>
  );
}

export default AddCategories;
