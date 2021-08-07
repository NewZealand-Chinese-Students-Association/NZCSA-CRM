import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles, alpha } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { Button, Grid, IconButton } from '@material-ui/core';
import { element } from 'prop-types';
import PDF from './PDF';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.grey,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 10
  },
  table: {
    width: '100%',
    minHeight: '50%'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.1),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.13)
    },
    margin: 3,
  },
  button: {
    width: '100%'
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    right: 0,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100
  },
  inputBase: {
    marginLeft: 10
  }
}));

export default function ProductShowList(userMembers) {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchInfo, setSearchInfo] = useState('');

  useEffect(() => {
    if (searchInfo === '') {
      setUsers(userMembers.userMembers);
    }
  }, [searchInfo]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = () => {
    const filterResponse = userMembers.userMembers.filter(
      (element) =>
        element.firstname.toLowerCase() === searchInfo ||
        element.lastname.toLowerCase() === searchInfo ||
        element.firstname.toLowerCase() +
          ' ' +
          element.lastname.toLowerCase() ===
          searchInfo
    );
    setUsers(filterResponse);
    setPage(0);
  };
  const handleOnKeyDown = (event) => {
    if (event.code === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              id="searchInput"
              placeholder="Search Name"
              inputProps={{ 'aria-label': 'search' }}
              className={classes.inputBase}
              onChange={(e) => setSearchInfo(e.target.value.toLowerCase())}
              onKeyDown={handleOnKeyDown}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="contained" onClick={() => PDF(users)}>Generate PDF</Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {/* <StyledTableCell>Dessert (100g serving)</StyledTableCell> */}
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Gender</StyledTableCell>
              {/* <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 &&
              users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <StyledTableRow key={row.firstname}>
                    {/* <StyledTableCell component="th" scope="row">
                      null
                    </StyledTableCell> */}
                    <StyledTableCell align="right">
                      {row.firstname + ' ' + row.lastname}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.email}</StyledTableCell>
                    <StyledTableCell align="right">{row.gender}</StyledTableCell>
                    {/* <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
