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
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      axios.get('https://nzcsa-backend.herokuapp.com/api/admin/show-member-list', config)
        .then((res) => {
          setLoading(false);
          setMembers((res.data).reverse());
        });
    };
    fetchData();
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
              <LogList />
            )}

          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Log;
