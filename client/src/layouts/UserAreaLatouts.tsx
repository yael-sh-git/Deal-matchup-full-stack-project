import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import UserArea from '../components/UserArea';

const UserAreaLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box component="main" sx={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </Box>
      <Box component="aside" sx={{ width: '300px', borderLeft: '1px solid #ccc', padding: '20px' }}>
        <UserArea />
      </Box>
    </Box>
  );
};

export default UserAreaLayout;
