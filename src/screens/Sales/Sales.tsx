import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Grid,
  TextField,
  Typography,
  IconButton,
  Tooltip,
  InputAdornment,
} from '@material-ui/core';
import {
  Add, Edit, Print, GetAppOutlined, SearchOutlined, FilterListOutlined,
} from '@material-ui/icons';
import { navigate } from '@reach/router';
import { ILoginProps } from 'interfaces/screens/Login.interface';
import React from 'react';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    marginTop: 20,
  },
});

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return {
    name, calories, fat, carbs, protein,
  };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function TableActions() {
  const handleNavigate = () => {
    navigate('product/add');
  };

  const actions = [
    { tooltip: 'Add Product', Icon: Add, onClick: handleNavigate },
    { tooltip: 'Edit Product', Icon: Edit },
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

function Sales(props: ILoginProps) {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6" component="p">Sales</Typography>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid
          item
          xs={3}
        >
          <TextField
            id="filled-basic"
            placeholder="Search sales"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              ),
            }}
          />

        </Grid>
        <Grid item>
          <TableActions />
        </Grid>
      </Grid>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Sales;
