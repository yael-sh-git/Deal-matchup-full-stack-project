import React from 'react';
import Category_Component from './pages/Category';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import NavBar from './sections/nav/NavBar';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';


import  { useState } from 'react';
import { Button, Container } from '@mui/material';
import AddPostDialog from './sections/addPost/addPost';

function App() {

  
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
    </>
  );
}

export default App;
