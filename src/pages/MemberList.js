import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import MemberListResults from '../components/member/MemberListResults';

const MemberList = () => {
  const [loading, setLoading] = useState(false);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('authToken')}`
    }
  };
  const [members, setMembers] = useState([]);
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const memberListRes = axios.get('https://nzcsa-backend.herokuapp.com/api/admin/show-member-list', config);
      const eventInfoRes = axios.get('https://nzcsa-backend.herokuapp.com/api/private/get-events-info', config);

      axios.all([memberListRes, eventInfoRes])
        .then(
          axios.spread((...res) => {
            setLoading(false);
            setMembers((res[0].data).reverse());
            setEventData((res[1].data));
          })
        ).catch((err) => {
          console.log(err);
        });

      // axios.get('https://nzcsa-backend.herokuapp.com/api/admin/show-member-list', config)
      //   .then((res) => {
      //     // setLoading(false);
      //     setMembers((res.data).reverse());
      //   });

      // axios.get('https://nzcsa-backend.herokuapp.com/api/private/get-events-info', config)
      //   .then((res) => {
      //     setLoading(false);
      //     setEventData((res.data));
      //   });
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
              <MemberListResults members={members} eventData={eventData} />
            )}

          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MemberList;
