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
import Grid from '@material-ui/core/Grid';
import { useState } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';
import theme from 'src/theme';

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
  const [formURL, setFormURL] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [inputList, setInputList] = useState(['']);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index] = value;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, '']);
    console.log(inputList);
  };

  const handleChange = (e) => {
    setChecked(e.target.checked);
    setFormURL('');
    setInputList(['']);
  };

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
      const eventForm = {
        googleSheetURL: formURL,
        questions: inputList
      };
      eventImgUrl.replace('download', 'view');

      const info = {
        eventName,
        eventLocation,
        eventDescription,
        time,
        eventPrice,
        eventImgUrl,
        wechatImgUrl,
        eventForm
      };

      console.log(info);
      await axios.post(
        'http://localhost:5000/api/admin/add-events',
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
      <Container
        spacing={2}
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '5%'
        }}
      >
        <Formik
          onSubmit={() => {
            navigate('/app/dashboard', { replace: true });
          }}
        >
          {({ errors, handleBlur, isSubmitting, touched }) => (
            <form onSubmit={handleSubmit}>
              <Typography align="center" color="textPrimary" variant="h2">
                Create new event
              </Typography>
              <Box sx={{ mb: 3 }}>
                {error && (
                  <Typography color="error" align="center" variant="button">
                    {error}
                  </Typography>
                )}
              </Box>
              <Grid container spacing={3}>
                <Grid item md={6} sm={6} xs={12}>
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
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                  <FormGroup style={{ marginTop: 15 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={handleChange}
                          color="primary"
                        />
                      }
                      label="Requrie additional form - Fill in the section below"
                    />
                  </FormGroup>
                  <TextField
                    disabled={!checked}
                    // error={Boolean(touched.lastName && errors.lastName)}
                    fullWidth
                    // helperText={touched.lastName && errors.lastName}
                    label="Google sheet url"
                    style={{ marginTop: theme.spacing(4.7) }}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setFormURL(e.target.value);
                    }}
                    variant="outlined"
                  />
                  <Typography
                    style={{
                      textDecoration: 'underline',
                      marginTop: theme.spacing(3)
                    }}
                  >
                    Form Input
                  </Typography>
                  {inputList.map((input, i) => {
                    return (
                      <div>
                        <TextField
                          disabled={!checked}
                          // helperText={touched.lastName && errors.lastName}
                          label="Input Name"
                          name="input"
                          value={input}
                          style={{ width: '90%', marginTop: 10 }}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleInputChange(e, i);
                          }}
                          variant="outlined"
                        />
                        {inputList.length !== 1 && (
                          <RemoveCircleOutlineRoundedIcon
                            style={{
                              verticalAlign: 'bottom',
                              marginBottom: 13,
                              marginLeft: 10
                            }}
                            onClick={() => handleRemoveClick(i)}
                          />
                        )}
                        {inputList.length - 1 === i && (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <ControlPointIcon
                              style={{ marginTop: theme.spacing(4.7) }}
                              onClick={handleAddClick}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {/* <TextField
                    disabled={!checked}
                    // helperText={touched.lastName && errors.lastName}
                    label="Question"
                    // fullWidth
                    style={{ width: '90%' }}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setFormURL(e.target.value);
                    }}
                    variant="outlined"
                  />
                  <RemoveCircleOutlineRoundedIcon
                    style={{
                      verticalAlign: 'bottom',
                      marginBottom: 13,
                      marginLeft: 10
                    }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <ControlPointIcon
                      style={{ marginTop: theme.spacing(4.7) }}
                      onClick={handleAddClick}
                    />
                  </div> */}
                </Grid>
                <Grid item xs={12} sm={6} style={{ margin: 'auto' }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    size="large"
                    type="submit"
                    variant="contained"
                    fullWidth
                  >
                    {loading ? (
                      <CircularProgress color="inherit" size="2rem" />
                    ) : (
                      <>Add</>
                    )}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default ProductNewFrom;
