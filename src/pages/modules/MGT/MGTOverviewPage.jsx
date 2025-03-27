import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import {
    Box,
    Typography,
    Button,
    Paper,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    Avatar,
    LinearProgress,
    styled
} from '../../../components/MUI';
import {
    TrendingUpIcon,
    InventoryIcon,
    ShoppingCartIcon,
    LocalShippingIcon,
    DownloadIcon,
    PersonIcon,
    MonetizationOnIcon,
    AnalyticsIcon,
    AssessmentIcon,
    PieChartIcon,
    AttachMoneyIcon
} from '../../../assets/icons/icon.js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import WelcomeMessage from '../../../components/common/WelcomeMessage';
import StatsCard from '../../../components/common/StatsCard.jsx';

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

// const StyledCardContent = styled(CardContent)(({ theme, color }) => ({
//     color: color || 'inherit',
//     padding: theme.spacing(3),
// }));

const StatusChip = styled(Box)(({ theme, status }) => {
    const colors = {
        success: {
            background: theme.palette.success.light,
            color: theme.palette.success.dark,
        },
        warning: {
            background: theme.palette.warning.light,
            color: theme.palette.warning.dark,
        },
        info: {
            background: theme.palette.info.light,
            color: theme.palette.info.dark,
        },
        error: {
            background: theme.palette.error.light,
            color: theme.palette.error.dark,
        },
    };

    return {
        padding: theme.spacing(0.5, 1.5),
        borderRadius: theme.shape.borderRadius,
        display: 'inline-block',
        marginLeft: theme.spacing(2),
        ...colors[status],
    };
});

const StyledPaper = styled(Paper)(({ theme }) => ({
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
    boxShadow: theme.shadows[3],
}));

// Demo data remains the same as before
const salesData = [
    { month: 'Jan', sales: 4000, orders: 240, inventory: 1200 },
    { month: 'Feb', sales: 3000, orders: 198, inventory: 1100 },
    { month: 'Mar', sales: 5000, orders: 280, inventory: 900 },
    { month: 'Apr', sales: 4500, orders: 308, inventory: 1300 },
    { month: 'May', sales: 6000, orders: 389, inventory: 1400 },
    { month: 'Jun', sales: 5500, orders: 320, inventory: 1000 }
];

const productData = [
    { name: 'Pickles', value: 400 },
    { name: 'Honey', value: 300 },
    { name: 'Seasonings', value: 200 },
    { name: 'Others', value: 100 }
];
const recentActivities = [
    {
        id: 1,
        department: 'Sales',
        activity: 'New order received from ABC Corp',
        time: '2 hours ago',
        amount: '$2,500',
        status: 'success'
    },
    {
        id: 2,
        department: 'Inventory',
        activity: 'Stock updated: +500 jars of honey',
        time: '3 hours ago',
        amount: '500 units',
        status: 'info'
    },
    {
        id: 3,
        department: 'Production',
        activity: 'Batch #2024-001 completed',
        time: '4 hours ago',
        amount: '1000 units',
        status: 'warning'
    },
    {
        id: 4,
        department: 'HR',
        activity: 'New employee joined: John Smith',
        time: '5 hours ago',
        amount: '',
        status: 'info'
    }
];

