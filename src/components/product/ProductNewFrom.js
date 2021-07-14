import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  FormHelperText,
  TextField,
  Typography
} from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

const ProductNewFrom = () => {
  const navigate = useNavigate();
  const [eventName, seteventName] = useState('');
  const [eventLocation, seteventLocation] = useState('');
  const [eventPrice, seteventPrice] = useState('');
  const [eventDescription, seteventDescription] = useState('');
  const [startDate, setstartDate] = useState('');
  const [startTime, setstartTime] = useState('');
  const [eventImgUrl, seteventImgUrl] = useState('');
  const [wechatImgUrl, setwechatImgUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (f) => {
    f.preventDefault();
    setLoading(true);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    };
    setTimeout(() => {
      setLoading(false);
    }, 8000);

    try {
      const time = startDate + startTime;

      eventImgUrl.replace('download', 'view');

      const info = {
        eventName,
        eventLocation,
        eventDescription,
        time,
        eventPrice,
        eventImgUrl,
        wechatImgUrl
      };

      console.log(info);
      await axios.post(
        'https://nzcsa-backend.herokuapp.com/api/admin/add-events',
        info,
        config
      );
      window.location.href = '/app/products';
    } catch (e) {
      setError(e.response.data.error);
      setLoading(false);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          padding: '10%'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            onSubmit={() => {
              navigate('/app/dashboard', { replace: true });
            }}
          >
            {({ errors, handleBlur, isSubmitting, touched }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    Create new event
                  </Typography>
                  {error && (
                    <Typography color="error" align="center" variant="button">
                      {error}
                    </Typography>
                  )}
                </Box>
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="Event Name"
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    seteventName(e.target.value);
                  }}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  label="Event Description"
                  margin="normal"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    seteventDescription(e.target.value);
                  }}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Event Location"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    seteventLocation(e.target.value);
                  }}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="Event Price"
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    seteventPrice(e.target.value);
                  }}
                  variant="outlined"
                />

                <TextField
                  style={{ width: '45%' }}
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  margin="normal"
                  name="password"
                  onChange={(e) => {
                    setstartDate(e.target.value);
                  }}
                  type="date"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  style={{ width: '45%', float: 'right' }}
                  helperText={touched.password && errors.password}
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setstartTime(e.target.value);
                  }}
                  variant="outlined"
                  type="time"
                />
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="Event Image URL"
                  margin="normal"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    seteventImgUrl(e.target.value);
                  }}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="Wechat Group QRCode Image URL"
                  margin="normal"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setwechatImgUrl(e.target.value);
                  }}
                  variant="outlined"
                />

                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>{errors.policy}</FormHelperText>
                )}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {loading ? (
                      <CircularProgress color="inherit" size="2rem" />
                    ) : (
                      <>Add</>
                    )}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default ProductNewFrom;
