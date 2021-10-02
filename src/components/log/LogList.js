import { useEffect, useState } from 'react';
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
import moment from 'moment';

const MemberListResults = ({ logs, ...rest }) => {
  const [selectedMemberIds, setSelectedMemberIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [searchInfo, setSearchInfo] = useState('');
  const [logInfo, setLogInfo] = useState([]);
  const [deleteButton, setDeleteButton] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // for search function
  useEffect(() => {
    if (searchInfo === '') {
      setLogInfo(logs);
    }
  }, [searchInfo, logs]);
  const handleSearch = () => {
    const filterResponse = logs.filter(
      (element) =>
        element.operator.toLowerCase().includes(searchInfo) ||
        element.event.toLowerCase().includes(searchInfo)
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

  return (
    <>
      <Box>
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
                  <TableCell>Operator</TableCell>
                  <TableCell>Event</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logInfo
                  .slice(page * limit, page * limit + limit)
                  .map((log) => (
                    <TableRow hover key={log._id}>
                      <TableCell>{log.operator}</TableCell>
                      <TableCell>{log.event}</TableCell>
                      <TableCell>{log.name}</TableCell>
                      <TableCell>{log.id}</TableCell>
                      <TableCell>
                        {moment(log.time).format('DD/MM/YYYY')}
                      </TableCell>
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

export default MemberListResults;
