// import React from 'react';
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Avatar,
// } from '../../MUI';


// const StatsCard = ({ icon, title, value, trend, color }) => (
//     <Card>
//       <CardContent>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//           <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.main` }}>
//             {icon}
//           </Avatar>
//           <Typography 
//             variant="body2" 
//             color={trend.startsWith('+') ? 'success.main' : 'error.main'}
//           >
//             {trend}
//           </Typography>
//         </Box>
//         <Typography variant="body2" color="text.secondary">
//           {title}
//         </Typography>
//         <Typography variant="h5" component="div">
//           {value}
//         </Typography>
//       </CardContent>
//     </Card>
//   );


import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import {
  Box,
  Typography,
  Card,
  CardContent,
  styled
} from '../MUI/index.js';
import { GroupsIcon, PersonAddOutlinedIcon, PersonOffOutlinedIcon, PersonOutlineIcon } from '../../assets/icons/icon.js';
import { getIcon } from '../../helper/getIcon.jsx';
import { useSelector } from 'react-redux';



// Styled Components
const StyledCard = styled(Card)(({ theme, gradientColors }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[6],
  },
  background: gradientColors ?
    `linear-gradient(to right, ${gradientColors[0]}, ${gradientColors[1]})` :
    theme.palette.background.paper,
}));


const StyledCardContent = styled(CardContent)(({ theme, color }) => ({
  color: color || 'inherit',
  padding: theme.spacing(3),
}));


const StatsCard = ({
  stats,
  size={ xs: 12, sm: 6, md: 3 }
}) => {


  return (
    <Grid size={size}>
      <StyledCard gradientColors={stats.bgColor}>
        <StyledCardContent color="white">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">{stats.title}</Typography>
            {/* <MonetizationOnIcon fontSize="large" /> */}
            {/* {stats.icon} */}
            {getIcon(stats.title)}
          </Box>
          <Typography variant="h4" sx={{ mb: 1 }}>{stats.value}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* <TrendingUpIcon sx={{ mr: 1 }} /> +15% from last month */}
            {stats.desc}
          </Box>
        </StyledCardContent>
      </StyledCard>
    </Grid>
  )
};

export default StatsCard;