const pendingTasks = [
    { id: 1, type: 'User Approvals', count: 5, progress: 65 },
    { id: 2, type: 'Fund Approvals', count: 3, progress: 40 },
    { id: 3, type: 'Expense Approvals', count: 7, progress: 85 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
    const [reportDialogOpen, setReportDialogOpen] = useState(false);
    const [dateRange, setDateRange] = useState({ start: '', end: '' });


    const statsData = [
        {
            icon: <MonetizationOnIcon fontSize="large" />,
            title: 'Monthly Sales',
            value: '$24,500',
            // desc: <TrendingUpIcon sx={{ mr: 1 }} />+ ` +15% from last month`,
            desc: ` +15% from last month`,
            bgColor:['#1976d2', '#2196f3']
        },
        {
            icon: <InventoryIcon fontSize="large" />,
            title: 'Inventory Level',
            value: '1,450',
            desc: 'Medium stock level',
            bgColor:['#6a1b9a', '#8e24aa']
        },
        {
            icon: <ShoppingCartIcon fontSize="large" />,
            title: 'Active Orders',
            value: '20',
            desc: 'Orders in progress',
            bgColor:['#2e7d32', '#4caf50']
        },
        {
            icon: <AttachMoneyIcon fontSize="large" />,
            title: 'Monthly Expenses',
            value: '$24,500',
            desc: 'Increased by 8%',
            bgColor:['#ff5722', '#ff9800']
        },
        
    ]

    const handleReportDialogOpen = () => {
        setReportDialogOpen(true);
    };

    const handleReportDialogClose = () => {
        setReportDialogOpen(false);
    };

    return (
        <Box sx={{ p: 3, minHeight: '100vh' }}>
            {/* Header Section */}
            <WelcomeMessage />
            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {/* <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StyledCard gradientColors={['#1976d2', '#2196f3']}>
                        <StyledCardContent color="white">
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6">Monthly Sales</Typography>
                                <MonetizationOnIcon fontSize="large" />
                            </Box>
                            <Typography variant="h4" sx={{ mb: 1 }}>$24,500</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <TrendingUpIcon sx={{ mr: 1 }} /> +15% from last month
                            </Box>
                        </StyledCardContent>
                    </StyledCard>
                </Grid> */}
                {statsData.map(stats=><StatsCard stats={stats} />)}
                {/* <StatsCard /> */}
                {/* Similar Grid items for other stats with different gradients */}
                {/* <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StyledCard gradientColors={['#6a1b9a', '#8e24aa']}>

                        <StyledCardContent color="white">
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6">Inventory Level</Typography>
                                <InventoryIcon fontSize="large" />
                            </Box>
                            <Typography variant="h4" sx={{ mb: 1 }}>1,450</Typography>
                            <Typography>Medium stock level</Typography>
                        </StyledCardContent>
                    </StyledCard>
                </Grid> */}
                {/* <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StyledCard gradientColors={['#2e7d32', '#4caf50']}>

                        <StyledCardContent color="white">
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6">Active Orders</Typography>
                                <ShoppingCartIcon fontSize="large" />
                            </Box>
                            <Typography variant="h4" sx={{ mb: 1 }}>20</Typography>
                            <Typography>Orders in progress</Typography>
                        </StyledCardContent>
                    </StyledCard>
                </Grid> */}
                {/* <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StyledCard gradientColors={['#ff5722', '#ff9800']}>

                        <StyledCardContent color="white">
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6">Monthly Expenses</Typography>
                                <AttachMoneyIcon fontSize="large" />
                            </Box>
                            <Typography variant="h4" sx={{ mb: 1 }}>$12,450</Typography> 
                            <Typography>Increased by 8%</Typography> 
                        </StyledCardContent>
                    </StyledCard>
                </Grid> */}
                {/* Add other stat cards with similar structure */}
            </Grid>

            {/* Pending Tasks */}
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Pending Tasks
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {pendingTasks.map((task) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={task.id}>
                        <StyledCard>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Typography variant="h6" color="text.secondary">{task.type}</Typography>
                                    <Avatar sx={{ bgcolor: 'primary.main' }}>{task.count}</Avatar>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={task.progress}
                                    sx={{ mb: 2 }}
                                    color={task.progress > 75 ? "success" : task.progress > 50 ? "primary" : "warning"}
                                />
                                <Button variant="outlined" fullWidth>
                                    View Details
                                </Button>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>

            {/* Charts */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <StyledPaper>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                            Monthly Sales Trend
                        </Typography>
                        <Box sx={{ height: 400 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="sales"
                                        stroke="#1976d2"
                                        strokeWidth={2}
                                        dot={{ r: 6 }}
                                        activeDot={{ r: 8 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>
                    </StyledPaper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <StyledPaper>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                            Product Distribution
                        </Typography>
                        <Box sx={{ height: 400 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={productData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={150}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {productData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>
                    </StyledPaper>
                </Grid>
            </Grid>

            {/* Recent Activities */}
            <StyledPaper sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Recent Activities
                </Typography>
                <List>
                    {recentActivities.map((activity, index) => (
                        <React.Fragment key={activity.id}>
                            <ListItem sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                                <ListItemIcon>
                                    <Avatar sx={{ bgcolor: 'primary.light' }}>
                                        {activity.department === 'Sales' && <TrendingUpIcon />}
                                        {activity.department === 'Inventory' && <InventoryIcon />}
                                        {activity.department === 'Production' && <LocalShippingIcon />}
                                        {activity.department === 'HR' && <PersonIcon />}
                                    </Avatar>
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                                            {activity.activity}
                                        </Typography>
                                    }
                                    secondary={
                                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                {activity.department} • {activity.time}
                                            </Typography>
                                            {activity.amount && (
                                                <StatusChip status={activity.status}>
                                                    {activity.amount}
                                                </StatusChip>
                                            )}
                                        </Box>
                                    }
                                />
                            </ListItem>
                            {index < recentActivities.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>
            </StyledPaper>

            {/* Reports Section */}
            <StyledPaper>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Reports
                </Typography>
                <Grid container spacing={3}>
                    <Grid xs={12} sm={6} md={4}>
                        <Button
                            variant="outlined"
                            startIcon={<AnalyticsIcon />}
                            fullWidth
                            onClick={handleReportDialogOpen}
                            sx={{
                                p: 2,
                                borderWidth: 2,
                                '&:hover': {
                                    borderWidth: 2,
                                    bgcolor: 'action.hover'
                                }
                            }}
                        >
                            Sales Report
                        </Button>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <Button
                            variant="outlined"
                            startIcon={<AssessmentIcon />}
                            fullWidth
                            onClick={handleReportDialogOpen}
                            sx={{
                                p: 2,
                                borderWidth: 2,
                                '&:hover': {
                                    borderWidth: 2,
                                    bgcolor: 'action.hover'
                                }
                            }}
                        >
                            Purchase Report
                        </Button>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <Button
                            variant="outlined"
                            startIcon={<PieChartIcon />}
                            fullWidth
                            onClick={handleReportDialogOpen}
                            sx={{
                                p: 2,
                                borderWidth: 2,
                                '&:hover': {
                                    borderWidth: 2,
                                    bgcolor: 'action.hover'
                                }
                            }}
                        >
                            Inventory Report
                        </Button>
                    </Grid>
                </Grid>
            </StyledPaper>

            {/* Report Dialog */}
            <Dialog
                open={reportDialogOpen}
                onClose={handleReportDialogClose}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 2 }
                }}
            >
                <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Download Report
                    </Typography>
                </DialogTitle>

                <DialogContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 4 }}>
                        <TextField
                            label="Start Date"
                            type="date"
                            value={dateRange.start}
                            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                        <TextField
                            label="End Date"
                            type="date"
                            value={dateRange.end}
                            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                        <Typography variant="body2" color="text.secondary">
                            Select a date range to generate your report. The report will include all data within the selected period.
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                    <Button
                        onClick={handleReportDialogClose}
                        sx={{ px: 3 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleReportDialogClose}
                        variant="contained"
                        startIcon={<DownloadIcon />}
                        sx={{
                            px: 3,
                            bgcolor: 'primary.main',
                            '&:hover': {
                                bgcolor: 'primary.dark',
                            }
                        }}
                    >
                        Download Report
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Dashboard;