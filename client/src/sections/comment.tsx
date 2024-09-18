import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ThreePIcon from '@mui/icons-material/ThreeP';
import { Comment } from '../types/comment';

interface Props {
    comment: Comment;
  }

const ShowComment: React.FC<Props>=({ comment })=> {
    console.log(comment);
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar><ThreePIcon/></Avatar>
        </ListItemAvatar>
        <ListItemText
        //   primary={comment.user_Id}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {comment.description}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}

export default ShowComment;