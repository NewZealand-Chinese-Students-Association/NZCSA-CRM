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

  const dummyData = [
    {
      userId: '60f2c2ebf8aefb0004760bed',
      event: '60f364f163d1b4000405db9b',
      time: '2021-07-22T06:33:04.474Z'
    },
    {
      userId: '60f2c2ebf8aefb0004760bed',
      event: '60f364f163d1b4000405db9b',
      time: '2021-07-22T06:33:04.474Z'
    },
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
