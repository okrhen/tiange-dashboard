import React, { Suspense } from 'react';
import {
  Link, navigate, Redirect, RouteComponentProps, Router,
} from '@reach/router';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Divider,
  List,
  IconButton,
  Grid,
  Tooltip,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Container,

} from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {
  DashboardOutlined,
  ShoppingCart,
  Receipt,
  Settings,
  ExitToApp,
  MonetizationOnOutlined,
  ArrowBack,
} from '@material-ui/icons';
import { ILoginProps } from 'interfaces/screens/Login.interface';
import styled from 'styled-components';
import useAuth from 'hooks/useAuth';

const Login = React.lazy(() => import('screens/Login'));
const Dashboard = React.lazy(() => import('screens/Dashboard'));
const Inventory = React.lazy(() => import('screens/Inventory'));
const AddProduct = React.lazy(() => import('screens/Inventory/AddProduct'));
const Sales = React.lazy(() => import('screens/Sales'));
const Invoices = React.lazy(() => import('screens/Invoices'));

const Users = React.lazy(() => import('screens/Users'));
const AddUser = React.lazy(() => import('screens/Users/AddUser'));
const Categories = React.lazy(() => import('screens/Product/Categories'));
const AddCategories = React.lazy(() => import('screens/Product/Categories/AddCategories'));
const EditCategories = React.lazy(() => import('screens/Product/Categories/EditCategories'));

interface IMainApp extends RouteComponentProps {
  children: any;
}

const AppRouterWrapper = styled(Router)`
  flex: 1;
  height: 100%;
`;

const pages = [
  {
    page: 'dashboard',
    path: 'dashboard',
    Icon: DashboardOutlined,
    partial: false,
  },
  {
    page: 'sales',
    path: 'sales',
    Icon: MonetizationOnOutlined,
    partial: true,
  },
  {
    page: 'inventory',
    path: 'inventory',
    Icon: ShoppingCart,
    partial: true,
  },
  {
    page: 'invoices',
    path: 'invoices',
    Icon: Receipt,
    partial: true,
  },
];

const settings = [
  {
    page: 'Users',
    path: 'users',
    partial: true,
  },
  {
    page: 'Categories',
    path: 'categories',
    partial: true,
  },
  {
    page: 'Barcode Type',
    path: 'barcode',
    partial: true,
  },
];

const drawerWidth = 70;

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  settingsRoot: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: '80px 20px 20px',
    height: '100vh',
    overflow: 'auto',
  },
  listItemBtn: {
    display: 'flex',
    justifyContent: 'center',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  listItem: {
    minHeight: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    '&:hover': {
      backgroundColor: '#ddd',
    },
  },
  listContainer: {
    height: '100%',
    width: '100%',
  },
  settingsLeftMenu: {
    paddingTop: 60,
    backgroundColor: '#f3f3f3',
    height: '100%',
    width: '100%',
  },
  listAlignRight: {
    justifyContent: 'flex-end',
    textAlign: 'right',
    paddingRight: 40,
  },
  settingsContent: {
    height: '100%',
    padding: 40,
    overflowY: 'auto',
  },
  settingsMenu: {
    textDecoration: 'none',
    color: 'initial',
  },
  isMenuActive: {
    backgroundColor: '#ddd',

    '& .menu-item': {
      color: '#2196f3',
      background: '#ffffff',
    },
  },
  fullHeight: {
    height: '100%',
  },
}));

const NavLink = (props: any) => {
  const classes = useStyles();
  return (
    <Link
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      getProps={({ isCurrent, isPartiallyCurrent }) => {
        const isActive = props.partial
          ? isPartiallyCurrent
          : isCurrent;

        return ({
          style: {
            backgroundColor: isActive ? '#ddd' : 'inherit',
          },
          className: `${props?.className || ''} ${isActive ? classes.isMenuActive : ''}`,
        });
      }}
    />
  );
};

