// import React, { useState } from 'react';
// import {
//   Modal,
//   Box,
//   Typography,
//   Button,
//   Rating,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   Paper,
//   Divider
// } from '@mui/material';
// import Grid from '@mui/material/Grid2';
// import { CalendarMonthIcon, CloseIcon, SaveIcon, WorkOutlineIcon } from '../../../assets/icons/icon';
// import { useSelector } from 'react-redux';


// // Style for the modal
// const modalStyle = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: '95%',
//   maxWidth: 900,
//   maxHeight: '90%',
//   overflowY: 'auto',
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   borderRadius: 3,
//   outline: 'none'
// };

// // Performance parameters to match the schema
// const performanceParams = [
//   'awareness',
//   'responsiveness',
//   // 'punctuality', 
//   'behavior',
//   // 'discipline'
// ];

// // Generate months for selection
// const generateMonths = () => {
//   const months = [];
//   for (let i = 0; i < 12; i++) {
//     const date = new Date(0, i);
//     months.push(date.toLocaleString('default', { month: 'long' }));
//   }
//   return months;
// };

// const ReviewPerformanceModal = ({
//   open,
//   handleClose,
//   employeeId,
//   onSubmit
// }) => {

//   const { user } = useSelector(state => state.auth)

//   console.log('userrrrrrrrr', user)
//   // State to manage review data
//   const [reviewData, setReviewData] = useState({
//     month: new Date().toLocaleString('default', { month: 'long' }),
//     performance: performanceParams.reduce((acc, param) => {
//       acc[param] = [{
//         rating: 3,
//         evaluator: user ? user.employeeId : '',
//         reviewDate: new Date(),
//         comments: ''
//       }];
//       return acc;
//     }, {})
//   });

//   // Handle month change
//   const handleMonthChange = (event) => {
//     setReviewData(prev => ({
//       ...prev,
//       month: event.target.value
//     }));
//   };

//   // Handle rating change for a specific parameter
//   const handleRatingChange = (param, value) => {
//     const updatedPerformance = { ...reviewData.performance };
//     updatedPerformance[param][0].rating = value;
//     setReviewData(prev => ({
//       ...prev,
//       performance: updatedPerformance
//     }));
//   };

//   // Handle comments change for a specific parameter
//   const handleCommentsChange = (param, value) => {
//     const updatedPerformance = { ...reviewData.performance };
//     updatedPerformance[param][0].comments = value;
//     setReviewData(prev => ({
//       ...prev,
//       performance: updatedPerformance
//     }));
//   };

//   // Handle form submission
//   const handleSubmitReview = async () => {
//     try {
//       // Prepare the final payload
//       const payload = {
//         employeeId: employeeId,
//         month: reviewData.month,
//         performance: reviewData.performance
//       };

//       // Call the onSubmit prop with the payload
//       await onSubmit(payload);

//       // Close the modal
//       handleClose();
//     } catch (error) {
//       console.error('Error submitting performance review:', error);
//     }
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="performance-review-modal"
//     >
//       <Box sx={modalStyle}>
//         <Paper
//           elevation={0}
//           sx={{
//             p: 3,
//             borderRadius: 3,
//             // background: 'linear-gradient(145deg, #f0f0f0, #ffffff)'
//           }}
//         >
//           <Box sx={{
//             display: 'flex',
//             alignItems: 'center',
//             marginBottom: 3,
//             flexWrap: 'wrap',
//             pb: 2,
//             borderBottom: '1px solid rgba(0,0,0,0.1)'
//           }}>
//             <WorkOutlineIcon sx={{
//               marginRight: 2,
//               color: 'primary.main',
//               fontSize: 32
//             }} />
//             <Typography
//               id="performance-review-modal"
//               variant="h5"
//               component="h2"
//               sx={{
//                 fontWeight: 600,
//                 flexGrow: 1
//               }}
//             >
//               Performance Review
//             </Typography>

//             {/* Month Selector */}
//             <FormControl
//               variant="outlined"
//               size="small"
//               sx={{ minWidth: 150 }}
//             >
//               <InputLabel>Select Month</InputLabel>
//               <Select
//                 value={reviewData.month}
//                 onChange={handleMonthChange}
//                 label="Select Month"
//                 startAdornment={<CalendarMonthIcon sx={{ mr: 1, color: 'text.secondary' }} />}
//               >
//                 {generateMonths().map((month) => (
//                   <MenuItem key={month} value={month}>
//                     {month}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>

