import React from 'react';
import Grid from '@mui/material/Grid2';

import {
    Box,
    Paper,
    Typography,
    Avatar,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Card,
    CardContent,
    LinearProgress,
    IconButton,
    useTheme,
    Tooltip,
} from '@mui/material';
import {
    Person,
    Email,
    Phone,
    EventAvailable,
    CalendarToday,
    AccessTime,
    WorkHistory,
    Assessment,
    NotificationsActive,
    Edit,
    Circle,
    LocationOn,
    Business,
    Badge,
    TrendingUp,
    ErrorOutline,
    CheckCircleOutline,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

const UserOverviewPage = () => {
    const theme = useTheme();
    const {user}=useSelector(state=>state.auth)
    console.log('user', user)

    // Mock data - Replace with actual data from your backend
    const userData = {
        name: 'John Smith',
        email: 'john.smith@company.com',
        phone: '+1 234 567 8900',
        department: 'Production',
        position: 'Senior Production Manager',
        location: 'New York Office',
        joinDate: '2022-01-15',
        status: 'Active',
        profileImage: '/path/to/image.jpg',

        attendance: {
            present: 85,
            late: 10,
            absent: 5,
            currentStreak: 15,
        },

        leaves: {
            taken: 12,
            remaining: 18,
            approved: 10,
            pending: 2,
            nextPlanned: '2024-03-15',
        },

        performance: {
            overall: 85,
            productivity: 90,
            quality: 88,
            teamwork: 82,
            improvement: '+5%',
            lastReview: '2024-01-15',
        },

        recentActivities: [
            { id: 1, type: 'Profile Update', detail: 'Updated contact information', date: '2024-02-09', time: '14:30' },
            { id: 2, type: 'Leave Request', detail: 'Sick leave approved', date: '2024-02-07', time: '09:15' },
            { id: 3, type: 'Performance Review', detail: 'Quarterly review completed', date: '2024-02-01', time: '16:45' },
        ],

        requests: {
            pending: 2,
            approved: 15,
            rejected: 3,
            lastUpdated: '2024-02-09',
        },
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'success';
            case 'inactive':
                return 'error';
            default:
                return 'default';
        }
    };

    // Custom styles for cards
    const cardStyle = {
        height: '100%',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[8],
        },
    };

    // Custom progress bar styles
    const progressBarStyle = (color) => ({
        height: 8,
        borderRadius: 4,
        [`& .MuiLinearProgress-bar`]: {
            borderRadius: 4,
        },
        backgroundColor: theme.palette[color].light,
    });

    return (
        <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, minHeight: '100vh' }}>
            {/* Header Section */}
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    mb: 3,
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.primary.dark} 100%)`,
                    color: 'white',
                }}
            >
                <Grid container spacing={3} alignItems="center">
                    <Grid size={{ xs: 12, md: 2 }}>
                        <Avatar
                            src={user.profilePicture}
                            sx={{
                                width: 120,
                                height: 120,
                                border: '4px solid white',
                                boxShadow: theme.shadows[3],
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Typography variant="h4" gutterBottom fontWeight="bold">
                            {user.basicInfo.firstName+' '+user.basicInfo.lastName}
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Badge sx={{ color: 'white' }} />
                                    <Typography>{user.workDetails.jobTitle}</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Business sx={{ color: 'white' }} />
                                    <Typography>{user.workDetails.department}</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Email sx={{ color: 'white' }} />
                                    <Typography>{user.basicInfo.email}</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <LocationOn sx={{ color: 'white' }} />
                                    <Typography>{user.workDetails.workLocation}</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <Box display="flex" flexDirection="column" gap={1} alignItems="center">
                            <Chip
                                label={userData.status}
                                color={getStatusColor(user.status)}
                                sx={{
                                    width: '100%',
                                    color: 'white',
                                    borderColor: 'white',
                                    '& .MuiChip-label': { fontWeight: 'bold' },
                                }}
                                variant="outlined"
                            />
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                Joined: {new Date(user.workDetails.hireDate).toLocaleDateString()}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            <Grid container spacing={3}>
                {/* Attendance Card */}
                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                    <Card sx={cardStyle}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                <Typography variant="h6" fontWeight="bold">
                                    Attendance Overview
                                </Typography>
                                <Tooltip title="Current Streak">
                                    <Chip
                                        icon={<TrendingUp />}
                                        label={`${userData.attendance.currentStreak} days`}
                                        color="primary"
                                        size="small"
                                    />
                                </Tooltip>
                            </Box>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <EventAvailable color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Present"
                                        secondary={
                                            <LinearProgress
                                                variant="determinate"
                                                value={userData.attendance.present}
                                                sx={progressBarStyle('primary')}
                                            />
                                        }
                                    />
                                    <Typography variant="body2" fontWeight="bold">
                                        {userData.attendance.present}%
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <AccessTime color="warning" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Late"
                                        secondary={
                                            <LinearProgress
                                                variant="determinate"
                                                value={userData.attendance.late}
                                                color="warning"
                                                sx={progressBarStyle('warning')}
                                            />
                                        }
                                    />
                                    <Typography variant="body2" fontWeight="bold">
                                        {userData.attendance.late}%
                                    </Typography>
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Leaves Card */}
                <Grid size={{ xs: 12, md: 6, lg: 4 }}> 
                    <Card sx={cardStyle}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                <Typography variant="h6" fontWeight="bold">
                                    Leave Status
                                </Typography>
                                <Tooltip title="Next Planned Leave">
                                    <Chip
                                        icon={<CalendarToday />}
                                        label={user.leaves.total}
                                        color="info"
                                        size="small"
                                    />
                                </Tooltip>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid size={{xs:6}}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            textAlign: 'center',
                                            bgcolor: theme.palette.primary.main,
                                            borderRadius: 2,
                                        }}
                                    >
                                        <Typography variant="h4" color="primary.dark" fontWeight="bold">
                                            {user.leaves.total-user.leaves.balance}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Taken
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid size={{xs:6}}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            textAlign: 'center',
                                            bgcolor: theme.palette.success.light,
                                            borderRadius: 2,
                                        }}
                                    >
                                        <Typography variant="h4" color="success.dark" fontWeight="bold">
                                            {user.leaves.balance}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Remaining
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Divider sx={{ my: 2 }} />
                            <Box display="flex" justifyContent="space-between">
                                <Chip
                                    icon={<CheckCircleOutline />}
                                    label={`${userData.leaves.approved} Approved`}
                                    color="success"
                                    size="small"
                                />
                                <Chip
                                    icon={<ErrorOutline />}
                                    label={`${userData.leaves.pending} Pending`}
                                    color="warning"
                                    size="small"
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Performance Card */}
                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                    <Card sx={cardStyle}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                <Typography variant="h6" fontWeight="bold">
                                    Performance Metrics
                                </Typography>
                                <Tooltip title="Improvement from last review">
                                    <Chip
                                        icon={<TrendingUp />}
                                        label={userData.performance.improvement}
                                        color="success"
                                        size="small"
                                    />
                                </Tooltip>
                            </Box>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <Assessment color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography>Overall Performance</Typography>
                                                <Typography fontWeight="bold">
                                                    {userData.performance.overall}%
                                                </Typography>
                                            </Box>
                                        }
                                        secondary={
                                            <LinearProgress
                                                variant="determinate"
                                                value={userData.performance.overall}
                                                sx={progressBarStyle('primary')}
                                            />
                                        }
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <WorkHistory color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography>Productivity</Typography>
                                                <Typography fontWeight="bold">
                                                    {userData.performance.productivity}%
                                                </Typography>
                                            </Box>
                                        }
                                        secondary={
                                            <LinearProgress
                                                variant="determinate"
                                                value={userData.performance.productivity}
                                                sx={progressBarStyle('primary')}
                                            />
                                        }
                                    />
                                </ListItem>
                            </List>
                            <Typography variant="caption" color="textSecondary" sx={{ mt: 2, display: 'block' }}>
                                Last Review: {userData.performance.lastReview}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Recent Activities */}
                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                    <Card sx={cardStyle}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Recent Activities
                            </Typography>
                            <List>
                                {userData.recentActivities.map((activity) => (
                                    <ListItem
                                        key={activity.id}
                                        sx={{
                                            mb: 1,
                                            bgcolor: 'background.default',
                                            borderRadius: 1,
                                            '&:hover': { bgcolor: 'action.hover' },
                                        }}
                                    >
                                        <ListItemIcon>
                                            {activity.type === 'Profile Update' ? (
                                                <Edit color="primary" />
                                            ) : activity.type === 'Leave Request' ? (
                                                <CalendarToday color="secondary" />
                                            ) : (
                                                <NotificationsActive color="warning" />
                                            )}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <Typography variant="subtitle2" fontWeight="medium">
                                                    {activity.type}
                                                </Typography>
                                            }
                                            secondary={
                                                <>
                                                    <Typography variant="body2">{activity.detail}</Typography>
                                                    <Typography variant="caption" color="textSecondary">
                                                        {activity.date} at {activity.time}
                                                    </Typography>
                                                </>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Request Status */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={cardStyle}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                                <Typography variant="h6" fontWeight="bold">
                                    Request Status
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    Last updated: {userData.requests.lastUpdated}
                                </Typography>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid size={{xs:4}}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            textAlign: 'center',
                                            bgcolor: theme.palette.warning.light,
                                            borderRadius: 2,
                                        }}
                                    >
                                        <Typography variant="h4" color="warning.dark" fontWeight="bold">
                                            {userData.requests.pending}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Pending
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid size={{xs:4}}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            textAlign: 'center',
                                            bgcolor: theme.palette.success.light,
                                            borderRadius: 2,
                                        }}
                                    >
                                        <Typography variant="h4" color="success.dark" fontWeight="bold">
                                            {userData.requests.approved}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Approved
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid size={{xs:4}}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            textAlign: 'center',
                                            bgcolor: theme.palette.error.light,
                                            borderRadius: 2,
                                        }}
                                    >
                                        <Typography variant="h4" color="error.dark" fontWeight="bold">
                                            {userData.requests.rejected}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Rejected
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Box mt={3} display="flex" justifyContent="center">
                                <Tooltip title="View all requests">
                                    <IconButton color="primary">
                                        <Assessment />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UserOverviewPage;