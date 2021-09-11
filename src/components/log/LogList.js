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

const MemberListResults = ({ logs, ...rest }) => {
  const [selectedMemberIds, setSelectedMemberIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [searchInfo, setSearchInfo] = useState('');
  const [logInfo, setLogInfo] = useState([]);
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

  // for search function
  useEffect(() => {
    if (searchInfo === '') {
      setLogInfo(logs);
    }
  }, [searchInfo, logs]);
  // (element) =>
  // element.firstname.toLowerCase() === searchInfo ||
  // element.lastname.toLowerCase() === searchInfo ||
  // element.firstname.toLowerCase() +
  // ' ' +
  // element.lastname.toLowerCase() ===
  // searchInfo
  const handleSearch = () => {
    const filterResponse = logs.filter(
      (element) =>
        element.firstname.toLowerCase().includes(searchInfo) ||
        element.lastname.toLowerCase().includes(searchInfo)
    );
    setLogInfo(filterResponse);
    setPage(0);
  };

  const handleOnKeyDown = (event) => {
    if (event.code === 'Enter') {
      handleSearch();
    }
  };

  const handleSelectAll = (event) => {
    let newSelectedMemberIds;

    if (event.target.checked) {
      newSelectedMemberIds = logs.map((member) => member._id);
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
    setLimit(+event.target.value);
    setPage(0);
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
              <>Delete Log</>
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
                      <InputAdornment position="start" onClick={handleSearch}>
                        <SvgIcon fontSize="small" color="action">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  onChange={(e) => setSearchInfo(e.target.value.toLowerCase())}
                  onKeyDown={handleOnKeyDown}
                  placeholder="Search log"
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
                      checked={selectedMemberIds.length === logs.length}
                      color="primary"
                      indeterminate={
                        selectedMemberIds.length > 0 &&
                        selectedMemberIds.length < logs.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>Event</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logInfo
                  .slice(page * limit, page * limit + limit)
                  .map((log) => (
                    <TableRow
                      hover
                      key={log._id}
                      selected={selectedMemberIds.indexOf(log._id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedMemberIds.indexOf(log._id) !== -1}
                          onChange={(event) =>
                            handleSelectOne(event, log._id)
                          }
                          value="true"
                        />
                      </TableCell>
                      <TableCell>{log.userId}</TableCell>
                      <TableCell>{log.event}</TableCell>
                      <TableCell>{log.time}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={logInfo.length}
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
