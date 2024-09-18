import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, IconButton, ImageList, ImageListItem, ImageListItemBar, Button, TextField, Tabs, Tab, Box, Fab, CircularProgress, Snackbar, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { getPostApi, getPostsByDescriptionApi } from '../services/post.service';
import { stringToBlob } from '../utils/picture';
import SignIn2 from './SignIn2';
import { Post } from '../types/post.types';
import AddPostDialog from '../sections/addPost/addPost';
import { useSelector } from 'react-redux';
import { selectAuth } from '../redux/auth/auth.selectors';
import AuthGoard from '../auth/authGoard';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { selectPost } from '../redux/post/post.selectors';
import PostDetails from './PostDetails';
import { setInitialize } from '../redux/auth/auth.slice';
import { getPostsThunk } from '../redux/post/post.thunk';
import ShowPost from '../components/ShowPost';
import { useLocation } from 'react-router-dom';



const Posts: React.FC = () => {
  const user = useAppSelector(selectAuth);
  const allPostsData = useAppSelector(selectPost);
  const [isAddPostDialogOpen, setAddPostDialogOpen] = useState(false);
  const [isSignInDialogOpen, setSignInDialogOpen] = useState(false);
  const [filterPostsData, setFilterPostsData] = useState<Post[]>([]);
  const [clickedIndex, setClickedIndex] = useState(-1);
  const [tabIndex, setTabIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [clickedAdd, setClickedAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);


  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {

    const getData = async () => {
      try {
        setIsLoading(true);
        const posts: Post[] = location.state;
        dispatch(setInitialize());
        
        const initialFilteredPosts = posts.filter(post => post.type_Id === 1);
        setFilterPostsData(initialFilteredPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }finally {
        setIsLoading(false);
      }
    };

    getData();


    const shouldShowModal = !sessionStorage.getItem('visited');
    if (shouldShowModal) {
      setSignInDialogOpen(true);
      sessionStorage.setItem('visited', 'true');
    }
  }, [dispatch,location.state]);

  const postsData = useAppSelector(selectPost);

  const handleFavoriteClick = (index: number) => {
    setClickedIndex(index === clickedIndex ? -1 : index);
  };

  const handleClose = () => {
    setSignInDialogOpen(false);
  };

  const handleGuestContinue = () => {
    handleClose();
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    const filteredPosts = postsData.filter(post => post.type_Id === newValue + 1);
    setFilterPostsData(filteredPosts);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try{
      const filterPosts: Post[] = await getPostsByDescriptionApi(searchQuery);
      setFilterPostsData(filterPosts);
      //setSelectedPost(null);
      console.log('Searching for:', searchQuery);
    }catch(error){
      console.error('Error searching posts:', error);
    }finally {
      setIsLoading(false);
    }
    
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCloseDialog = () => {
    setAddPostDialogOpen(false);
    setClickedAdd(false);
  };

  const handleAddPost = () => {
    setClickedAdd(true)
    if (!user.isAuthanticated) {
      setSignInDialogOpen(true);
    } else {
      setAddPostDialogOpen(true);
    }
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleClosePostDetails = () => {
    setSelectedPost(null);
  };
  
  const handleAddPostSuccess = () => {
    setAddSuccess(true);
    setIsAdding(false);
  };

  const handleAddPostError = () => {
    setIsAdding(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '20px 0',
          width: '100%',
          position: 'relative',
        }}
      >
        <TextField
          label="חיפוש"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder='הקלד טקסט לחיפוש'
          dir='rtl'
          InputProps={{
            startAdornment: (
              <IconButton onClick={()=>handleSearch()}>
                <SearchIcon />
              </IconButton>
            ),
            sx: {
              borderColor:'black',
              borderRadius: '20px', width: '100%',
              '& input::placeholder': {
                color: 'gray',
                fontStyle: 'italic'
              }
            }
          }}
          sx={{ width: '100%', maxWidth: '500px' }}
          onKeyPress={handleKeyPress}
        />
        <Fab
          aria-label="add"
          sx={{
            bgcolor: 'rgba(255,87,60,255)',
            color: 'white',
            position: 'absolute',
            right: '5%',
            top: '50%',
            transform: 'translateY(10%)',
            zIndex: 1,
            '&:hover': {
              color: 'rgba(255,87,60,255)'
            },
          }}
          onClick={()=>handleAddPost()}
        >
          <AddIcon />
        </Fab>

        {clickedAdd && (
        <AuthGoard>
          <AddPostDialog 
          open={isAddPostDialogOpen} 
          handleClose={handleCloseDialog} 
          type={tabIndex+1} 
          onAddPostSuccess={handleAddPostSuccess}
          onAddPostError={handleAddPostError}
          /></AuthGoard>)}
      </Box>
      <Box sx={{ position: 'fixed', right: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 1 ,color: 'rgba(255,87,60,255)' }}>
        <Tabs value={tabIndex} onChange={handleTabChange} orientation="vertical" sx={{ color: 'rgba(255,87,60,255)' }} >
          <Tab label="פוסטים" sx={{ color: 'rgba(255,87,60,255)' }} />
          <Tab label="פורום שאלות ותשובות" />
        </Tabs>
      </Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 6 }}>
        {isLoading? (
          <CircularProgress />
        ): (
        <ImageList
          sx={{
            width: '100%',
            maxWidth: '1200px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
          }}
        >
          {filterPostsData.length > 0 ? (
            filterPostsData.map((post, index) => (
              <ShowPost key={post.id} post={post}
              onClick={handlePostClick}
              >
              </ShowPost>
            ))
          ) : (
            <Box sx={{ textAlign: 'center', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <SearchIcon sx={{ fontSize: '50px', color: 'gray' }} />
              <h2>אין תוצאות מתאימות</h2>
            </Box>
          )}
        </ImageList>
        )}
      </Box>
      <PostDetails
        open={!!selectedPost}
        onClose={handleClosePostDetails}
        post={selectedPost}
      />
      <Snackbar
        open={addSuccess}
        autoHideDuration={6000}
        onClose={() => setAddSuccess(false)}
      >
        <Alert onClose={() => setAddSuccess(false)} severity="success">
          הפוסט נוסף בהצלחה!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Posts;
