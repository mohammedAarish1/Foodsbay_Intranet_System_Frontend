import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  Cell, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, ComposedChart
} from 'recharts';
import { 
  Paper, 
  Typography, 
  Box, 
  Button, 
  ButtonGroup 
} from '@mui/material';
import { formatDate } from '../../helper/commonUtils';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const STATUS_COLORS = {
  Present: '#4CAF50',
  Absent: '#F44336',
  Late: '#FFC107',
  HalfDay: '#FF9800',
  Leave: '#9C27B0'
};

const AttendanceCharts = ({ data, defaultChart = 'status', title = 'Attendance Analytics' }) => {
  const [selectedChart, setSelectedChart] = useState(defaultChart);

  // Process data for different charts
  const processedData = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        statusData: [],
        dailyData: [],
        weeklyTrendData: [],
        employeeAttendance: []
      };
    }

    // Group by status
    const statusCount = data.reduce((acc, record) => {
      acc[record.status] = (acc[record.status] || 0) + 1;
      return acc;
    }, {});

    const statusData = Object.keys(statusCount).map(status => ({
      name: status,
      value: statusCount[status],
      color: STATUS_COLORS[status] || '#999999'
    }));

    // Daily attendance
    const sortedByDate = [...data].sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );

    const dailyData = sortedByDate.map(record => {
      // console.log('record', record)
      // Calculate working hours if available
      const workingHours = record.sessions && record.sessions.reduce((total, session) => {
        // if (session.logInTime && session.logOutTime) {
        //   const login = new Date(`1/1/2025 ${session.logInTime}`);
        //   const logout = new Date(`1/1/2025 ${session.logOutTime}`);
        //   return total + (logout - login) / (1000 * 60 * 60); // hours
        // }
        return total +session.workingHours;
      }, 0);

      return {
        date:  formatDate(record.date),
        status: record.status,
        workingHours: workingHours || 0,
        isPresent: record.status === 'Present' ? 1 : 0
      };
    });

    // console.log('dailyData',dailyData)

    // Weekly attendance trend
    const weeklyData = dailyData.reduce((acc, item) => {
      const date = new Date(item.date);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const weekKey = weekStart.toISOString().split('T')[0];
      
      if (!acc[weekKey]) {
        acc[weekKey] = {
          week: `Week of ${weekStart.toLocaleDateString()}`,
          presentDays: 0,
          totalDays: 0,
          totalHours: 0
        };
      }
      
      acc[weekKey].totalDays += 1;
      acc[weekKey].presentDays += item.status === 'Present' ? 1 : 0;
      acc[weekKey].totalHours += item.workingHours;
      
      return acc;
    }, {});

    const weeklyTrendData = Object.values(weeklyData).map(week => ({
      ...week,
      attendanceRate: (week.presentDays / week.totalDays) * 100
    }));

    // Group by employee (if multiple employees)
    const employeeData = data.reduce((acc, record) => {
      if (!acc[record.employeeId]) {
        acc[record.employeeId] = {
          employeeId: record.employeeId,
          present: 0,
          absent: 0,
          total: 0
        };
      }
      
      acc[record.employeeId].total += 1;
      if (record.status === 'Present') {
        acc[record.employeeId].present += 1;
      } else if (record.status === 'Absent') {
        acc[record.employeeId].absent += 1;
      }
      
      return acc;
    }, {});

    const employeeAttendance = Object.values(employeeData).map(emp => ({
      ...emp,
      attendanceRate: (emp.present / emp.total) * 100
    }));

    return {
      statusData,
      dailyData,
      weeklyTrendData,
      employeeAttendance
    };
  }, [data]);

  // Check if data is available
  const hasData = data && data.length > 0;

  const renderChart = () => {
    if (!hasData) {
      return <Typography variant="body1">No attendance data available</Typography>;
    }

    switch (selectedChart) {
      case 'status':
        return (
          <Box height="400px" width="100%">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={processedData.statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {processedData.statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} days`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        );
      
      case 'daily':
        return (
          <Box height="400px" width="100%">
            <ResponsiveContainer>
              <ComposedChart data={processedData.dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="isPresent" name="Attendance" fill="#4CAF50" />
                <Line yAxisId="right" type="monotone" dataKey="workingHours" name="Working Hours" stroke="#8884d8" />
              </ComposedChart>
            </ResponsiveContainer>
          </Box>
        );
      
      case 'weekly':
        return (
          <Box height="400px" width="100%">
            <ResponsiveContainer>
              <LineChart data={processedData.weeklyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="totalHours" name="Working Hours" stroke="#0088FE" />
                <Line yAxisId="right" type="monotone" dataKey="attendanceRate" name="Attendance Rate (%)" stroke="#FF8042" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        );
      
      case 'employee':
        return (
          <Box height="400px" width="100%">
            <ResponsiveContainer>
              <BarChart data={processedData.employeeAttendance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="employeeId" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" name="Present" fill="#4CAF50" />
                <Bar dataKey="absent" name="Absent" fill="#F44336" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        );
      
      default:
        return <Typography variant="body1">Select a chart type</Typography>;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
      <Box sx={{ mb: 3 }}>
        <ButtonGroup variant="outlined" aria-label="chart selection">
          <Button 
            onClick={() => setSelectedChart('status')}
            variant={selectedChart === 'status' ? 'contained' : 'outlined'}
          >
            Status Distribution
          </Button>
          <Button 
            onClick={() => setSelectedChart('daily')}
            variant={selectedChart === 'daily' ? 'contained' : 'outlined'}
          >
            Daily Attendance
          </Button>
          <Button 
            onClick={() => setSelectedChart('weekly')}
            variant={selectedChart === 'weekly' ? 'contained' : 'outlined'}
          >
            Weekly Trends
          </Button>
          <Button 
            onClick={() => setSelectedChart('employee')}
            variant={selectedChart === 'employee' ? 'contained' : 'outlined'}
          >
            Employee Comparison
          </Button>
        </ButtonGroup>
      </Box>
      {renderChart()}
    </Paper>
  );
};

export default AttendanceCharts;



// import React, { useState, useMemo } from 'react';
// import {
//   BarChart, Bar, LineChart, Line, PieChart, Pie, 
//   Cell, XAxis, YAxis, CartesianGrid, Tooltip, 
//   Legend, ResponsiveContainer, ComposedChart
// } from 'recharts';
// import { 
//   Paper, 
//   Typography, 
//   Box, 
//   Button, 
//   ButtonGroup 
// } from '@mui/material';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
// const STATUS_COLORS = {
//   Present: '#4CAF50',
//   Absent: '#F44336',
//   Late: '#FFC107',
//   HalfDay: '#FF9800',
//   Leave: '#9C27B0'
// };

// // Helper function to safely parse dates
// const parseDate = (dateString) => {
//   if (!dateString) return null;
  
//   // Try to parse MM/DD/YYYY format
//   const parts = dateString.split('/');
//   if (parts.length === 3) {
//     // Month is 0-indexed in JS Date
//     return new Date(parseInt(parts[2]), parseInt(parts[0]) - 1, parseInt(parts[1]));
//   }
  
//   // Fallback to standard date parsing
//   const date = new Date(dateString);
//   return isNaN(date.getTime()) ? null : date;
// };

// // Helper function to format date for display
// const formatDateForDisplay = (date) => {
//   if (!date) return '';
//   try {
//     return date.toLocaleDateString();
//   } catch (e) {
//     return '';
//   }
// };

// // Function to get week identifier that doesn't rely on toISOString
// const getWeekIdentifier = (date) => {
//   if (!date) return 'unknown';
//   const weekStart = new Date(date);
//   weekStart.setDate(date.getDate() - date.getDay());
//   return `${weekStart.getFullYear()}-${weekStart.getMonth()}-${weekStart.getDate()}`;
// };

// const AttendanceCharts = ({ data, defaultChart = 'status', title = 'Attendance Analytics' }) => {
//   const [selectedChart, setSelectedChart] = useState(defaultChart);

//   // Process data for different charts
//   const processedData = useMemo(() => {
//     if (!data || data.length === 0) {
//       return {
//         statusData: [],
//         dailyData: [],
//         weeklyTrendData: [],
//         employeeAttendance: []
//       };
//     }

//     try {
//       // Group by status
//       const statusCount = data.reduce((acc, record) => {
//         acc[record.status] = (acc[record.status] || 0) + 1;
//         return acc;
//       }, {});

//       const statusData = Object.keys(statusCount).map(status => ({
//         name: status,
//         value: statusCount[status],
//         color: STATUS_COLORS[status] || '#999999'
//       }));

//       // Daily attendance - Parse dates safely
//       const dailyData = data.map(record => {
//         const parsedDate = parseDate(record.date);
        
//         // Calculate working hours if available
//         const workingHours = record.sessions && record.sessions.reduce((total, session) => {
//           if (session.logInTime && session.logOutTime) {
//             try {
//               const login = new Date(`1/1/2025 ${session.logInTime}`);
//               const logout = new Date(`1/1/2025 ${session.logOutTime}`);
//               if (!isNaN(login) && !isNaN(logout)) {
//                 return total + (logout - login) / (1000 * 60 * 60); // hours
//               }
//             } catch (e) {
//               console.warn("Error calculating hours:", e);
//             }
//           }
//           return total;
//         }, 0);

//         return {
//           date: record.date, // Keep original string for display
//           parsedDate, // Store parsed date for sorting
//           status: record.status,
//           workingHours: workingHours || 0,
//           isPresent: record.status === 'Present' ? 1 : 0
//         };
//       }).filter(item => item.parsedDate !== null); // Filter out invalid dates

//       // Sort by date
//       dailyData.sort((a, b) => a.parsedDate - b.parsedDate);

//       // Weekly attendance trend - Using safer week identifier
//       const weeklyData = dailyData.reduce((acc, item) => {
//         if (!item.parsedDate) return acc;
        
//         const weekKey = getWeekIdentifier(item.parsedDate);
//         const weekStart = new Date(item.parsedDate);
//         weekStart.setDate(item.parsedDate.getDate() - item.parsedDate.getDay());
        
//         if (!acc[weekKey]) {
//           acc[weekKey] = {
//             week: `Week of ${formatDateForDisplay(weekStart)}`,
//             presentDays: 0,
//             totalDays: 0,
//             totalHours: 0
//           };
//         }
        
//         acc[weekKey].totalDays += 1;
//         acc[weekKey].presentDays += item.status === 'Present' ? 1 : 0;
//         acc[weekKey].totalHours += item.workingHours;
        
//         return acc;
//       }, {});

//       const weeklyTrendData = Object.values(weeklyData).map(week => ({
//         ...week,
//         attendanceRate: week.totalDays > 0 ? (week.presentDays / week.totalDays) * 100 : 0
//       }));

//       // Group by employee (if multiple employees)
//       const employeeData = data.reduce((acc, record) => {
//         if (!acc[record.employeeId]) {
//           acc[record.employeeId] = {
//             employeeId: record.employeeId,
//             present: 0,
//             absent: 0,
//             total: 0
//           };
//         }
        
//         acc[record.employeeId].total += 1;
//         if (record.status === 'Present') {
//           acc[record.employeeId].present += 1;
//         } else if (record.status === 'Absent') {
//           acc[record.employeeId].absent += 1;
//         }
        
//         return acc;
//       }, {});

//       const employeeAttendance = Object.values(employeeData).map(emp => ({
//         ...emp,
//         attendanceRate: emp.total > 0 ? (emp.present / emp.total) * 100 : 0
//       }));

//       return {
//         statusData,
//         dailyData,
//         weeklyTrendData,
//         employeeAttendance
//       };
//     } catch (error) {
//       console.error("Error processing attendance data:", error);
//       return {
//         statusData: [],
//         dailyData: [],
//         weeklyTrendData: [],
//         employeeAttendance: []
//       };
//     }
//   }, [data]);

//   // Check if data is available
//   const hasData = data && data.length > 0;
//   const hasProcessedData = processedData.statusData.length > 0;

//   const renderChart = () => {
//     if (!hasData || !hasProcessedData) {
//       return <Typography variant="body1">No attendance data available or error processing data</Typography>;
//     }

//     switch (selectedChart) {
//       case 'status':
//         return (
//           <Box height="400px" width="100%">
//             <ResponsiveContainer>
//               <PieChart>
//                 <Pie
//                   data={processedData.statusData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={true}
//                   outerRadius={120}
//                   fill="#8884d8"
//                   dataKey="value"
//                   label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                 >
//                   {processedData.statusData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Tooltip formatter={(value) => [`${value} days`, 'Count']} />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </Box>
//         );
      
//       case 'daily':
//         return (
//           <Box height="400px" width="100%">
//             <ResponsiveContainer>
//               <ComposedChart data={processedData.dailyData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis yAxisId="left" />
//                 <YAxis yAxisId="right" orientation="right" />
//                 <Tooltip />
//                 <Legend />
//                 <Bar yAxisId="left" dataKey="isPresent" name="Attendance" fill="#4CAF50" />
//                 <Line yAxisId="right" type="monotone" dataKey="workingHours" name="Working Hours" stroke="#8884d8" />
//               </ComposedChart>
//             </ResponsiveContainer>
//           </Box>
//         );
      
//       case 'weekly':
//         return (
//           <Box height="400px" width="100%">
//             <ResponsiveContainer>
//               <LineChart data={processedData.weeklyTrendData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="week" />
//                 <YAxis yAxisId="left" />
//                 <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
//                 <Tooltip />
//                 <Legend />
//                 <Line yAxisId="left" type="monotone" dataKey="totalHours" name="Working Hours" stroke="#0088FE" />
//                 <Line yAxisId="right" type="monotone" dataKey="attendanceRate" name="Attendance Rate (%)" stroke="#FF8042" />
//               </LineChart>
//             </ResponsiveContainer>
//           </Box>
//         );
      
//       case 'employee':
//         return (
//           <Box height="400px" width="100%">
//             <ResponsiveContainer>
//               <BarChart data={processedData.employeeAttendance}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="employeeId" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="present" name="Present" fill="#4CAF50" />
//                 <Bar dataKey="absent" name="Absent" fill="#F44336" />
//               </BarChart>
//             </ResponsiveContainer>
//           </Box>
//         );
      
//       default:
//         return <Typography variant="body1">Select a chart type</Typography>;
//     }
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
//       <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
//       <Box sx={{ mb: 3 }}>
//         <ButtonGroup variant="outlined" aria-label="chart selection">
//           <Button 
//             onClick={() => setSelectedChart('status')}
//             variant={selectedChart === 'status' ? 'contained' : 'outlined'}
//           >
//             Status Distribution
//           </Button>
//           <Button 
//             onClick={() => setSelectedChart('daily')}
//             variant={selectedChart === 'daily' ? 'contained' : 'outlined'}
//           >
//             Daily Attendance
//           </Button>
//           <Button 
//             onClick={() => setSelectedChart('weekly')}
//             variant={selectedChart === 'weekly' ? 'contained' : 'outlined'}
//           >
//             Weekly Trends
//           </Button>
//           <Button 
//             onClick={() => setSelectedChart('employee')}
//             variant={selectedChart === 'employee' ? 'contained' : 'outlined'}
//           >
//             Employee Comparison
//           </Button>
//         </ButtonGroup>
//       </Box>
//       {renderChart()}
//     </Paper>
//   );
// };

// export default AttendanceCharts;