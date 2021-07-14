import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import Dialog from '@material-ui/core/Dialog';
import { useState } from 'react';
import ProductNewFrom from './ProductNewFrom';

const ProductListToolbar = ({ props, handleSearch }) => {
  const [open, setOpen] = useState(false);
  const [searchInfo, setSearchInfo] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOnKeyDown = (event) => {
    if (event.code === 'Enter') {
      handleSearch(searchInfo);
    }
  };
  return (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button color="primary" variant="contained" onClick={handleClickOpen}>
          Add Event
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <ProductNewFrom />
        </Dialog>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      onClick={() => handleSearch(searchInfo)}
                    >
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                onChange={(e) => {
                  setSearchInfo(e.target.value.toLowerCase());
                }}
                onKeyDown={handleOnKeyDown}
                placeholder="Search product"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ProductListToolbar;
