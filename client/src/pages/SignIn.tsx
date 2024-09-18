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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PATHS } from '../routes/paths';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../redux/store';
import { login } from '../services/auth.service';
import { setSession } from '../auth/auth.utils';
import { setAuthUser } from '../redux/auth/auth.slice';
import { LoginUser } from '../types/user.types';
import { Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

  export default function SignIn() {

  const navigate = useNavigate();
  const [userData, setUserData] = useState<LoginUser>({
      email: '',
      password: ''
  })
  const [error, setError] = useState('');
  
 
  const dispatch = useAppDispatch()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      setUserData({ ...userData, [name]: value })
      
  }

  // לבדוק מה לגבי הטיפוס של המשתמש - האם צריך לשמור גם פה את התכונה תפקיד
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const authUser = await login(userData);
      const authUserData= {
        id: authUser.user.id,
        token: authUser.token
      }

      setSession(authUserData)
      dispatch(setAuthUser(authUser.user))

      navigate(PATHS.home);
      
    } catch (err) {

      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data || 'An error occurred');
      } else {
        setError('An error occurred');
      }

      }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: 'rgba(255,137,74,255)',
      },
      text: {
        primary: '#000000',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            {/* bgcolor: secondary.main */}
          <Avatar sx={{ m: 1, bgcolor: 'rgba(255,137,74,255)' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color={"black"}>
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate 
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={userData.email} 
              onChange={handleChange}
              autoFocus
            //   sx={{'& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,87,60,255)' }}}
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
              value={userData.password} 
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember"  />}//color="primary"
              label="Remember me"
              sx={{ color: 'black' }}
            />
            {error && <Alert severity="error">{error}</Alert>} {/* הצגת הודעת השגיאה */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color:'white'}} 
            >
              Sign In
            </Button>
            <Grid container >
              <Grid item xs>
                <Link href="#" variant="body2" sx={{ color: 'black' }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href={PATHS.signUp} variant="body2" sx={{ color: 'black' }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

