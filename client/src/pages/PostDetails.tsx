import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Box, Typography, IconButton, TextField, Button, List, ListItem, ListItemText, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Post } from '../types/post.types';
import noImage from '../images/צילום מסך 2024-05-21 204449.png';
import { stringToBlob } from '../utils/picture';
import ShowComment from '../sections/comment';
import { AddComment } from '@mui/icons-material';
import { addCommentApi } from '../services/comment.service';
import { Comment } from '../types/comment';

interface PostDetailsProps {
  open: boolean;
  onClose: () => void;
  post: Post | null;
}

const PostDetails: React.FC<PostDetailsProps> = ({ open, onClose, post }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newComment, setNewComment] = useState('');



  if(!post)
    return null;


  const handleNextImage = () => {
    if(post.picturesBytes)
       setCurrentImageIndex((prevIndex) => (prevIndex + 1) %  post.picturesBytes!.length);
  };

  const handlePrevImage = () => {
    if(post.picturesBytes)
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + post.picturesBytes!.length) % post.picturesBytes!.length);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = async () => {
    const commentData :Comment= {
        user_Id:post.user_Id,
        shared_Item_Id:post!.id!,
        description:newComment,
        date_of_sharing: new Date(Date.now())
    }
    const comment= await addCommentApi(commentData)
    console.log('Adding comment:', comment);
    setNewComment('');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{post.name}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
          <Box flex="1" position="relative">
            {post.picturesBytes && post.picturesBytes.length > 0 ? (
              <img
                src={URL.createObjectURL(stringToBlob(post.picturesBytes[currentImageIndex], null, null))}
                alt={post.name}
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            ) : (
              <img
                src={noImage}
                alt="default"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            )}
            {post.picturesBytes && post.picturesBytes.length > 1 && (
              <>
                <IconButton onClick={handlePrevImage} style={{ position: 'absolute', top: '50%', left: 0 }}>
                  <ArrowBackIosIcon />
                </IconButton>
                <IconButton onClick={handleNextImage} style={{ position: 'absolute', top: '50%', right: 0 }}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </>
            )}
          </Box>
          <Box flex="1" padding={2}>
            <Typography variant="h4" gutterBottom>
              {post.name}
            </Typography>
            <Typography variant="body1" paragraph>
              {post.description}
            </Typography>
            <Typography variant="h6" gutterBottom>
              תגובות
            </Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {post.comments && post.comments.map((comment, index) => (
                // <Paper key={index} sx={{ padding: 2, marginBottom: 2 }}>
                //   <ListItem>
                //     <ListItemText
                //       primary={<Typography variant="body1" fontWeight="bold">{comment.author}</Typography>}
                //       secondary={<Typography variant="body2">{comment.text}</Typography>}
                //     />
                //   </ListItem>
                // </Paper>
                <ShowComment comment={comment}/>
              ))}
            </List>
            <Box mt={2}>
              <TextField
                label="הוסף תגובה"
                variant="outlined"
                fullWidth
                value={newComment}
                onChange={handleCommentChange}
                multiline
                rows={3}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddComment}
                style={{ marginTop: '10px' }}
              >
                הוסף תגובה
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PostDetails;



const comments = [
    {
      text: 'Breakfast',
      author: '@bkristastucchio',
    },
    {
      text: 'Burger',
      author: '@rollelflex_graphy726',
    },
    {
      text: 'Camera',
      author: '@helloimnik',
    },
    {
      text: 'Coffee',
      author: '@nolanissac',
    },
    {
      text: 'Hats',
      author: '@hjrc33',
    },
  ];
  function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
  }
  