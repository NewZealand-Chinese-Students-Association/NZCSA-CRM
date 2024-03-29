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

const ProductModifyFrom = ({ card }) => {
  const navigate = useNavigate();
  const [eventName, seteventName] = useState(card.eventName);
  const [eventLocation, seteventLocation] = useState(card.eventLocation);
  const [eventPrice, seteventPrice] = useState(card.eventPrice);
  const [eventDescription, seteventDescription] = useState(
    card.eventDescription
  );

  const [selectedDate, setselectedDate] = useState(
    card.startTime.toLocaleString().slice(0, 10)
  ); //  Keep only date part from the Date object as the format yyyy-MM-dd.
  const [selectedTime, setselectedTime] = useState(
    card.startTime.toLocaleString().slice(11, 16)
  );
  const [eventImgUrl, seteventImgUrl] = useState(card.eventImgUrl);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [wechatImgUrl, setwechatImgUrl] = useState(card.wechatImgUrl);
  const [googleSheetUrl, setGoogleSheetUrl] = useState(card.googleSheetUrl);

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
      const startTime = selectedDate + 'T' + selectedTime + 'Z';

      const eventId = card._id;

      if (eventImgUrl != null) {
        eventImgUrl.replace('download', 'view');
      }

      const info = {
        eventId,
        eventName,
        eventLocation,
        eventDescription,
        startTime,
        eventPrice,
        eventImgUrl,
        wechatImgUrl,
        googleSheetUrl
      };

      //  console.log(info);
      await axios.post(
        'https://nzcsa-backend.herokuapp.com/api/admin/modify-events',
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
                    Modify Event
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
                  label="Event Name"
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    seteventName(e.target.value);
                  }}
                  variant="outlined"
                  defaultValue={card.eventName}
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
                  defaultValue={card.eventDescription}
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
                  defaultValue={card.eventLocation}
                />
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  label="Event Price"
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    seteventPrice(e.target.value);
                  }}
                  variant="outlined"
                  defaultValue={card.eventPrice}
                />

                <TextField
                  style={{ width: '45%' }}
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  margin="normal"
                  name="password"
                  onChange={(e) => {
                    setselectedDate(e.target.value);
                  }}
                  type="date"
                  value={selectedDate}
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
                    setselectedTime(e.target.value);
                  }}
                  variant="outlined"
                  type="time"
                  value={selectedTime}
                />
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  label="Event Image URL"
                  margin="normal"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    seteventImgUrl(e.target.value);
                  }}
                  variant="outlined"
                  defaultValue={card.eventImgUrl}
                />
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="Google Sheet URL"
                  margin="normal"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setGoogleSheetUrl(e.target.value);
                  }}
                  variant="outlined"
                  defaultValue={card.googleSheetUrl}
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
                  defaultValue={wechatImgUrl}
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
                      <>Update</>
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

export default ProductModifyFrom;
