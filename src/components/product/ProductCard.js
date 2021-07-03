import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useState } from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import ProductNewFrom from './ProductNewFrom';
import ProductShowList from './ProductShowList';
import ProductModifyFrom from './ProductModifyForm';

const ProductCard = ({ product, ...rest }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openShowList, setOpenShowList] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const handleShowListClickOpen = () => {
    setOpenShowList(true);
  };

  const handleShowListClose = () => {
    setOpenShowList(false);
  };

  const handleModifyClickOpen = () => {
    setOpenModify(true);
  };

  const handleModifyClose = () => {
    setOpenModify(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    };
    setTimeout(() => {
      setLoading(false);
    }, 8000);

    try {
      const info = product._id;
      await axios.delete(`https://nzcsa-backend.herokuapp.com/api/admin/delete-events/${info}`,
        config);
      window.location.href = '/app/products';
    } catch (e) {
      console.log(e.response.data.error);
      setLoading(false);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      {...rest}
    >
      <CardMedia
        style={{ height: 0, paddingTop: '56%' }}
        image={product.eventImgUrl}
      />
      <CardContent>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h2"
        >
          {product.eventName}
        </Typography>
        <Typography
          align="center"
          color="textSecondary"
          gutterBottom
          variant="body2"
        >
          {product.eventLocation}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {product.eventDescription}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <AttachMoneyIcon color="action" />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body1"
            >
              {product.eventPrice}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <AccessTimeIcon color="action" />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {(product.startTime)}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      {/* <Divider /> */}
      <Box sx={{ p: 2 }}>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Button onClick={handleModifyClickOpen}>
              {loading ? (
                <CircularProgress color="inherit" size="2rem" />
              ) : (
                <>Modify</>
              )}
            </Button>
            <Dialog
              open={openModify}
              onClose={handleModifyClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <ProductModifyFrom card={product} />
            </Dialog>
            <Button onClick={handleShowListClickOpen}>
              {loading ? (
                <CircularProgress color="inherit" size="2rem" />
              ) : (
                <>Show List</>
              )}
            </Button>
            <Dialog
              open={openShowList}
              onClose={handleShowListClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <ProductShowList />
            </Dialog>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'right'
            }}
          >
            <Button onDoubleClick={handleDelete} color="secondary" startIcon={<DeleteIcon />}>
              {loading ? (
                <CircularProgress color="inherit" size="2rem" />
              ) : (
                <>Delete</>
              )}
            </Button>
            {error && (
            <Typography
              color="error"
              align="center"
              variant="button"
            >
              {error}
            </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductCard;
