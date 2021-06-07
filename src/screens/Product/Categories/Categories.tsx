import { useQuery } from '@apollo/client';
import {
  makeStyles,
  Grid,
  Typography,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import {
  Add, Print, GetAppOutlined, SearchOutlined, FilterListOutlined, InfoOutlined, DeleteOutline,
} from '@material-ui/icons';
import { DataGrid } from '@material-ui/data-grid';

import { navigate, useLocation } from '@reach/router';
import { loader } from 'graphql.macro';
import { ILoginProps } from 'interfaces/screens/Login.interface';
import React from 'react';

const CategoriesGql = loader('../../../graphql/query/categories.gql');

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    marginTop: 20,
    height: '100%',
  },
  container: {
    height: '100%',
    display: 'grid',
    gridAutoFlow: 'row',
    gridTemplateRows: 'max-content',
  },
});

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', flex: 1 },
  {
    field: '',
    headerName: 'Action',
    flex: 0.3,
    renderCell: (props: any) => <span />,
  },
];

function TableActions() {
  const location = useLocation();
  const handleNavigate = () => {
    navigate(`${location.pathname}/add`);
  };

  const actions = [
    { tooltip: 'Search', Icon: SearchOutlined },
    { tooltip: 'Add User', Icon: Add, onClick: handleNavigate },
    { tooltip: 'Delete Product', Icon: DeleteOutline },
    { tooltip: 'Print', Icon: Print },
    { tooltip: 'Download', Icon: GetAppOutlined },
    { tooltip: 'Filter', Icon: FilterListOutlined },
  ];

  return (
    <>
      { actions.map((action) => (
        <Tooltip title={action.tooltip} key={action.tooltip}>
          <IconButton onClick={action?.onClick}>
            <action.Icon />
          </IconButton>
        </Tooltip>
      ))}
    </>
  );
}

function Categories(props: ILoginProps) {
  const classes = useStyles();
  const { loading, error, data = [] } = useQuery(CategoriesGql);

  let { getProductCategories: rowData = [] } = data;
  rowData = loading || error ? [] : rowData;

  const handleClickInfo = (cellProps: any) => {
    if (props?.navigate) {
      props.navigate('edit', {
        state: cellProps.row,
      });
    }
  };

  columns[2].renderCell = (cellProps: any) => (
    <IconButton color="primary" aria-label="info" onClick={() => handleClickInfo(cellProps)}>
      <InfoOutlined />
    </IconButton>
  );

  return (
    <div
      className={classes.container}
    >
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="stretch"
      >
        <Grid item container xs={12}>
          <Typography variant="h6" component="p">Categories</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          container
          justify="flex-end"
          alignItems="stretch"
        >
          <TableActions />
        </Grid>
      </Grid>
      <Grid container xs={12}>
        <Grid
          container
          className={classes.tableContainer}
        >
          <DataGrid
            rows={rowData}
            columns={columns}
            pageSize={10}
            checkboxSelection
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Categories;
