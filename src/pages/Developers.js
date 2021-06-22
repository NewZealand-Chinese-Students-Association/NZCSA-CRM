import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return {
    name, calories, fat, carbs, protein
  };
}
const api = {
  auth: 'https://nzcsa-backend.herokuapp.com/api/auth/',
  private: 'https://nzcsa-backend.herokuapp.com/api/private/',
  admin: 'https://nzcsa-backend.herokuapp.com/api/admin/',
};

const rows = [
  createData(`${api.auth}register`, 'POST', '/', '{"firstname": "melo","lastname": "guan","email": "melo.weqw@nzcsa.com","password": 123}'),
  createData(`${api.auth}login`, 'POST', '/', '{"email": "melo.guan@nzcsa.com","password": "1234"}'),
  createData(`${api.auth}forgotpassword`, 'POST', '/', '{"email": "meloguan123@gmail.com"}'),
  createData(`${api.auth}resetpassword`, 'PUT', 'resetpwdToken', '{"password": 123}'),
  createData(`${api.private}get-events-info`, 'GET', '/', '/'),
  createData(`${api.private}sign-up-membership`, 'POST', 'authToken', '/'),
  createData(`${api.private}get-user-info`, 'GET', 'authToken', '/'),
  createData(`${api.private}sign-up-event`, 'POST', 'authToken', '{"eventId": "60c6d82c9551fe3b634b7b10"}'),
  createData(`${api.admin}add-events`, 'POST', 'authToken', '{"eventName": "2021pn","eventLocation": "asds","eventDescription": "asdasd","startTime": "05/07/2021"}'),
  createData(`${api.admin}delete-events`, 'DELETE', 'authToken', '{"_id": "60c70c334441e941914988e0"}'),
  createData(`${api.admin}show-event-user-info`, 'GET', 'authToken', '/'),
  createData(`${api.admin}show-member-list`, 'GET', 'authToken', '/'),
  createData(`${api.admin}promo-to-member`, 'POST', 'authToken', '{ "userId": "60d04e9b8ffae49fc174a3fa" }'),
  createData(`${api.admin}delete-member`, 'DELETE', 'authToken', '{ "userId": "60d04e9e8ffae49fc174a3fb" }'),
];

const DeveloperView = () => {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>Settings | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>API</TableCell>
                  <TableCell align="right">Method</TableCell>
                  <TableCell align="right">Token</TableCell>
                  <TableCell align="right">Body Example</TableCell>
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
        </Container>
      </Box>
    </>
  );
};

export default DeveloperView;
