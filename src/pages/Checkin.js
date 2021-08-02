import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import AccountProfileDetails from '../components/account/AccountProfileDetails';
// import AccountProfile from '../components/account/AccountProfile';

const Checkin = () => (
  <>
    <Helmet>
      <title>Check In | NZCSA</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          {/* <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile />
          </Grid> */}
          <Grid
            item
          >
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Checkin;
