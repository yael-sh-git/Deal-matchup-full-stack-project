import * as React from 'react';
import { Box, ImageList } from "@mui/material";
import { selectUser } from "../redux/user/user.selectors";
import { Post } from "../types/post.types";
import EditablePost from "../components/EditablePost";
import SearchIcon from '@mui/icons-material/Search';
import { useAppSelector } from '../redux/store';

interface UserPostsProps {
  typeId: number;
}

const UserPosts: React.FC<UserPostsProps> = ({ typeId }) => {
  const user = useAppSelector(selectUser);
  const posts = user?.shared_items?.filter((post: Post) => post.type_Id === typeId);

  const handleUpdatePost = (updatedPost: Post) => {
    // כאן אפשר להוסיף את הלוגיקה לעדכון הפוסט בשרת או ברדוקס
    console.log("Updated post:", updatedPost);
  };

  return (
    <ImageList
      sx={{
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
      }}
    >
      {posts ? (
        posts.map((post, index) => (
          <EditablePost
            key={post.id}
            post={post}
            onUpdate={handleUpdatePost}
          />
        ))
      ) : (
        <Box sx={{ textAlign: 'center', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <SearchIcon sx={{ fontSize: '50px', color: 'gray' }} />
          <h2>עוד לא פרסמת </h2>
        </Box>
      )}
    </ImageList>
  );
};

export default UserPosts;
