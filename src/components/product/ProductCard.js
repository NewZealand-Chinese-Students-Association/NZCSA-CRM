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

const ProductCard = ({ product, ...rest }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
        <Typography
          color="textPrimary"
          variant="body1"
        >
          {`NZD$${product.eventPrice}`}
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
            <AccessTimeIcon color="action" />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {(new Date(product.startTime)).toLocaleString()}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Button onDoubleClick={handleDelete}>
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
