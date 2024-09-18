import { Box, IconButton, ImageListItem, ImageListItemBar } from "@mui/material"
import { Post } from "../types/post.types";
import { stringToBlob } from "../utils/picture";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import noImage from '../images/צילום מסך 2024-05-21 204449.png';
import { useState } from "react";
import PostDetails from "../pages/PostDetails";


interface ShowPostProps {
    children?: React.ReactNode;
    post: Post;
    onClick?: (post: Post) => void;
}

const ShowPost: React.FC<ShowPostProps> = ({ post,onClick }) => {
    const [clickedFavorite, setClickedFavorite] = useState(false);
    // const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    
    const handleFavoriteClick = () => {
        setClickedFavorite(!clickedFavorite);
    };
    // const handlePostClick = () => {
    //     setSelectedPost(post);
    //   };

    // const handleClosePostDetails = () => {
    //     setSelectedPost(null);
    //     console.log("close")
    //   };

    return (
        <ImageListItem
            key={post.imageUrl}
            sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '10px',
                cursor: 'pointer',
                width: {
                    xs: 'calc(100% - 20px)',
                    sm: 'calc(50% - 20px)',
                    md: 'calc(33.33% - 20px)',
                    lg: 'calc(22% - 20px)',
                },
                margin: '10px',
                boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
            }}
        onClick={() => onClick && onClick(post)}
        >
            {post.picturesBytes && post.picturesBytes[0] ? (
                <img
                    src={URL.createObjectURL(stringToBlob(post.picturesBytes[0], null, null))}
                    alt={post.name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
            ) : (
                <img
                    src={noImage}
                    alt="default"
                    loading="lazy"
                    style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                />
            )}
            <ImageListItemBar
                position="top"
                sx={{ height: '17%', opacity: '0.2' }}
            >
            </ImageListItemBar>
            <Box
                sx={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    borderRadius: '50%',
                }}
            >
                <IconButton
                    //aria-label={`favorite-${index}`}
                    onClick={() => handleFavoriteClick()}
                >
                    {clickedFavorite ? (
                        <FavoriteIcon style={{ color: '#fa6b6b' }} />
                    ) : (
                        <FavoriteBorderIcon sx={{ color: 'white' }} />
                    )}
                </IconButton>
            </Box>
            <ImageListItemBar
                title={post.name}
                // subtitle={<span style={{ fontWeight: 'bold' }}>by: {post.user_Id}</span>}
                position="below"
                sx={{ textAlign: 'center' }}
            />
        </ImageListItem>

    );
};
export default ShowPost;