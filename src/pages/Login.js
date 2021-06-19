import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleLogin = async (f) => {
    setLoading(true);
    f.preventDefault();
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    console.log(email, password);
    setTimeout(() => {
      setLoading(false);
    }, 5000);

    try {
      const { data } = await axios.post(
        'https://nzcsa-backend.herokuapp.com/api/auth/login',
        { email, password },
        config
      );

      localStorage.setItem('authToken', data.token);

      window.location.href = '/app/dashboard';
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
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
          >
            {({
              errors,
              isSubmitting,
              touched,
            }) => (
              <form onSubmit={handleLogin}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                  {error && (
                  <Typography
                    color="error"
                    align="center"
                    variant="button"
                  >
                    {error}
                  </Typography>
                  )}
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  // onBlur={handleBlur}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  // onBlur={handleBlur}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  variant="outlined"
                />
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
                      <>Sign in</>
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

export default Login;
