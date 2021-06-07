/* eslint-disable react/jsx-props-no-spreading */
import {
  Breadcrumbs,
  Paper,
  Grid,
  TextField,
  Typography,
  Button,
  FormGroup,
  makeStyles,
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
  IconButton,
  FormHelperText,
  MenuItem,
  Select,
} from '@material-ui/core';
import { Link, navigate } from '@reach/router';
import { ILoginProps } from 'interfaces/screens/Login.interface';
import React from 'react';
import {
  CachedOutlined, CancelOutlined, InsertPhotoOutlined, Save,
} from '@material-ui/icons';
import { useQuery, gql } from '@apollo/client';
import { IProductCategory } from 'interfaces/screens/ProductCategories';
import { Formik } from 'formik';

const useStyles = makeStyles(() => ({
  formGroup: {
    margin: '15px 0',
  },
  inputLabel: {
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    boxSizing: 'border-box',
    marginTop: 20,
  },
}));

const prodInitValues: Record<string, string | number | undefined> = {
  barcode: undefined,
  sku: undefined,
  name: undefined,
  barcodeSymbology: undefined,
  productCategory: undefined,
  cost: undefined,
  price: undefined,
  quantity: undefined,
  quantityType: undefined,
  description: '',
};

const FooterAction = () => {
  const handleCancel = () => navigate('/inventory', { replace: true });

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
          type="button"
        >
          Cancel
        </Button>
      </Grid>
      <Grid item>
        <Button
          size="large"
          color="default"
          disableElevation
          variant="contained"
          endIcon={<CachedOutlined />}
          type="reset"
        >
          Reset
        </Button>
      </Grid>
      <Grid item>
        <Button
          size="large"
          color="primary"
          disableElevation
          variant="contained"
          endIcon={<Save />}
          type="submit"
        >
          Save
        </Button>
      </Grid>

    </Grid>
  );
};

const GET_PROD_CATEGORIES = gql`
  query ProductCategories {
     getProductCategories {
      name
      id
     }
  }
`;

function AddProduct(props: ILoginProps) {
  const classes = useStyles();
  const { data } = useQuery(GET_PROD_CATEGORIES);

  return (
    <div>
      <Grid container>
        <Grid
          item
          xs={6}
          alignItems="center"
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              color="inherit"
              to="/inventory"
              replace
            >
              Inventory
            </Link>
            <Typography color="textPrimary">Add New</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Paper className={classes.content}>
        <Formik
          initialValues={prodInitValues}
          onSubmit={(values) => {
            console.log('values ==>', values);
          }}
        >
          {({
            values, handleChange, handleBlur, handleSubmit,
          }) => {
            const commonProps = {
              onChange: handleChange,
              onBlur: handleBlur,
            };

            return (
              <form>
                <Grid
                  container
                  spacing={2}
                  justify="space-between"
                >
                  <Grid item xs={8}>
                    <span>Product Details</span>
                    <FormGroup className={classes.formGroup}>
                      <TextField
                        variant="outlined"
                        label="Barcode"
                        helperText="Required"
                        name="barcode"
                        value={values.barcode}
                        {...commonProps}
                      />
                    </FormGroup>
                    <FormGroup className={classes.formGroup}>
                      <FormControl variant="outlined">
                        <InputLabel htmlFor="sku" className={classes.inputLabel}>SKU</InputLabel>
                        <OutlinedInput
                          id="sku"
                          endAdornment={(
                            <InputAdornment position="end">
                              <Button>Generate</Button>
                            </InputAdornment>
                          )}
                          name="sku"
                          value={values.sku}
                          {...commonProps}
                        />
                      </FormControl>
                    </FormGroup>
                    <FormGroup className={classes.formGroup}>
                      <TextField
                        variant="outlined"
                        label="Name"
                        helperText="Required"
                        name="name"
                        value={values.name}
                        {...commonProps}
                      />
                    </FormGroup>
                    <FormGroup className={classes.formGroup}>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        spacing={2}
                      >
                        <Grid item xs={6}>
                          <TextField
                            variant="outlined"
                            label="Barcode Symbology"
                            fullWidth
                            name="barcodeSymbology"
                            value={values.barcodeSymbology}
                            {...commonProps}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <FormControl className="" variant="outlined" fullWidth>
                            <InputLabel id="productCategory" className={classes.inputLabel}>Category</InputLabel>
                            <Select
                              labelId="productCategory"
                              id="productCategory"
                              name="productCategory"
                              value={values.productCategory}
                              {...commonProps}
                            >
                              {
                                data && data.getProductCategories
                                && data.getProductCategories.map((item: IProductCategory) => (
                                  <MenuItem value={item.id}>
                                    {item.name}
                                  </MenuItem>
                                ))
                              }
                            </Select>
                            <FormHelperText>Required</FormHelperText>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </FormGroup>
                    <FormGroup className={classes.formGroup}>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        spacing={2}
                      >
                        <Grid item xs={6}>
                          <TextField
                            variant="outlined"
                            label="Cost"
                            type="number"
                            fullWidth
                            helperText="Required"
                            name="cost"
                            value={values.cost}
                            {...commonProps}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            variant="outlined"
                            label="Price"
                            type="number"
                            fullWidth
                            helperText="Required"
                            name="price"
                            value={values.price}
                            {...commonProps}
                          />
                        </Grid>
                      </Grid>
                    </FormGroup>
                    <FormGroup className={classes.formGroup}>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        spacing={2}
                      >
                        <Grid item xs={6}>
                          <TextField
                            variant="outlined"
                            label="Quantity"
                            type="number"
                            fullWidth
                            helperText="Required"
                            name="quantity"
                            value={values.quantity}
                            {...commonProps}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            variant="outlined"
                            label="Quantity Type"
                            helperText="Required"
                            fullWidth
                            name="quantityType"
                            value={values.quantityType}
                            {...commonProps}
                          />
                        </Grid>
                      </Grid>
                    </FormGroup>
                    <FormGroup className={classes.formGroup}>
                      <TextField
                        variant="outlined"
                        label="Description"
                        multiline
                        name="description"
                        value={values.description}
                        {...commonProps}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid
                    xs={3}
                    container
                    direction="row"
                    justify="center"
                    alignItems="stretch"
                  >
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      alignItems="center"
                    >
                      <IconButton>
                        <InsertPhotoOutlined />
                      </IconButton>
                      <Typography> Select Image</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <FooterAction />
              </form>
            );
          }}
        </Formik>
      </Paper>
    </div>
  );
}

export default AddProduct;
