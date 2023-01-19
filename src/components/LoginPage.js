import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/Theme';
import trybelogo from '../images/trybe.png';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" { ...props }>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        <a href="https://www.linkedin.com/in/raphael-baere/">Raphael Baere</a>
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

export default function SignIn({ loginNameInput, onInputChange, isLoginButtonDisabled, onEnterLoginClick }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={ theme }>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={ {
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          } }
        >
          <div className="logo">
          <img src={ trybelogo } alt="logo" className="trybe-logo" />
          <p className="logo-name">Trybify</p>
          </div>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={ handleSubmit } noValidate sx={ { mt: 1 } }>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login-name-input"
              label="Name"
              autoComplete="name"
              autoFocus
              data-testid="login-name-input"
              type="text"
              name="loginNameInput"
              value={ loginNameInput }
              onChange={ onInputChange }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={ <Checkbox value="remember" color="primary" /> }
              label="Remember me"
            />
            <Button
              color="success"
              fullWidth
              variant="contained"
              sx={ { mt: 3, mb: 2 } }
              disabled={ isLoginButtonDisabled }
              onClick={ onEnterLoginClick }
              type="button"
              data-testid="login-submit-button"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={ { mt: 8, mb: 4 } } />
      </Container>
    </ThemeProvider>
  );
}
