import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import {
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Avatar,
  Chip
} from '@mui/material';

import {
  AccessTimeIcon,
  EventBusyIcon
} from '../../assets/icons/icon.js';

import CloseButton from '../Buttons/CloseButton';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@emotion/react';


const RADIAN = Math.PI / 180;

// Custom label to display percentage and count inside pie chart
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const SectionHeader = ({ icon: Icon, title, date, color, setShowCelebrations }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, }}>
        <Icon sx={{ color }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        {date && <Typography variant="subtitle1" color="textSecondary"  >
          {new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Typography>}
      </Box>

      <Box sx={{ textAlign: 'end' }}>
        <CloseButton handleClose={() => setShowCelebrations(false)} />
      </Box>
    </Box>
  );
};
const LeaveItem = ({ name, department, reason, totalDays }) => {
  return (
    <Box sx={{ py: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar src={`/api/placeholder/40/40`} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {department} • {reason}
          </Typography>
        </Box>
        <Chip
          label={`${totalDays} day${totalDays > 1 ? 's' : ''}`}
          color="warning"
          size="small"
        />
      </Box>
    </Box>
  );
};

const AttendancePieChart = ({ attendanceData = null }) => {
  // console.log('attendanceData', attendanceData)

  const theme = useTheme()

  // Format data for pie chart
  // const pieData = [
  //   {
  //     name: 'Present',
  //     value: attendanceData.summary.present,
  //     color: '#4caf50'
  //   },
  //   {
  //     name: 'Absent',
  //     value: attendanceData.summary.absent,
  //     color: '#f44336'
  //   },
  //   {
  //     name: 'Leave',
  //     value: attendanceData.summary.leave,
  //     color: '#ff9800'
  //   }
  // ].filter(item => item.value > 0);

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" component="div" fontWeight="700" align="center" gutterBottom>
        Today's Attendance Summary
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" align="center" gutterBottom>
        {new Date(attendanceData.date).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </Typography>
      <Divider sx={{ mb: 4, mt: 2 }} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box height={350} display="flex" justifyContent="center" alignItems="center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceData.todayAttendance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={130}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1500}
                  paddingAngle={3}
                >
                  {attendanceData.todayAttendance.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="white"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} employees`, name]}
                  contentStyle={{
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                    padding: '10px'
                  }}
                />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ paddingTop: '20px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
        {attendanceData.employeesOnLeave && attendanceData.employeesOnLeave.length > 0 && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <SectionHeader
                  icon={EventBusyIcon}
                  title="On Leave Today"
                  color='red'
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {attendanceData.employeesOnLeave.map((employee, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <Divider />}
                      <LeaveItem {...employee} />
                    </React.Fragment>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

      </Grid>
    </Paper>
  );
};

export default AttendancePieChart;