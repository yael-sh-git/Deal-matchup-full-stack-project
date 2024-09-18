import * as React from 'react';
import { useState } from 'react';
import { IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Post } from '../types/post.types';
import AddPostDialog from '../sections/addPost/addPost';
import ShowPost from './ShowPost';

interface EditablePostProps {
  post: Post;
  onUpdate: (post: Post) => void;
}

const EditablePost: React.FC<EditablePostProps> = ({ post, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);  // מצב עריכה
  const [editedPost, setEditedPost] = useState<Post>({ ...post });  // פרטי הפוסט בעריכה

  const handleEditClick = () => {
    setIsEditing(true);  // פתיחת דיאלוג עריכה
  };

  const handleClose = () => {
    setIsEditing(false);  // סגירת דיאלוג עריכה
  };

  const handleSave = () => {
    onUpdate(editedPost);  // קריאה לפונקציה לעדכון הפוסט
    setIsEditing(false);  // סגירת דיאלוג עריכה
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedPost({
      ...editedPost,
      [name]: value,
    });  // עדכון ערך השדה בעריכה
  };

  return (
    <Box
      sx={{
        border: '1px solid #ccc',
        padding: 2,
        margin: 2,
        position: 'relative',
        borderRadius: 1,
        boxShadow: 1,
        backgroundColor: '#fff',
        width: '100%', // גורם לקופסה להיות ברוחב 100% מההורה שלה
      }}
    >
      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          backgroundColor: '#f5f5f5',
          '&:hover': {
            backgroundColor: '#e0e0e0',
          },
        }}
        onClick={handleEditClick}
      >
        <EditIcon />
      </IconButton>
      <Box sx={{ padding: 2 }}>
        <ShowPost post={post} />
      </Box>

      <AddPostDialog open={isEditing} handleClose={handleClose} post={post} />
    </Box>
  );
};

export default EditablePost;
