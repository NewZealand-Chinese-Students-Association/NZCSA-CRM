import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import MemberListResults from 'src/components/member/MemberListResults';
import MemberListToolbar from 'src/components/member/MemberListToolbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const MemberList = () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('authToken')}`
    }
  };
  const [members, setMembers] = useState([]);
  const getMembers = async () => {
    const response = await axios.get(
      'https://nzcsa-backend.herokuapp.com/api/admin/show-member-list',
      config
    );
    setMembers(response.data);
  };
  getMembers();
  return (
    <>
      <Helmet>
        <title>Members | Material Kit</title>
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
