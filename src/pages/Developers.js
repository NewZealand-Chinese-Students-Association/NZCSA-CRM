import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  headerCell: {
    color: 'black'
  },
  container: {
    marginTop: 20
  }
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
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

function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein
  };
}
const api = {
  auth: 'https://nzcsa-backend.herokuapp.com/api/auth/',
  private: 'https://nzcsa-backend.herokuapp.com/api/private/',
  admin: 'https://nzcsa-backend.herokuapp.com/api/admin/'
};

const rowsAuth = [
  createData(
    `${api.auth}register`,
    'POST',
    '/',
    '{"firstname": "melo","lastname": "guan","email": "melo.weqw@nzcsa.com","password": 123}'
  ),
  createData(
    `${api.auth}login`,
    'POST',
    '/',
    '{"email": "melo.guan@nzcsa.com","password": "1234"}'
  ),
  createData(
    `${api.auth}forgotpassword`,
    'POST',
    '/',
    '{"email": "meloguan123@gmail.com"}'
  ),
  createData(
    `${api.auth}resetpassword`,
    'PUT',
    'resetpwdToken',
    '{"password": 123}'
  )
];

const rowsPrivate = [
  createData(`${api.private}get-events-info`, 'GET', '/', '/'),
  createData(`${api.private}sign-up-membership`, 'POST', 'authToken', '/'),
  createData(`${api.private}get-user-info`, 'GET', 'authToken', '/'),
  createData(
    `${api.private}sign-up-event`,
    'POST',
    'authToken',
    '{"eventId": "60c6d82c9551fe3b634b7b10"}'
  )
];

const rowsAdmin = [
  createData(
    `${api.admin}add-events`,
    'POST',
    'authToken',
    '{eventName, eventLocation, eventDescription, time, eventPrice, eventImgUrl}'
  ),
  createData(
    `${api.admin}delete-events`,
    'DELETE',
    'authToken',
    '{"_id": "60c70c334441e941914988e0"}'
  ),
  createData(`${api.admin}show-event-user-info`, 'GET', 'authToken', '{"_id": "60c70c334441e941914988e0"}'),
  createData(`${api.admin}show-member-list`, 'GET', 'authToken', '/'),
  createData(
    `${api.admin}promo-to-member`,
    'POST',
    'authToken',
    '{ "userId": "60d04e9b8ffae49fc174a3fa" }'
  ),
  createData(
    `${api.admin}delete-member`,
    'DELETE',
    'authToken',
    '{ "userId": "60d04e9e8ffae49fc174a3fb" }'
  )
];

const DeveloperView = () => {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>Developers | NZCSA</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg" className={classes.container}>
          <TableContainer component={Paper}>
            {/* auth */}
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell width="40%" className={classes.headerCell}>
                    Auth API
                  </TableCell>
                  <TableCell
                    align="right"
                    width="10%"
                    className={classes.headerCell}
                  >
                    Method
                  </TableCell>
                  <TableCell
                    align="right"
                    width="10%"
                    className={classes.headerCell}
                  >
                    Token
                  </TableCell>
                  <TableCell
                    align="right"
                    width="40%"
                    className={classes.headerCell}
                  >
                    Body Example
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsAuth.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.calories}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.fat}</StyledTableCell>
                    <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.protein}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
        <Container maxWidth="lg" className={classes.container}>
          <TableContainer component={Paper}>
            {/* private */}
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell width="40%" className={classes.headerCell}>
                    Private API
                  </TableCell>
                  <TableCell
                    align="right"
                    width="10%"
                    className={classes.headerCell}
                  >
                    Method
                  </TableCell>
                  <TableCell
                    align="right"
                    width="10%"
                    className={classes.headerCell}
                  >
                    Token
                  </TableCell>
                  <TableCell
                    align="right"
                    width="40%"
                    className={classes.headerCell}
                  >
                    Body Example
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsPrivate.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.calories}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.fat}</StyledTableCell>
                    <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.protein}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>

        <Container maxWidth="lg" className={classes.container}>
          <TableContainer component={Paper}>
            {/* admin */}
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell width="40%" className={classes.headerCell}>
                    Admin API
                  </TableCell>
                  <TableCell
                    align="right"
                    width="10%"
                    className={classes.headerCell}
                  >
                    Method
                  </TableCell>
                  <TableCell
                    align="right"
                    width="10%"
                    className={classes.headerCell}
                  >
                    Token
                  </TableCell>
                  <TableCell
                    align="right"
                    width="40%"
                    className={classes.headerCell}
                  >
                    Body Example
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsAdmin.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.calories}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.fat}</StyledTableCell>
                    <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.protein}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </>
  );
};

export default DeveloperView;
