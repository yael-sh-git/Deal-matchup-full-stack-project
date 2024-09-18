import { AppBar, Avatar, Box, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { AccountCircle, Logout, PersonAdd, Settings } from '@mui/icons-material';
import logo from './לוגו.png';
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import { getSession } from "../../auth/auth.utils";
import { logOut, setAuthUser } from "../../redux/auth/auth.slice";
import React from "react";
import { AuthUser, User } from "../../types/user.types";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../redux/auth/auth.selectors";
import { setUser } from "../../redux/user/user.slice";
import { selectUser } from "../../redux/user/user.selectors";
import { selectPost } from "../../redux/post/post.selectors";
import { getPostsThunk } from "../../redux/post/post.thunk";
import { Post } from "../../types/post.types";
import { useAppDispatch, useAppSelector } from "../../redux/store";

export default function NavBar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPost);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const authUser = useAppSelector(selectAuth);
    dispatch(setUser(authUser.user))
    const user = useAppSelector(selectUser)

    const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (anchorEl) {
            setAnchorEl(null); // אם התפריט כבר פתוח, סגור אותו
        } else {
            setAnchorEl(event.currentTarget); // אחרת, פתח אותו
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event: React.MouseEvent<HTMLElement> | null, path?: string) => {
        if (event && anchorEl && anchorEl.contains(event.target as Node)) {
            return;
        }
        setAnchorEl(null);
        if (path) {
            navigate(path);
        }
    };

    const handlePostsClick = async (event: React.MouseEvent<HTMLElement>) => {   
        event.preventDefault();     
        try {        
            if (!posts || posts.length === 0) {
              // Fetch posts if not available in Redux store
              const fetchedPosts:Post[] = await dispatch(getPostsThunk());
              navigate(PATHS.posts, { state: fetchedPosts });
            } else {
              // Use existing posts from Redux store
              navigate(PATHS.posts, { state: posts });
            }
          } catch (error) {
            // Handle errors gracefully, e.g., display an error message
            console.error('Error fetching posts:', error);
          }

    };



    return (
        <AppBar position="static" sx={{ backgroundColor: 'white' }}>
            <Toolbar>
                <IconButton size='large' edge='start' color="inherit" aria-label='logo'>
                    <img src={logo} alt="Logo" style={{ width: '150px', height: '130px' }} />
                </IconButton>
                <Typography variant="h6" component='div' sx={{ flexGrow: 1 }}>
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', color: 'rgba(255,87,60,255)' }}>
                    <Button color="inherit" sx={{ fontWeight: 'bold', fontFamily: 'cursive' }}>About</Button>
                    <Button onClick={handlePostsClick} color="inherit" sx={{ fontWeight: 'bold', fontFamily: 'cursive' }}>Posts</Button>
                    {/* component={Link} to={PATHS.posts} */}
                    <Box sx={{ flexGrow: 1 }} />
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : ''}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : false}
                        >
                            {user ? (
                                <Avatar sx={{
                                    width: 32,
                                    height: 32,
                                    backgroundColor: 'rgba(255,87,60,255)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {user.name.charAt(0)}
                                </Avatar>

                            ) : (
                                <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(255,87,60,255)' }}><AccountCircle /></Avatar>
                            )}
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={() => handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <div>
                        {user ?
                            (<>
                                <MenuItem onClick={(event) => handleClose(event, PATHS.profile)}>
                                    <Avatar /> Profile
                                </MenuItem>
                                <MenuItem onClick={(event) => handleClose(event, PATHS.profile)}>
                                    <Avatar /> My account
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={() => dispatch(logOut())}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </>) :
                            (
                                <><MenuItem onClick={(event) => handleClose(event, PATHS.signIn)}>
                                    <Avatar /> SignIn
                                </MenuItem>
                                    <MenuItem onClick={(event) => handleClose(event, PATHS.signUp)}>
                                        <Avatar /> SignUp
                                    </MenuItem>
                                </>)
                        }
                    </div>

                </Menu>
            </Toolbar>
        </AppBar>
    )
}
