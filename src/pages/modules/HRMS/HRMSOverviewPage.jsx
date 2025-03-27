import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Avatar,
  Chip,
  Box,
  useTheme,
  Divider,
  styled
} from '../../../components/MUI';
import Grid from '@mui/material/Grid2';

import {
  CloseIcon,
  GroupsIcon,
  WarningIcon,
  AccessTimeIcon,
  PersonOutlineIcon,
  PersonOffOutlinedIcon,
  PersonAddOutlinedIcon,
  AssignmentTurnedInIcon,
  EmojiEventsIcon,
  CakeIcon,
  CelebrationIcon,
  EventBusyIcon
} from '../../../assets/icons/icon.js';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import WelcomeMessage from '../../../components/common/WelcomeMessage';
import StatsCard from '../../../components/common/StatsCard.jsx';
import CloseButton from '../../../components/Buttons/CloseButton.jsx';
import api from '../../../config/axiosConfig.js';
import { getIcon } from '../../../helper/getIcon.jsx';
import Loader from '../../../components/common/Loader.jsx'
import AttendancePieChart from '../../../components/charts/AttendancePieChart.jsx';


const SectionHeader = ({ icon: Icon, title, color, setShowCelebrations }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, }}>
        <Icon sx={{ color }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
      </Box>

      <Box sx={{ textAlign: 'end' }}>
        <CloseButton handleClose={() => setShowCelebrations(false)} />
      </Box>
    </Box>
  );
};

