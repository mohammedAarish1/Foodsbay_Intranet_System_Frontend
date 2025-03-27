import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import {
  Typography,
  Paper,
  Avatar,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,

} from '../../../components/MUI';
import {
  InventoryIcon,
  WarningIcon,
  TrendingUpIcon,
  AttachMoneyIcon,
} from '../../../assets/icons/icon.js';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import StatsCard from '../../../components/common/StatsCard.jsx';


const stockMovementData = [
  { month: 'Jan', inbound: 400, outbound: 240 },
  { month: 'Feb', inbound: 300, outbound: 139 },
  { month: 'Mar', inbound: 200, outbound: 980 },
  { month: 'Apr', inbound: 278, outbound: 390 },
  { month: 'May', inbound: 189, outbound: 480 },
  { month: 'Jun', inbound: 239, outbound: 380 }
];

const categoryData = [
  { name: 'Pickles', value: 400 },
  { name: 'Honey', value: 300 },
  { name: 'Seasonings', value: 300 },
  { name: 'Sauces', value: 200 }
];

const trendData = [
  { name: 'Week 1', value: 4000 },
  { name: 'Week 2', value: 3000 },
  { name: 'Week 3', value: 2000 },
  { name: 'Week 4', value: 2780 },
  { name: 'Week 5', value: 1890 },
  { name: 'Week 6', value: 2390 }
];

const IMSOverviewPage = () => {
  const theme = useTheme();

  const statsData = [
    {
      icon: <InventoryIcon fontSize="large" />,
      title: 'Total Items',
      value: '2,345',
      desc: `+12.5% from last month`,
      bgColor: ['#1976d2', '#2196f3']
    },
    {
      icon: <WarningIcon fontSize="large" />,
      title: 'Low Stock Items',
      value: '15',
      desc: '-2.3% from the last month',
      bgColor: ['#6a1b9a', '#8e24aa']
    },
    {
      icon: <TrendingUpIcon fontSize="large" />,
      title: 'Monthly Orders',
      value: '456',
      desc: '+8.2%',
      bgColor: ['#2e7d32', '#4caf50']
    },
    {
      icon: <AttachMoneyIcon fontSize="large" />,
      title: 'Inventory Value',
      value: '$234,567',
      desc: 'Increased by +15.2%',
      bgColor: ['#ff5722', '#ff9800']
    },

  ]


  // Chart Components
  const StockMovementChart = () => (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={stockMovementData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="inbound" fill={theme.palette.primary.main} name="Inbound" />
        <Bar dataKey="outbound" fill={theme.palette.secondary.main} name="Outbound" />
      </BarChart>
    </ResponsiveContainer>
  );

  const InventoryTrendChart = () => (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={trendData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="value"
          stroke={theme.palette.primary.main}
          fill={theme.palette.primary.light}
          name="Stock Level"
        />
      </AreaChart>
    </ResponsiveContainer>
  );



  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Inventory Overview</Typography>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {statsData.map(stats => <StatsCard stats={stats} />)}

        {/* <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            icon={<InventoryIcon />}
            title="Total Items"
            value="2,345"
            trend="+12.5%"
            color="primary"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            icon={<WarningIcon />}
            title="Low Stock Items"
            value="15"
            trend="-2.3%"
            color="warning"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            icon={<TrendingUpIcon />}
            title="Monthly Orders"
            value="456"
            trend="+8.2%"
            color="success"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            icon={<AttachMoneyIcon />}
            title="Inventory Value"
            value="$234,567"
            trend="+15.2%"
            color="secondary"
          />
        </Grid> */}
      </Grid>
      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Stock Movement
            </Typography>
            <StockMovementChart />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Inventory Trend
            </Typography>
            <InventoryTrendChart />
          </Paper>
        </Grid>
      </Grid>
      {/* Recent Activity Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Typography variant="h6" sx={{ p: 2 }}>
          Recent Activity
        </Typography>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[1, 2, 3, 4, 5].map((row) => (
                <TableRow key={row} hover>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Stock Added</TableCell>
                  <TableCell>50 units</TableCell>
                  <TableCell>2024-11-15</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};


export default IMSOverviewPage;