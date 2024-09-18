import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { ArrowForwardIos, Category } from '@mui/icons-material';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { setCategories } from '../redux/category/category.slice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { getPostsByCategoryApi } from '../services/post.service';
import { PATHS } from '../routes/paths';
import { setInitialize } from '../redux/auth/auth.slice';
import { useDispatch } from 'react-redux';
import { selectCategory } from '../redux/category/category.selectors';
import { useEffect } from 'react';
import { getCategoryApi } from '../services/category.service';

import image from '../images/שומר מסך.jpg';
import noImage from '../images/צילום מסך 2024-05-21 204449.png';
import appliances from '../images/מוצרי חשמל.png';
import FashionAndGrooming from '../images/אופנה וטיפוח.png';
import furniture from '../images/רהיטים.png';
import clothes from '../images/ביגוד.png';


type Category = {
  id: number;
  name: string;
  parent_id: number;
};

const LandingPage = () => {
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories= useAppSelector(selectCategory);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories= await getCategoryApi()
        dispatch(setCategories(categories));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();

  }, []);

  
// פונקציה שתופעל בלחיצה על כפתור קטגוריה
const handleCategoryClick = async (categoryName:string) => {
  console.log(`Category clicked: ${categoryName}`);
  const category = categories.find(cat => cat.name === categoryName);
  if(category){
      const posts= await getPostsByCategoryApi(category.id)
      navigate(PATHS.posts,{state:posts})
  }
};

  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* שורת כפתורי קטגוריות */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 4,
            gap: 2, 
          }}
        >
          {[
            { src: appliances, name: 'appliance', text:'מוצרי חשמל'},
            { src: FashionAndGrooming, name: 'Fashion and grooming',text:'אופנה וטיפוח' },
            { src: furniture, name: 'furniture',text: 'רהיטים' },
            { src: clothes, name: 'clothes',text: 'ביגוד' }
          ].map((category, index) => (
            <Box key={index} textAlign="center">
              <Button onClick={() => handleCategoryClick(category.name)} sx={{ p: 2, borderRadius: '50%', boxShadow: 3 }}>
                <img src={category.src} alt={category.name} style={{ width: '100px', height: '100px', borderRadius: '50%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }} />
              </Button>
              <Typography sx={{ mt: 1,fontWeight: 'bold' }}>{category.text}</Typography>
            </Box>
          ))}
        </Box>

        {/* החלק העליון עם הטקסטים והכפתור */}
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h2" gutterBottom>
                Welcome to Our Social Sharing Platform
              </Typography>
              <Typography variant="body1" gutterBottom>
                Share your product deals and ask questions with friends and family!
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                endIcon={<ArrowForwardIos />}
                sx={{ mt: 4 }}
              >
                Join Now
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* <img src="deal-sharing.jpg" alt="Deal Sharing" style={{ width: '100%' }} /> */}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;





























// import { Box, Button, Container, Grid, Link, Typography } from '@mui/material';
// import { ArrowForwardIos, Facebook, Instagram, Twitter } from '@mui/icons-material';
// import homeVideo from '../images/SMARTBUY 00_00_00-00_00_30.gif';
// import image from '../images/שומר מסך.jpg'

// const LandingPage = () => {
//   return (
//     <Box>
//       <Box
//       sx={{

//         backgroundImage: `url(${image})`,
//         backgroundRepeat: "no-repeat",
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         height: '100%', // תן גובה כדי לוודא שהתמונה תמלא את כל המסך
//         width:'100%',
//       }}
//       >
        
//        {/* <img src={image} alt="Deal Sharing" style={{ width: '100%',height:'50%' }} /> */}
//         <Container>
//           <Grid container spacing={4}>
//             <Grid item xs={12} md={6}>
//               <Typography variant="h2" gutterBottom>
//                 Welcome to Our Social Sharing Platform
//               </Typography>
//               <Typography variant="body1" gutterBottom>
//                 Share your product deals and ask questions with friends and family!
//               </Typography>
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 endIcon={<ArrowForwardIos />}
//                 sx={{ mt: 4 }}
//               >
//                 Join Now
//               </Button>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <img src="deal-sharing.jpg" alt="Deal Sharing" style={{ width: '100%' }} />
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       <Container sx={{ py: 8 }}>
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={6}>
//             <Box display="flex" alignItems="center">
//               <img src="product-questions.jpg" alt="Product Questions" style={{ width: '50%', marginRight: 24 }} />
//               <div>
//                 <Typography variant="h4" gutterBottom>
//                   Ask Product Questions
//                 </Typography>
//                 <Typography variant="body1">
//                   Get advice and opinions from the community about products.
//                 </Typography>
//               </div>
//             </Box>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Box display="flex" alignItems="center">
//               <img src="deal-sharing.jpg" alt="Deal Sharing" style={{ width: '50%', marginRight: 24 }} />
//               <div>
//                 <Typography variant="h4" gutterBottom>
//                   Share Product Deals
//                 </Typography>
//                 <Typography variant="body1">
//                   Post the best deals and discounts you find online.
//                 </Typography>
//               </div>
//             </Box>
//           </Grid>
//         </Grid>
//       </Container>

//       <Box
//         sx={{
//           bgcolor: 'grey.100',
//           py: 8,
//         }}
//       >
//         <Container>
//           <Typography variant="h4" gutterBottom>
//             What Users Say
//           </Typography>
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               mt: 4,
//             }}
//           >
//             <Typography variant="body1" gutterBottom>
//               "This platform has helped me save so much money on my purchases!"
//             </Typography>
//             <Typography variant="subtitle1" color="text.secondary">
//               - John Doe
//             </Typography>
//           </Box>
//         </Container>
//       </Box>

//       <Box sx={{ py: 8 }}>
//         <Container>
//           <Typography variant="h4" gutterBottom>
//             Connect with Us
//           </Typography>
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'center',
//               mt: 4,
//             }}
//           >
//             <Button
//               variant="outlined"
//               color="primary"
//               startIcon={<Facebook />}
//               sx={{ mr: 2 }}
//             >
//               Facebook
//             </Button>
//             <Button
//               variant="outlined"
//               color="primary"
//               startIcon={<Twitter />}
//               sx={{ mr: 2 }}
//             >
//               Twitter
//             </Button>
//             <Button
//               variant="outlined"
//               color="primary"
//               startIcon={<Instagram />}
//             >
//               Instagram
//             </Button>
//           </Box>
//           <Typography variant="body1" align="center" sx={{ mt: 4 }}>
//             Contact us at <a href="mailto:support@example.com">support@example.com</a>
//           </Typography>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default LandingPage;