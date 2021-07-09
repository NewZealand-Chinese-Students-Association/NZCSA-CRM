import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import { Search as SearchIcon } from 'react-feather';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import CircularProgress from '@material-ui/core/CircularProgress';
import Notification from '../Notification';
import ConfirmDialog from '../ConfirmDialog';

const MemberListResults = ({ members, ...rest }) => {
  const [selectedMemberIds, setSelectedMemberIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: ''
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: ''
  });
  const [deleteButton, setDeleteButton] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const changeMembershipStatus = async (id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    };

    try {
      console.log(id);
      await axios.post(
        'http://localhost:5000/api/admin/promo-to-member',
        { userId: id },
        config
      );
      window.location.reload();
    } catch (e) {
      console.log(e.response.data.error);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  const confirm = (id) => {
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Cancel',
          onClick: () => console.log('')
        },
        {
          label: 'Confirm',
          onClick: () => changeMembershipStatus(id)
        }
      ]
    });
  };

  const handleSelectAll = (event) => {
    let newSelectedMemberIds;

    if (event.target.checked) {
      newSelectedMemberIds = members.map((member) => member._id);
      setDeleteButton(false);
    } else {
      newSelectedMemberIds = [];
      setDeleteButton(true);
    }

    setSelectedMemberIds(newSelectedMemberIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedMemberIds.indexOf(id);
    let newSelectedMemberIds = [];
    /*
  const aStyle = {
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    color: 'blue',
  };
  .then(window.location.href = '/app/members');
  */
    if (selectedIndex === -1) {
      newSelectedMemberIds = newSelectedMemberIds.concat(selectedMemberIds, id);
    } else if (selectedIndex === 0) {
      newSelectedMemberIds = newSelectedMemberIds.concat(
        selectedMemberIds.slice(1)
      );
    } else if (selectedIndex === selectedMemberIds.length - 1) {
      newSelectedMemberIds = newSelectedMemberIds.concat(
        selectedMemberIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedMemberIds = newSelectedMemberIds.concat(
        selectedMemberIds.slice(0, selectedIndex),
        selectedMemberIds.slice(selectedIndex + 1)
      );
    }
    setSelectedMemberIds(newSelectedMemberIds);
    if (newSelectedMemberIds.length > 0) {
      setDeleteButton(false);
    }
    if (newSelectedMemberIds.length === 0) {
      setDeleteButton(true);
    }
  };

  const handleDisplayEvents = (event, member) => {
    console.log(event, member);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleChecked = (event, id) => {
    /*
    setConfirmDialog({
      isOpen: true,
      title: 'Are you sure to delete this record?',
      subTitle: "You can't undo this operation",
    });
    */
    confirm(id);
    /*
    setNotify({
      isOpen: true,
      message: 'Changes made successfully',
      type: 'success'
    });
    */
  };

  const handleDelete = async () => {
    setLoading(true);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    };

    try {
      console.log(selectedMemberIds[0]);
      await axios.delete(
        `https://nzcsa-backend.herokuapp.com/api/admin/delete-member/${selectedMemberIds[0]}`,
        config
      );
      window.location.href = '/app/members';
    } catch (e) {
      console.log(e.response.data);
      setLoading(false);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  const confirmDelete = (memberIds) => {
    confirmAlert({
      title: 'Are you sure to do this?',
      message: 'You cannot undo this action.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => console.log('')
        },
        {
          label: 'No',
          onClick: () => console.log('')
        }
      ]
    });
  };

  function cap1(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  /*
  const [checked, setChecked] = React.useState(true);
  const displayIsMembership = (member) => {
    if (member.isMembership) {
      return '✓';
    }

    return 'X';
  };
*/
  return (
    <>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button
            color="primary"
            disabled={deleteButton}
            variant="contained"
            onClick={handleDelete}
          >
            {loading ? (
              <CircularProgress color="inherit" size="2rem" />
            ) : (
              <>Delete User</>
            )}
          </Button>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search member"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedMemberIds.length === members.length}
                      color="primary"
                      indeterminate={
                        selectedMemberIds.length > 0 &&
                        selectedMemberIds.length < members.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>WeChat ID</TableCell>
                  <TableCell>Is payed</TableCell>
                  <TableCell>Attened events</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.values(members).map((member) => (
                  <TableRow
                    hover
                    key={member._id}
                    selected={selectedMemberIds.indexOf(member._id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedMemberIds.indexOf(member._id) !== -1}
                        onChange={(event) => handleSelectOne(event, member._id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {`${cap1(member.firstname)} ${cap1(member.lastname)}`}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.wechatid}</TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={member.isMembership}
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<RadioButtonCheckedIcon />}
                            onChange={(event) =>
                              handleChecked(event, member._id)
                            }
                          />
                        }
                      />
                      <Notification notify={notify} setNotify={setNotify} />
                      <ConfirmDialog
                        confirmDialog={confirmDialog}
                        setConfirmDialog={setConfirmDialog}
                      />
                    </TableCell>
                    <TableCell>
                      <a
                        style={{
                          color: 'blue',
                          fontStyle: 'italic',
                          textDecorationLine: 'underline'
                        }}
                        onChange={(event) => handleDisplayEvents(event, member)}
                      >
                        click to view
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={members.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  );
};

/*
MemberListResults.propTypes = {
  members: PropTypes.object.isRequired
};
*/
export default MemberListResults;