//           <Grid container spacing={3}>
//             {performanceParams.map((param) => (
//               <Grid size={{ xs: 12 }} key={param}>
//                 <Paper
//                   elevation={1}
//                   sx={{
//                     p: 2,
//                     borderRadius: 2,
//                     // background: 'linear-gradient(145deg, #f9f9f9, #ffffff)',
//                     transition: 'transform 0.3s ease',
//                     '&:hover': {
//                       transform: 'scale(1.02)'
//                     }
//                   }}
//                 >
//                   <Typography
//                     variant="subtitle1"
//                     sx={{
//                       textTransform: 'capitalize',
//                       fontWeight: 600,
//                       mb: 2,
//                       color: 'text.primary'
//                     }}
//                   >
//                     {param}
//                   </Typography>

//                   <Grid container alignItems="center" spacing={2}>
//                     <Grid size={{ xs: 12, sm: 4 }}>
//                       <Box sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center'
//                       }}>
//                         <Rating
//                           name={`${param}-rating`}
//                           value={reviewData.performance[param][0].rating}
//                           onChange={(e, newValue) => handleRatingChange(param, newValue)}
//                           precision={0.5}
//                           max={5}
//                           size="large"
//                           sx={{
//                             '& .MuiRating-iconFilled': {
//                               color: 'primary.main'
//                             }
//                           }}
//                         />
//                       </Box>
//                     </Grid>

//                     <Grid size={{ xs: 12, sm: 8 }}>
//                       <TextField
//                         fullWidth
//                         multiline
//                         rows={2}
//                         label="Comments"
//                         variant="outlined"
//                         value={reviewData.performance[param][0].comments}
//                         onChange={(e) => handleCommentsChange(param, e.target.value)}
//                         sx={{
//                           '& .MuiOutlinedInput-root': {
//                             borderRadius: 2
//                           }
//                         }}
//                       />
//                     </Grid>
//                   </Grid>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>

//           <Box sx={{
//             display: 'flex',
//             justifyContent: 'flex-end',
//             marginTop: 3,
//             pt: 2,
//             borderTop: '1px solid rgba(0,0,0,0.1)'
//           }}>
//             <Button
//               onClick={handleClose}
//               color="secondary"
//               sx={{ marginRight: 2 }}
//               startIcon={<CloseIcon />}
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={handleSubmitReview}
//               color="primary"
//               variant="contained"
//               startIcon={<SaveIcon />}
//               sx={{
//                 borderRadius: 2,
//                 boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
//                 '&:hover': {
//                   boxShadow: '0 6px 8px rgba(0,0,0,0.15)'
//                 }
//               }}
//             >
//               Save Review
//             </Button>
//           </Box>
//         </Paper>
//       </Box>
//     </Modal>
//   );
// };

// export default ReviewPerformanceModal;




import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Grid,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Paper
} from '@mui/material';
import {
  WorkOutline as WorkOutlineIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  CalendarMonth as CalendarMonthIcon
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

// Style for the modal
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  maxWidth: 900,
  maxHeight: '90%',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 3,
  outline: 'none'
};

// Predefined performance parameters
const performanceParams = [
  'awareness',
  'responsiveness',
  'behavior',
  // 'punctuality', 
  // 'discipline'
];

// Generate months for selection
// const generateMonths = () => {
//   const months = [];
//   for (let i = 0; i < 12; i++) {
//     const date = new Date(0, i);
//     months.push(date.toLocaleString('default', { month: 'long' }));
//   }
//   return months;
// };


const generateMonths = () => {
  const months = [];
  const currentYear = new Date().getFullYear(); // Get the current year
  for (let i = 0; i < 12; i++) {
    const date = new Date(currentYear, i); // Set the year for each month
    const monthYear = date.toLocaleString('default', { month: 'long' }) + ' ' + currentYear; // Format as "Month Year"
    months.push(monthYear);
  }
  return months;
};