const ApprovalCard = ({ type, status, employee, department, urgent }) => {
  const theme = useTheme();

  return (
    <Paper sx={{ p: 2, bgcolor: theme.palette.background.default }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between',  mb: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          {type}
        </Typography>
        <Chip
          label={status}
          color={urgent ? 'error' : 'warning'}
          size="small"
        />
      </Box>
      <Typography variant="body2" color="text.secondary">
        {employee} • {department}
      </Typography>
    </Paper>
  );
};

// const LeaveItem = ({ name, department, reason, days }) => {
//   return (
//     <Box sx={{ py: 2 }}>
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//         <Avatar src={`/api/placeholder/40/40`} />
//         <Box sx={{ flex: 1 }}>
//           <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
//             {name}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {department} • {reason}
//           </Typography>
//         </Box>
//         <Chip
//           label={`${days} day${days > 1 ? 's' : ''}`}
//           color="warning"
//           size="small"
//         />
//       </Box>
//     </Box>
//   );
// };




const CelebrationCard = ({ name, type, date, department, profilePicture, daysUntil }) => {
  const theme = useTheme();

  return (
    <Paper sx={{
      p: 2,
      bgcolor: theme.palette.background.paper,
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      borderRadius: '16px', // rounded corners
      boxShadow: 3, // soft shadow
      transition: 'transform 0.2s, box-shadow 0.2s', // smooth hover effect
      '&:hover': {
        transform: 'scale(1.05)', // hover scale effect
        boxShadow: 6, // more prominent shadow on hover
      },
    }}>
      <Avatar
        sx={{
          bgcolor: theme.palette.secondary.main,
          width: 56,
          height: 56,
          boxShadow: 2,
          '&:hover': { boxShadow: 6 }, // Avatar hover effect
        }}
        src={profilePicture || undefined}
      >
        {!profilePicture && getIcon(type)}
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="span" >
            {name}
          </Typography>
          {department && (
            <Chip
              label={department}
              size="small"
              sx={{
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
                fontWeight: 'bold',
                borderRadius: '12px',
                padding: '2px 8px',
                fontSize: '0.875rem',
              }}
            />
          )}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
          {type} • {new Date(date).toLocaleDateString()}
        </Typography>
        {daysUntil !== undefined && (
          <Typography
            variant="body2"
            color="primary.main"
            sx={{ fontWeight: 'bold', fontSize: '1rem' }}
          >
            {daysUntil} {daysUntil === 1 ? 'day' : 'days'} until celebration
          </Typography>
        )}
      </Box>
    </Paper>
  );
};


const HRMSOverviewPage = () => {

  const theme = useTheme();
  const [showCelebrations, setShowCelebrations] = useState(true);

  const [dashboardData, setDashboardData] = useState({
    stats: [],
    attendance: [],
    leaves: [],
    approvals: [],
    compliance: [],
    topPerformer: {},
    celebrations: []
  });
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/v1/hrms/dashboard');
        console.log('responssssswe', response.data.data)
        setDashboardData(response.data.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);


  // Function to refresh a specific section
  //  const refreshSection = async (section) => {
  //   try {
  //     const response = await axios.get(`/api/hrms/dashboard/${section}`);
  //     setDashboardData(prev => ({
  //       ...prev,
  //       [section]: response.data
  //     }));
  //   } catch (error) {
  //     console.error(`Error refreshing ${section}:`, error);
  //   }
  // };


  const handleEventsClick = (event) => {
    setEventsAnchorEl(event.currentTarget);
  };

  // const statsData = [
  //   {
  //     icon: <GroupsIcon fontSize="large" />,
  //     title: 'Total Employees',
  //     value: '248',
  //     desc: ``,
  //     bgColor: ['#1976d2', '#2196f3']
  //   },
  //   {
  //     icon: <PersonOutlineIcon fontSize="large" />,
  //     title: 'Active Employees',
  //     value: '37',
  //     desc: '',
  //     bgColor: ['#6a1b9a', '#8e24aa']
  //   },
  //   {
  //     icon: <PersonOffOutlinedIcon fontSize="large" />,
  //     title: 'Inactive Employees',
  //     value: '23',
  //     desc: '',
  //     bgColor: ['#ff5722', '#ff9800']
  //   },
  //   {
  //     icon: <PersonAddOutlinedIcon fontSize="large" />,
  //     title: 'New Employees',
  //     value: '02',
  //     desc: '',
  //     bgColor: ['#2e7d32', '#4caf50']
  //   },

  // ]




  // const attendanceData = [
  //   { time: '9 AM', count: 180 },
  //   { time: '10 AM', count: 210 },
  //   { time: '11 AM', count: 225 },
  //   { time: '12 PM', count: 223 },
  //   { time: '1 PM', count: 220 },
  //   { time: '2 PM', count: 218 }
  // ];

  // const employeesOnLeave = [
  //   { name: 'Alice Johnson', department: 'Marketing', reason: 'Vacation', days: 5 },
  //   { name: 'Bob Smith', department: 'IT', reason: 'Sick Leave', days: 2 },
  //   { name: 'Carol White', department: 'Sales', reason: 'Personal', days: 1 }
  // ];

  // const pendingApprovals = [
  //   { type: 'Leave Request', count: 5, employee: 'John Doe', department: 'Production', urgent: true },
  //   { type: 'Half Day', count: 3, employee: 'Jane Smith', department: 'Quality', urgent: false },
  //   { type: 'WFH Request', count: 2, employee: 'Mike Johnson', department: 'Sales', urgent: true }
  // ];

  // const celebrations = [
  //   { type: 'Birthday', name: 'Sarah Wilson', date: 'Today', department: 'Marketing', icon: CakeIcon },
  //   { type: 'Holiday', name: 'Company Day', date: 'Next Monday', department: 'All', icon: CelebrationIcon }
  // ];

  // const pendingCompliance = [
  //   { type: 'Document Verification', count: 8, employee: 'John Doe', department: 'Production', urgent: true },
  //   { type: 'Policy Updates', count: 3, employee: 'John Doe', department: 'Production', urgent: false },
  //   { type: 'Training Completion', count: 12, employee: 'John Doe', department: 'Production', urgent: true }
  // ];



  if (loading) {
    return (
      <Loader
        size="large"
        color="secondary"
        variant="icon"
        overlay={true}
        text="Please wait..." />
    )
  }

  return (
    <Box sx={{
      p: 3,
      bgcolor: theme.palette.background.default,
      minHeight: '100vh'
    }}>
      {/* Header Section */}
      <WelcomeMessage />
      {/* Celebrations Section */}
      {showCelebrations && (
        <Card sx={{ mb: 3, position: 'relative' }}>
          <CardContent>
            {/* <Box sx={{ textAlign: 'end' }}>
              <CloseButton handleClose={() => setShowCelebrations(false)} />
            </Box> */}
            <SectionHeader
              icon={CelebrationIcon}
              title="Upcoming Celebrations"
              color={theme.palette.secondary.main}
              setShowCelebrations={setShowCelebrations}
            />
            <Grid container spacing={2}>
              {dashboardData.celebrations.map((item, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={index}>
                  <CelebrationCard {...item} />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {dashboardData?.stats.map((stats, index) => (
          <StatsCard stats={stats} key={index} />
        ))} 
      </Grid>

      {/* Main Content Grid */}
      <AttendancePieChart attendanceData={dashboardData.attendance} />
      <Grid container spacing={3}>

        {/* Bottom Grid */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <SectionHeader
                icon={AssignmentTurnedInIcon}
                title="Pending Approvals"
                color={theme.palette.success.main}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {dashboardData.approvals.map((item, index) => (
                  <ApprovalCard key={index} {...item} />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <SectionHeader
                icon={WarningIcon}
                title="Pending Compliance"
                color={theme.palette.error.main}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {dashboardData.compliance.map((item, index) => (
                  <ApprovalCard key={index} {...item} />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <SectionHeader
                icon={EmojiEventsIcon}
                title="Top Performer"
                color={theme.palette.warning.main}
              />
              <Box sx={{ textAlign: 'center' }}>
                <Avatar
                  src="/api/placeholder/120/120"
                  sx={{
                    width: 120,
                    height: 120,
                    margin: '0 auto',
                    border: `4px solid ${theme.palette.warning.main}`,
                    mb: 2
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Robert Chen
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Sales Department
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Achieved 150% of monthly target
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Chip label="Top Sales" color="primary" />
                  <Chip label="Perfect Attendance" color="success" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HRMSOverviewPage;