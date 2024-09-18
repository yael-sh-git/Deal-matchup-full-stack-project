import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { PATHS } from '../routes/paths';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 240;

export default function PermanentDrawerRight() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          mr: `${drawerWidth}px`,
          backgroundColor: 'rgba(255,87,60,255)',
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            אזור אישי
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            right: 0, // מיקום בצד ימין
            left: 'auto' // וידוא שה-Drawer נמצא בצד ימין בלבד
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem key={'בית'} disablePadding>
            <ListItemButton onClick={() => navigate(PATHS.home)}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={'בית'} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem key={'פרטים'} disablePadding>
            <ListItemButton onClick={() => navigate(PATHS.profile)}>
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText primary={'פרטים'} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          {['השאלות שלי', 'מבצעים שפרסמתי'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => index % 2 == 0 ? navigate(PATHS.userPost) : navigate(PATHS.userQuestion)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <HelpOutlineIcon /> : <LoyaltyIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: theme => theme.spacing(3),
          marginRight: `${drawerWidth}px` // וידוא שהמיין לוקח בחשבון את רוחב ה-Drawer
        }}
      >
        <Toolbar />
        {/* תוכן */}
      </Box>
    </Box>
  );
}
