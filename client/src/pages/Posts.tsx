import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { BrokenImage } from '@mui/icons-material';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { stringToBlob } from '../utils/picture';
import { useEffect, useState } from 'react';
import { Post } from '../types/post.types';
import { getPostApi } from '../services/post.service';
import { useDispatch, useSelector } from 'react-redux';
import { selectPost } from '../redux/post/post.selectors';


const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isClicked, setIsClicked] = useState(false);
  const [clickedIndex, setClickedIndex] = React.useState(-1); // מציין את האינדקס של האייקון שנלחץ

  useEffect(() => {
    const getData = async () => {
      try{
        const postsData = await getPostApi()
        setPosts(postsData)
      }catch(error){
        console.error('Error fetching posts:', error);
      }
        
    }
    
    getData();
},[]);

const allPosts = useSelector(selectPost)
const dispatch = useDispatch()



  const handleFavoriteClick = (index:number) => {
    setClickedIndex(index === clickedIndex ? -1 : index);
  };
  

  return (
    <ImageList sx={{ width: 'calc(100% - 40px)', height: 'auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {posts.map((post,index) => (
        <ImageListItem key={post.imageUrl} sx={{ position: 'relative', overflow: 'hidden', borderRadius: '10px', cursor: 'pointer', width: 'calc(20% - 10px)', marginBottom: '20px', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)' }}>
          {post.picturesBytes && post.picturesBytes[0] ? (
          <img
            srcSet={`${post.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
            // src={`${item.imageUrl}?w=248&fit=crop&auto=format`}
            src={URL.createObjectURL(stringToBlob(post.picturesBytes[0], null, null))}
            alt={post.name}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            // style={{ width: '100%', height: 'auto', transition: 'transform 0.3s ease' }}
          />): 
          (
            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <BrokenImage style={{ fontSize: '48px' }} />
            </div>
          )}
          <ImageListItemBar
            title={post.name}
            subtitle={<span style={{fontWeight: 'bold'}}>by: {post.user_Id}</span>} 
            position="below"
            sx={{ textAlign: 'center' }}
          />
          <ImageListItemBar
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              position="top"
              actionIcon={
                <IconButton
                key={index}
                  // sx={{ color: 'white',bgcolor: isClicked ? 'red' : 'transparent' }}
                  aria-label={`favorite-${index}`}
                  onClick={() => handleFavoriteClick(index)}
                >
                  {clickedIndex === index ? (
                  <FavoriteIcon  style={{ color: 'lightcoral' }} />
                    ) : (
                  <FavoriteBorderIcon sx={{ color: 'white' }}/>
          )}
                  {/* <FavoriteBorderIcon /> */}
                </IconButton>
              }
              actionPosition="left"
            />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default Posts;



const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
  },
];
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}

