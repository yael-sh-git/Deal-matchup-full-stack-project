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
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { addUserApi, updateUserApi } from '../services/user.service';
import { setSession } from '../auth/auth.utils';
import { setAuthUser } from '../redux/auth/auth.slice';
import { Alert, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import axios from 'axios';
import { User } from '../types/user.types';
import { selectUser } from '../redux/user/user.selectors';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { setUser } from '../redux/user/user.slice';

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

export default function SignUp() {

  const [isUpdate, setIsUpdate] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rating: 0,
    role: "user"
  })
  const user = useAppSelector(selectUser)

  useEffect(() => {
    if (user) {
      setIsUpdate(true);
      const [firstName, lastName] = user.name.split(" ");
      // אם יש משתמש, עדכן את המשתנה userData עם הערכים שלו
      setUserData({
        firstName: firstName,
        lastName: lastName,
        email: user.email,
        password: user.password,
        rating: user.rating,
        role: user.role
      });
    }
  }, [user]);



  const [errors, setErrors] = useState<Partial<Record<keyof typeof userData, string>>>({});
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const dispatch = useAppDispatch()


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUserData({ ...userData, [name]: value })

    if (errors[name as keyof typeof userData]) {
      setErrors({ ...errors, [name]: '' });
    }
  }

  const requiredFields: Array<keyof typeof userData> = ['firstName', 'lastName','email','password'];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: Partial<Record<keyof typeof userData, string>> = {};
    requiredFields.forEach((key) => {
      if (!userData[key]) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const { firstName, lastName, ...restUserData } = userData;
      const userToAdd: User = {
        name: `${firstName} ${lastName}`,
        ...restUserData
      }

      if (isUpdate) {
        const fullUser ={id:user!.id,...userToAdd}
        const updateUser = await updateUserApi(fullUser);
        dispatch(setUser(updateUser));
      }
      else {
        const authUser = await addUserApi(userToAdd);

        // const authUserData = {
        //   id: authUser.user.id,
        //   token: authUser.token
        // }

        // setSession(authUserData)
        // dispatch(setUser(authUser.user))

      }
      setStatus('success')

    } catch (err) {

      setStatus('error')
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
      }
    },
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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
          <Avatar sx={{ m: 1, bgcolor: 'rgba(255,137,74,255)' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color={"black"}>
            {user ? 'עדכון פרטים' : 'Sign Up'}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={userData.firstName}
                  onChange={handleChange}
                  autoFocus
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={userData.lastName}
                  onChange={handleChange}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth error={Boolean(errors.password)}>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  name="password"
                  label="Password"
                  value={userData.password||''}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive marketing promotions and updates via email."
                sx={{ color: 'black' }}
              />
            </Grid>
          </Grid>
          {status === 'success' && isUpdate && (
            <Alert severity="success">!השינויים נשמרו בהצלחה</Alert>
          )}
          {status === 'success' && !isUpdate &&(
            <Alert severity="success">!נרשמת בהצלחה! אנו שמחים שהצטרפת אלינו </Alert>
          )}
          {status === 'error' && (
            <Alert severity="error">{error}</Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, color: 'white' }}
          >
            {isUpdate ? 'עדכן שינויים' : 'Sign Up'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href={PATHS.signIn} variant="body2" sx={{ color: 'black' }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
    </ThemeProvider >
  );
}
