import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import LogList from 'src/components/log/LogList';

const Log = () => {
  const [loading, setLoading] = useState(false);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('authToken')}`
    }
  };
  const [logs, setLogs] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     axios
  //       .get(
  //         'https://nzcsa-backend.herokuapp.com/api/admin/show-log-info',
  //         config
  //       )
  //       .then((res) => {
  //         setLoading(false);
  //         setLogs(res.data.reverse());
  //       });
  //   };
  //   fetchData();
  // }, []);

  // Temporary data before connecting to log api
  const dummyData = [
    {
      _id: {
        $oid: '614d5ed57a181958fcc658bb'
      },
      operator: 'alex',
      event: 'promoted user',
      name: 'test',
      id: '6132f66e0d5c8500047d1202',
      time: new Date().getTime()
    },
    {
      _id: {
        $oid: '614d64eae7d7bc528cd25801'
      },
      operator: 'alex',
      event: 'removed user',
      name: 'test',
      id: '6132f66e0d5c8500047d1202',
      time: new Date().getTime()
    }
  ];

  useEffect(() => {
    setLogs(dummyData);
  }, []);

  return (
    <>
      <Helmet>
        <title>Members | NZCSA</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            {loading ? (
              <CircularProgress color="inherit" size="2rem" />
            ) : (
              <LogList logs={logs} />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Log;
