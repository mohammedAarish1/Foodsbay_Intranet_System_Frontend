import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Chip,
  Divider,
  Avatar,
  Paper,
  Rating,
  useMediaQuery,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Close,
  StarRounded,
  CalendarToday,
  Person,
  Timeline,
  ExpandMore
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';


// Styled components
const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ModalContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 8,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(3),
  maxWidth: '800px',
  width: '90%',
  maxHeight: '90vh',
  overflow: 'auto',
  position: 'relative',
  '&:focus': {
    outline: 'none',
  },
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const SummaryCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderLeft: `4px solid ${theme.palette.primary.main}`,
}));

const ReviewCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[4],
  },
}));

const parameterLabels = {
  awareness: "Situational Awareness",
  responsiveness: "Responsiveness",
  behavior: "Professional Behavior"
};

const getRatingColor = (rating) => {
  if (rating >= 4) return "#4CAF50"; // green
  if (rating >= 3) return "#2196F3"; // blue
  if (rating >= 2) return "#FFC107"; // amber
  return "#F44336"; // red
};

const getFormattedDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const PerformanceModal = ({ open, handleClose, data = [] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // If no data is provided, show an empty state
  if (!data || data.length === 0) {
    return (
      <StyledModal open={open} onClose={handleClose}>
        <ModalContainer>
          <Typography variant="h6">No performance data available</Typography>
          <IconButton
            sx={{ position: 'absolute', right: 8, top: 8 }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        </ModalContainer>
      </StyledModal>
    );
  }

  const performanceItem = data[0]; // Using the first item from the array

  return (
    <StyledModal
      open={open}
      onClose={handleClose}
      aria-labelledby="performance-modal-title"
    >
      <ModalContainer>
        {/* Header with close button */}
        <HeaderSection>
          <Typography id="performance-modal-title" variant="h5" component="h2">
            Performance Review
          </Typography>
          <IconButton onClick={handleClose} size="large">
            <Close />
          </IconButton>
        </HeaderSection>

        <Divider sx={{ mb: 3 }} />

        {/* Employee summary section */}
        <SummaryCard elevation={2}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box display="flex" alignItems="center">
                  <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                    {performanceItem.employeeId.split('-')[1]}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{performanceItem.employeeId}</Typography>
                    <Box display="flex" alignItems="center" mt={0.5}>
                      <CalendarToday fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {performanceItem.month}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    backgroundColor: theme.palette.grey[50],
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: isMobile ? 'flex-start' : 'center',
                    justifyContent: 'space-between',
                    gap: 2
                  }}
                >
                  <Box>
                    <Typography variant="body2" color="text.secondary">Average Rating</Typography>
                    <Box display="flex" alignItems="center">
                      <Typography variant="h5" sx={{ fontWeight: 'bold', color: getRatingColor(performanceItem.averageRating) }}>
                        {performanceItem.averageRating.toFixed(1)}
                      </Typography>
                      <StarRounded sx={{ ml: 0.5, color: getRatingColor(performanceItem.averageRating) }} />
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">Performance</Typography>
                    <Chip
                      label={`${performanceItem.ratingPercentage}%`}
                      color={performanceItem.ratingPercentage >= 80 ? "success" :
                        performanceItem.ratingPercentage >= 60 ? "primary" :
                          performanceItem.ratingPercentage >= 40 ? "warning" : "error"}
                      size="medium"
                      sx={{ fontWeight: 'bold' }}
                    />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </SummaryCard>

        {/* Performance reviews section */}
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <Timeline sx={{ mr: 1 }} />
          Individual Reviews ({performanceItem.performance.length})
        </Typography>

        {performanceItem.performance.map((review, index) => (
          <Accordion key={index} defaultExpanded={index === 0}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                    <Person />
                  </Avatar>
                </Grid>
                <Grid item xs>
                  <Typography variant="subtitle1">{review.evaluator}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Reviewed on {getFormattedDate(review.reviewDate)}
                  </Typography>
                </Grid>
                <Grid item>
                  <Chip
                    label={`${(review.review.reduce((acc, item) => acc + item.rating, 0) / review.review.length).toFixed(1)}`}
                    size="small"
                    sx={{
                      fontWeight: 'bold',
                      bgcolor: getRatingColor(review.review.reduce((acc, item) => acc + item.rating, 0) / review.review.length)
                    }}
                  />
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {review.review.map((paramReview, pIndex) => (
                  <Grid size={{xs:12,sm:6,md:4}} key={pIndex}>
                    <ReviewCard>
                      <CardContent>
                        <Typography variant="subtitle2" gutterBottom>
                          {parameterLabels[paramReview.param] || paramReview.param}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Rating
                            value={paramReview.rating}
                            readOnly
                            precision={0.5}
                            size={isMobile ? "small" : "medium"}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              ml: 1,
                              fontWeight: 'bold',
                              color: getRatingColor(paramReview.rating)
                            }}
                          >
                            {paramReview.rating}
                          </Typography>
                        </Box>
                        {paramReview.comment && (
                          <Typography variant="body2" color="text.secondary">
                            "{paramReview.comment}"
                          </Typography>
                        )}
                        {!paramReview.comment && (
                          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                            No comments provided
                          </Typography>
                        )}
                      </CardContent>
                    </ReviewCard>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </ModalContainer>
    </StyledModal>
  );
};

export default PerformanceModal