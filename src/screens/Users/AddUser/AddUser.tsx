import {
  Breadcrumbs, Grid, TextField, Typography, makeStyles, Button,
} from '@material-ui/core';
import { CancelOutlined, Save } from '@material-ui/icons';
import { Link, navigate } from '@reach/router';
import { ILoginProps } from 'interfaces/screens/Login.interface';
import React from 'react';

const useStyles = makeStyles(() => ({
  formGroup: {
    marginBottom: 10,
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
          disabled
          endIcon={<Save />}
        >
          Save
        </Button>
      </Grid>

    </Grid>
  );
};

function AddUser(props: ILoginProps) {
  const classes = useStyles();

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color="inherit"
          to="../"
          replace
        >
          Users
        </Link>
        <Typography color="textPrimary">Add New</Typography>
      </Breadcrumbs>
      <main className={classes.content}>
        <Grid container>
          <Grid
            container
            direction="row"
            justify="space-between"
            spacing={2}
            className={classes.formGroup}
          >
            <Grid item xs={6}>
              <TextField variant="outlined" label="First Name" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField variant="outlined" label="Last Name" fullWidth />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-between"
            spacing={2}
            className={classes.formGroup}
          >
            <Grid item xs={6}>
              <TextField variant="outlined" label="Username" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField variant="outlined" label="Email Address" fullWidth />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            direction="row"
            className={classes.formGroup}
          >
            <TextField variant="outlined" label="Password" fullWidth />
          </Grid>
          <Grid
            item
            xs={12}
            direction="row"
            className={classes.formGroup}
          >
            <TextField variant="outlined" label="User Type" fullWidth />
          </Grid>
          <FooterAction />
        </Grid>
      </main>
    </div>
  );
}

export default AddUser;