const SettingsComponent = () => (
  <>
    <Link to="/settings/users">
      <Tooltip title="Settings">
        <IconButton>
          <Settings />
        </IconButton>
      </Tooltip>
    </Link>
    <Tooltip title="Sign Out">
      <IconButton>
        <ExitToApp />
      </IconButton>
    </Tooltip>
  </>
);

const MainApp = ({ children }: IMainApp) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar>
          <Typography variant="h6">Tiange ni Bebe</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <Grid
          container
          direction="column"
          justify="space-between"
          className={classes.listContainer}
        >
          <List className={classes.list}>
            {pages.map((item) => (
              <NavLink
                to={item.path}
                className={classes.listItem}
                partial={item.partial}
                key={item.path}
              >
                <item.Icon color="action" />
              </NavLink>
            ))}
          </List>
          <Grid
            container
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <SettingsComponent />
          </Grid>
        </Grid>
      </Drawer>
      <main className={classes.content}>
        <Suspense fallback={(
          <div>
            <CircularProgress color="inherit" />
          </div>
        )}
        >
          {children}
        </Suspense>
      </main>
    </div>
  );
};

const SettingsContainer = ({ children }: ILoginProps) => {
  const classes = useStyles();

  const goBackToDashboard = () => navigate('/dashboard', { replace: true });

  return (
    <Container>
      <div className={classes.settingsRoot}>
        <Grid container alignItems="stretch" direction="row">
          <Grid item xs={2} className={classes.settingsLeftMenu}>
            <ListItem
              button
              className={classes.listAlignRight}
              onClick={goBackToDashboard}
            >
              <ListItemIcon>
                <ArrowBack />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <List
              component="nav"
              aria-label="main mailbox folders"
              dense
            >

              {settings.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={item.page}
                  className={classes.settingsMenu}
                  partial={item.partial}
                >
                  <ListItem
                    button
                    className={`${classes.listAlignRight} menu-item`}
                  >
                    <ListItemText primary={item.page} />
                  </ListItem>
                </NavLink>
              ))}
            </List>
          </Grid>
          <Grid item xs={10} className={classes.settingsContent}>
            <Suspense fallback={(
              <div>
                <CircularProgress color="inherit" />
              </div>
            )}
            >
              {children ? React.cloneElement(children, { style: { height: '100%' } }) : null}
            </Suspense>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

const SharedContainer = ({ children, style }: ILoginProps) => (
  <>
    {children ? React.cloneElement(children, { style: { height: '100%' } }) : null}
  </>
);

const ProtectedRoute = ({ component: Component, children, ...rest }: any) => {
  const auth = useAuth();

  if (auth.token) {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Component {...rest}>
        {children}
      </Component>
    );
  }

  return <Redirect from="" to="/login" noThrow />;
};

const LoginRoute = ({ path }: { path: string }) => (
  <Suspense fallback={(
    <div>
      <CircularProgress color="inherit" />
    </div>
  )}
  >
    <Login path={path} />
  </Suspense>
);

const AppRouter = () => (
  <AppRouterWrapper>
    <LoginRoute path="/login" />
    <ProtectedRoute path="/" component={MainApp}>
      <Dashboard path="/dashboard" default />
      <SharedContainer path="/inventory">
        <Inventory path="/" />
        <AddProduct path="/add-product" />
      </SharedContainer>
      <Sales path="/sales" />
      <Invoices path="/invoices" />
    </ProtectedRoute>
    <ProtectedRoute path="/settings" component={SettingsContainer}>
      <SharedContainer path="users">
        <Users path="/" />
        <AddUser path="add" />
      </SharedContainer>
      <SharedContainer path="categories" style={{ height: '100%' }}>
        <Categories path="/" />
        <AddCategories path="add" />
        <EditCategories path="edit" />
      </SharedContainer>
    </ProtectedRoute>
  </AppRouterWrapper>

);

export default AppRouter;
