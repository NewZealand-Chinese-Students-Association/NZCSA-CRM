import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import items from './DashboardSideItemList';
import NavItem from './NavItem';

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  };
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    const fetchData = async () => {
      axios.get('https://nzcsa-backend.herokuapp.com/api/private/get-user-info', config).then((res) => {
        setUserInfo(res.data.data);
        // console.log(res.data.data);
      });
    };
    fetchData();
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={userInfo.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
          style={{ textTransform: 'capitalize' }}
        >
          {userInfo.firstname}
          {' '}
          {userInfo.lastname}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {userInfo.email}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          backgroundColor: 'background.default',
          m: 2,
          p: 2
        }}
      >
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          Report Bugs
        </Typography>
        <Typography
          align="center"
          variant="body2"
        >
          Contact
        </Typography>
        <Typography
          align="center"
          variant="body2"
        >
          Kirsty Gong or Alex Liang

        </Typography>

      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
