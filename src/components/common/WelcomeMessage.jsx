import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    Menu,
    MenuItem,
    styled
} from '../MUI';
import {
    EventIcon,
} from '../../assets/icons/icon.js';
import Grid from '@mui/material/Grid2';



const StyledPaper = styled(Paper)(({ theme }) => ({
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
    boxShadow: theme.shadows[3],
}));

const WelcomeMessage = () => {

    const [eventsAnchorEl, setEventsAnchorEl] = useState(null);

    const handleEventsClick = (event) => {
        setEventsAnchorEl(event.currentTarget);
    };

    const handleEventsClose = () => {
        setEventsAnchorEl(null);
    };

    return (
        <>
        <StyledPaper sx={{ mb: 4 }}>
            <Grid
                container
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
            >
                {/* Left Box (Text Content) */}
                <Grid size={{ xs: 12, sm: 8, md: 9 }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Welcome back, Admin! 👋
                        </Typography>
                        <Typography color="text.secondary">
                            Here's what's happening with your business today
                        </Typography>
                    </Box>
                </Grid>

                {/* Right Button */}
                <Grid size={{xs:12,sm:4,md:3}}>
                    <Button
                        variant="contained"
                        // startIcon={<Event />}
                        onClick={handleEventsClick}
                        sx={{
                            bgcolor: 'primary.main',
                            '&:hover': {
                                bgcolor: 'primary.dark',
                            },
                            width: '100%', // Make button full width on small screens
                        }}
                        size="large"
                    >
                        Upcoming Events
                    </Button>
                </Grid>
            </Grid>
        </StyledPaper>
         <Menu
         anchorEl={eventsAnchorEl}
         open={Boolean(eventsAnchorEl)}
         onClose={handleEventsClose}
         PaperProps={{
             sx: { mt: 2 }
         }}
     >
         <MenuItem onClick={handleEventsClose} sx={{ p: 2 }}>
             <EventIcon sx={{ mr: 2, color: 'primary.main' }} />
             Team Meeting - Today 2:00 PM
         </MenuItem>
         <MenuItem onClick={handleEventsClose} sx={{ p: 2 }}>
             <EventIcon sx={{ mr: 2, color: 'success.main' }} />
             Quality Audit - Tomorrow 10:00 AM
         </MenuItem>
         <MenuItem onClick={handleEventsClose} sx={{ p: 2 }}>
             <EventIcon sx={{ mr: 2, color: 'secondary.main' }} />
             Vendor Meeting - Friday 11:30 AM
         </MenuItem>
         <MenuItem onClick={handleEventsClose} sx={{ p: 2 }}>
             <EventIcon sx={{ mr: 2, color: 'warning.main' }} />
             Production Review - Friday 3:00 PM
         </MenuItem>
     </Menu>
     </>
    )
}

export default WelcomeMessage
