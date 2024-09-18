import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, ThemeProvider, createTheme } from '@mui/material';
import { Post } from '../../types/post.types';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/auth/auth.selectors';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { addPostThunk } from '../../redux/post/post.thunk';
import { AddPhotoAlternate, Delete } from '@mui/icons-material';
import { selectUser } from '../../redux/user/user.selectors';
import { setUser } from '../../redux/user/user.slice';
import { updatePostApi } from '../../services/post.service';
import { updatePost } from '../../redux/post/post.slice';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(255,137,74,255)',
    },
  },
  direction: 'rtl',
  typography: {
    h6: {
      fontWeight: 'bold',
      color: 'rgba(255,87,60,255)',
    },
  },
});

interface AddPostDialogProps {
  open: boolean;
  handleClose: () => void;
  post?: Post;
  type?: number;
  onAddPostSuccess?: ()=>void;
  onAddPostError?: ()=> void
}

const AddPostDialog: React.FC<AddPostDialogProps> = ({ open, handleClose, post, type,onAddPostSuccess,onAddPostError }) => {

  const [errors, setErrors] = useState<Partial<Record<keyof typeof postData, string>>>({});
  const dispatch = useAppDispatch()

  const authUser = useAppSelector(selectAuth);
  dispatch(setUser(authUser.user))
  const user = useAppSelector(selectUser)

  const [isUpdate, setIsUpdate] = useState(false);
  const [postData, setPostData] = useState<Post>({
    name: '',
    user_Id: user!.id!,
    type_Id: type! + 1,
    description: '',
    imageUrl: '',
    images: [],
    picturesBytes: [],
    url: '',
    rating: 0,
    date_of_sharing: new Date(Date.now())
  });

  useEffect(() => {
    if (post) {
      setIsUpdate(true);
      setPostData({
        name: post.name,
        user_Id: user!.id!,
        type_Id: post.type_Id,
        description: post.description,
        imageUrl: post.imageUrl,
        images: post.images,
        picturesBytes: post.picturesBytes,
        url: post.url,
        rating: post.rating,
        date_of_sharing: post.date_of_sharing
      });
    }
  }, [post]);

  const [files, setFiles] = useState<File[]>([]);
  const [thumbnails, setThumbnails] = useState<string[]>([]);


  const requiredFields: Array<keyof typeof postData> = ['name', 'description'];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setPostData({ ...postData, [name]: value })

    if (errors[name as keyof typeof postData]) {
      setErrors({ ...errors, [name]: '' });
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...selectedFiles]);

      const fileUrls = selectedFiles.map(file => URL.createObjectURL(file));
      setThumbnails(prevThumbnails => [...prevThumbnails, ...fileUrls]);
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);

    const updatedThumbnails = [...thumbnails];
    updatedThumbnails.splice(index, 1);
    setThumbnails(updatedThumbnails);
  };

  const handleAddPost = async () => {

    const newErrors: Partial<Record<keyof typeof postData, string>> = {};
    requiredFields.forEach((field) => {
      if (!postData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    if (isUpdate) {
      const fullPost= {...postData,id: post!.id}
      const postToUpdate = await updatePostApi(fullPost);
      dispatch(updatePost(postToUpdate))

    }
    else {
      const formData = new FormData();
      formData.append('name', postData.name);
      formData.append('user_Id', Number(postData.user_Id).toString());
      formData.append('type_Id', Number(postData.type_Id).toString());
      formData.append('description', postData.description);

      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }
      if (postData.url != '')
        formData.append('url', postData.url!);
      formData.append('rating', Number(postData.rating).toString())
      formData.append('date_of_sharing', postData.date_of_sharing.toISOString())

      try {

        dispatch(addPostThunk(formData));
        {onAddPostSuccess && onAddPostSuccess()}
      }
      catch (err) {
        {onAddPostError&& onAddPostError()} 
      }
      handleClose();
    }

  };


  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign={'center'}>שיתוף מבצע חדש</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="שם המוצר"
            type="text"
            fullWidth
            value={postData.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
            dir="rtl"
          />
          <TextField
            margin="dense"
            id="description"
            name="description"
            label="תאור - השתדל לפרט כמה שיותר, כדי להקל על החיפוש"
            type="text"
            fullWidth
            value={postData.description}
            onChange={handleChange}
            error={Boolean(errors.description)}
            helperText={errors.description}
            dir="rtl"
          />
          <TextField
            margin="dense"
            id="productLink"
            name="url"
            label="קישור למוצר באתר- אופציונלי "
            type="text"
            fullWidth
            value={postData.url}
            onChange={handleChange}
            dir="rtl"
          />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="image-upload"
            type="file"
            onChange={handleFileChange}
            multiple
          />
          <label htmlFor="image-upload">
            <Button variant="outlined" component="span" startIcon={<AddPhotoAlternate />}>
              Upload Image
            </Button>
          </label>
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            {thumbnails.map((url, index) => (
              <div key={index} style={{ position: 'relative', margin: '0.5rem' }}>
                <img
                  src={url}
                  alt={`Thumbnail ${index}`}
                  style={{ width: '100px', height: '100px' }}
                />
                {!isUpdate && <IconButton onClick={() => handleDeleteImage(index)} style={{ position: 'absolute', top: 0, right: 0 }}>
                  <Delete />
                </IconButton>}
              </div>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button onClick={handleAddPost}>{isUpdate ? 'UpDate' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default AddPostDialog;
