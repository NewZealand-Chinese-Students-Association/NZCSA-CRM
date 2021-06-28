import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import MemberListToolbar from '../components/member/MemberListToolbar';
import MemberListResults from '../components/member/MemberListResults';

const MemberList = () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('authToken')}`
    }
  };
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      axios.get('https://nzcsa-backend.herokuapp.com/api/admin/show-member-list', config)
        .then((res) => {
          setMembers(res.data);
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
            <MemberListResults members={members} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MemberList;