const ReviewPerformanceModal = ({
  open,
  handleClose,
  employeeId,
  onSubmit
}) => {

  console.log('employeeid', employeeId)
  const { user } = useSelector(state => state.auth)
  // State to manage review data
  const [reviewData, setReviewData] = useState({
    // employeeId: employeeId,
    month: new Date().toLocaleString('default', { month: 'long' }) + ' ' + new Date().getFullYear(),
    performance: {
      evaluator: user ? user.employeeId : '',
      reviewDate: new Date(),
      review: performanceParams.map(param => ({
        param: param,
        rating: 3,
        comment: ''
      }))
    }
  });

  console.log('reviewDatafffff', reviewData)
  // Handle month change
  const handleMonthChange = (event) => {
    setReviewData(prev => ({
      ...prev,
      month: event.target.value
    }));
  };

  // Handle rating change for a specific parameter
  const handleRatingChange = (paramToUpdate, newValue) => {
    setReviewData(prev => ({
      ...prev,
      performance: {
        ...prev.performance,
        review: prev.performance.review.map(reviewItem =>
          reviewItem.param === paramToUpdate
            ? { ...reviewItem, rating: newValue }
            : reviewItem
        )
      }
    }));
  };

  // Handle comments change for a specific parameter
  const handleCommentsChange = (paramToUpdate, value) => {
    setReviewData(prev => ({
      ...prev,
      performance: {
        ...prev.performance,
        review: prev.performance.review.map(reviewItem =>
          reviewItem.param === paramToUpdate
            ? { ...reviewItem, comment: value }
            : reviewItem
        )
      }
    }));
  };

  // Handle form submission
  const handleSubmitReview = async () => {
    try {

      // Prepare the final payload
      const payload = {
        employeeId: employeeId,
        month: reviewData.month,
        performance: reviewData.performance
      };
      // Call the onSubmit prop with the payload
      await onSubmit(payload);

      // Close the modal
      handleClose();
    } catch (error) {
      console.error('Error submitting performance review:', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="performance-review-modal"
    >
      <Box sx={modalStyle}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            // background: 'linear-gradient(145deg, #f0f0f0, #ffffff)'
          }}
        >
          {/* Modal Header */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 3,
            pb: 2,
            borderBottom: '1px solid rgba(0,0,0,0.1)'
          }}>
            <WorkOutlineIcon sx={{
              marginRight: 2,
              color: 'primary.main',
              fontSize: 32
            }} />
            <Typography
              id="performance-review-modal"
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 600,
                flexGrow: 1
              }}
            >
              Performance Review
            </Typography>

            {/* Month Selector */}
            <FormControl
              variant="outlined"
              size="small"
              sx={{ minWidth: 150 }}
            >
              <InputLabel>Select Month</InputLabel>
              <Select
                value={reviewData.month}
                onChange={handleMonthChange}
                label="Select Month"
                startAdornment={<CalendarMonthIcon sx={{ mr: 1, color: 'text.secondary' }} />}
              >
                {generateMonths().map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          </Box>

          {/* Performance Parameters Grid */}
          <Grid container spacing={3}>
            {reviewData.performance.review.map((reviewItem) => (
              <Grid item xs={12} key={reviewItem.param}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    // background: 'linear-gradient(145deg, #f9f9f9, #ffffff)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)'
                    }
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      textTransform: 'capitalize',
                      fontWeight: 600,
                      mb: 2,
                      color: 'text.primary'
                    }}
                  >
                    {reviewItem.param}
                  </Typography>

                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Rating
                          name={`${reviewItem.param}-rating`}
                          value={reviewItem.rating}
                          onChange={(e, newValue) => handleRatingChange(reviewItem.param, newValue)}
                          precision={0.5}
                          max={5}
                          size="large"
                          sx={{
                            '& .MuiRating-iconFilled': {
                              color: 'primary.main'
                            }
                          }}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        label="Comments"
                        variant="outlined"
                        value={reviewItem.comment}
                        onChange={(e) => handleCommentsChange(reviewItem.param, e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Action Buttons */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 3,
            pt: 2,
            borderTop: '1px solid rgba(0,0,0,0.1)'
          }}>
            <Button
              onClick={handleClose}
              color="secondary"
              sx={{ marginRight: 2 }}
              startIcon={<CloseIcon />}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitReview}
              color="primary"
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{
                borderRadius: 2,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                '&:hover': {
                  boxShadow: '0 6px 8px rgba(0,0,0,0.15)'
                }
              }}
            >
              Save Review
            </Button>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
};

export default ReviewPerformanceModal;