// import React from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Grid,
//   Typography,
//   Avatar,
//   Chip,
//   Divider,
//   useTheme,
//   useMediaQuery,
//   Paper,
//   LinearProgress
// } from '@mui/material';
// import {
//   Person,
//   Email,
//   Phone,
//   Home,
//   Business,
//   WorkOutline,
//   LocationOn,
//   AccountBalance,
//   EventNote,
//   EmergencyShare,
//   CalendarMonth,
//   Badge,
//   Star
// } from '@mui/icons-material';

// const user = {
//   "_id": "67a724af461d27e5a48e2454",
//   "basicInfo": {
//     "firstName": "Aarish",
//     "lastName": "Md",
//     "dob": "2/1/2000, 5:30:00 am",
//     "email": "aarish44@gmail.com",
//     "phoneNumber": "8800885711",
//     "gender": "male",
//     "_id": "67a724af461d27e5a48e2455"
//   },
//   "address": {
//     "mainAddress": "Sector 44",
//     "city": "Noida",
//     "state": "Uttar Pradesh",
//     "pincode": "201301",
//     "country": "India",
//     "_id": "67a724af461d27e5a48e2456"
//   },
//   "employeeId": "EMP14",
//   "hireDate": "2025-01-01T00:00:00.000Z",
//   "department": "IT",
//   "jobTitle": "Test",
//   "status": "Active",
//   "salary": 100,
//   "workLocation": "Noida",
//   "bankDetails": {
//     "accountNumber": "987654321987",
//     "bankName": "Test Bank",
//     "ifscCode": "TEST09187JN",
//     "_id": "67a724af461d27e5a48e2457"
//   },
//   "leaves": {
//     "total": 12,
//     "balance": 12,
//     "_id": "67a724af461d27e5a48e2458"
//   },
//   "emergencyContact": {
//     "emergencyContactName": "Demo",
//     "emergencyContactPhone": "8800889909",
//     "emergencyContactRelation": "Test",
//     "_id": "67a724af461d27e5a48e2459"
//   },
//   "documents": [],
//   "profilePicture": "",
//   "attendanceHistory": [],
//   "createdAt": "8/2/2025, 3:02:31 pm",
//   "updatedAt": "8/2/2025, 3:02:31 pm",
//   "__v": 0,
//   "createdBy": "Unknown"
// }

// const UserInformationPage = ({  }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const InfoSection = ({ icon, title, content }) => (
//     <Box 
//       display="flex" 
//       alignItems="center" 
//       gap={2} 
//       mb={2}
//       sx={{
//         transition: 'all 0.3s ease',
//         '&:hover': {
//           transform: 'translateX(10px)',
//           '& .MuiSvgIcon-root': {
//             color: theme.palette.primary.main,
//             transform: 'scale(1.2)',
//           }
//         }
//       }}
//     >
//       <Box
//         sx={{
//           bgcolor: 'rgba(25, 118, 210, 0.1)',
//           p: 1,
//           borderRadius: '12px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         {React.cloneElement(icon, {
//           sx: { 
//             transition: 'all 0.3s ease',
//             fontSize: '1.5rem'
//           }
//         })}
//       </Box>
//       <Box flex={1}>
//         <Typography color="textSecondary" variant="caption" sx={{ fontWeight: 500 }}>
//           {title}
//         </Typography>
//         <Typography variant="body1" sx={{ fontWeight: 500 }}>
//           {content}
//         </Typography>
//       </Box>
//     </Box>
//   );

//   return (
//     <Box 
//       p={3} 
//       sx={{
//         // background: 'linear-gradient(145deg, #f6f8fc 0%, #ffffff 100%)',
//         minHeight: '100vh'
//       }}
//     >
//       <Grid container spacing={3}>
//         {/* Header Section */}
//         <Grid item xs={12}>
//           <Card 
//             elevation={0}
//             sx={{
//               borderRadius: '20px',
//               background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
//               color: 'white',
//               position: 'relative',
//               overflow: 'hidden'
//             }}
//           >
//             <Box
//               sx={{
//                 position: 'absolute',
//                 top: 0,
//                 right: 0,
//                 width: '150px',
//                 height: '150px',
//                 background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
//                 borderRadius: '50%',
//                 transform: 'translate(50%, -50%)'
//               }}
//             />
//             <CardContent sx={{ p: 4 }}>
//               <Box 
//                 display="flex" 
//                 flexDirection={isMobile ? 'column' : 'row'} 
//                 alignItems="center" 
//                 gap={4}
//               >
//                 <Avatar
//                   src={user.profilePicture || ''}
//                   sx={{
//                     width: 140,
//                     height: 140,
//                     border: '4px solid white',
//                     boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
//                     transition: 'all 0.3s ease',
//                     '&:hover': {
//                       transform: 'scale(1.05)'
//                     }
//                   }}
//                 >
//                   {user.basicInfo.firstName[0]}
//                 </Avatar>
//                 <Box flex={1}>
//                   <Typography variant="h3" gutterBottom fontWeight="bold">
//                     {`${user.basicInfo.firstName} ${user.basicInfo.lastName}`}
//                   </Typography>
//                   <Typography variant="h6" sx={{ opacity: 0.9 }} gutterBottom>
//                     {user.jobTitle}
//                   </Typography>
//                   <Box display="flex" gap={2} mt={2}>
//                     <Chip
//                       icon={<Star />}
//                       label={user.status}
//                       sx={{
//                         bgcolor: user.status === 'Active' ? 'rgba(46, 205, 111, 0.2)' : 'rgba(255,255,255,0.2)',
//                         color: 'white',
//                         borderRadius: '12px',
//                         '& .MuiChip-icon': {
//                           color: user.status === 'Active' ? '#2ecd6f' : 'inherit'
//                         }
//                       }}
//                     />
//                     <Chip
//                       icon={<Badge />}
//                       label={user.employeeId}
//                       sx={{
//                         bgcolor: 'rgba(255,255,255,0.2)',
//                         color: 'white',
//                         borderRadius: '12px'
//                       }}
//                     />
//                   </Box>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Quick Stats */}
//         <Grid item xs={12}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6} md={3}>
//               <Paper 
//                 elevation={0}
//                 sx={{
//                   p: 3,
//                   borderRadius: '16px',
//                 //   bgcolor: '#fff',
//                   border: '1px solid rgba(0,0,0,0.1)'
//                 }}
//               >
//                 <Typography variant="overline" color="textSecondary">
//                   Total Leaves
//                 </Typography>
//                 <Typography variant="h4" fontWeight="bold" color="primary">
//                   {user.leaves.total}
//                 </Typography>
//                 <LinearProgress 
//                   variant="determinate" 
//                   value={(user.leaves.balance / user.leaves.total) * 100}
//                   sx={{ mt: 2, height: 8, borderRadius: 4 }}
//                 />
//                 <Typography variant="caption" color="textSecondary" mt={1}>
//                   {user.leaves.balance} remaining
//                 </Typography>
//               </Paper>
//             </Grid>
//             {/* Add more quick stats if needed */}
//           </Grid>
//         </Grid>

//         {/* Information Sections */}
//         <Grid item xs={12} md={6}>
//           <Card 
//             elevation={0}
//             sx={{
//               borderRadius: '20px',
//               height: '100%',
//               border: '1px solid rgba(0,0,0,0.1)',
//               '&:hover': {
//                 boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
//               },
//               transition: 'all 0.3s ease'
//             }}
//           >
//             <CardContent sx={{ p: 3}}>
//               <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
//                 Basic Information
//               </Typography>
//               <Divider sx={{ mb: 3 }} />
//               <InfoSection
//                 icon={<Email color="primary" />}
//                 title="Email Address"
//                 content={user.basicInfo.email}
//               />
//               <InfoSection
//                 icon={<Phone color="primary" />}
//                 title="Phone Number"
//                 content={user.basicInfo.phoneNumber}
//               />
//               <InfoSection
//                 icon={<CalendarMonth color="primary" />}
//                 title="Date of Birth"
//                 content={formatDate(user.basicInfo.dob)}
//               />
//               <InfoSection
//                 icon={<Person color="primary" />}
//                 title="Gender"
//                 content={user.basicInfo.gender}
//               />
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Card 
//             elevation={0}
//             sx={{
//               borderRadius: '20px',
//               height: '100%',
//               border: '1px solid rgba(0,0,0,0.1)',
//               '&:hover': {
//                 boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
//               },
//               transition: 'all 0.3s ease'
//             }}
//           >
//             <CardContent sx={{ p: 3 }}>
//               <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
//                 Work Information
//               </Typography>
//               <Divider sx={{ mb: 3 }} />
//               <InfoSection
//                 icon={<Business color="primary" />}
//                 title="Department"
//                 content={user.department}
//               />
//               <InfoSection
//                 icon={<WorkOutline color="primary" />}
//                 title="Job Title"
//                 content={user.jobTitle}
//               />
//               <InfoSection
//                 icon={<LocationOn color="primary" />}
//                 title="Work Location"
//                 content={user.workLocation}
//               />
//               <InfoSection
//                 icon={<EventNote color="primary" />}
//                 title="Hire Date"
//                 content={formatDate(user.hireDate)}
//               />
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Card 
//             elevation={0}
//             sx={{
//               borderRadius: '20px',
//               height: '100%',
//               border: '1px solid rgba(0,0,0,0.1)',
//               '&:hover': {
//                 boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
//               },
//               transition: 'all 0.3s ease'
//             }}
//           >
//             <CardContent sx={{ p: 3 }}>
//               <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
//                 Bank Details
//               </Typography>
//               <Divider sx={{ mb: 3 }} />
//               <InfoSection
//                 icon={<AccountBalance color="primary" />}
//                 title="Bank Name"
//                 content={user.bankDetails.bankName}
//               />
//               <InfoSection
//                 icon={<AccountBalance color="primary" />}
//                 title="Account Number"
//                 content={user.bankDetails.accountNumber}
//               />
//               <InfoSection
//                 icon={<AccountBalance color="primary" />}
//                 title="IFSC Code"
//                 content={user.bankDetails.ifscCode}
//               />
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Card 
//             elevation={0}
//             sx={{
//               borderRadius: '20px',
//               height: '100%',
//               border: '1px solid rgba(0,0,0,0.1)',
//               '&:hover': {
//                 boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
//               },
//               transition: 'all 0.3s ease'
//             }}
//           >
//             <CardContent sx={{ p: 3 }}>
//               <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
//                 Address Information
//               </Typography>
//               <Divider sx={{ mb: 3 }} />
//               <InfoSection
//                 icon={<Home color="primary" />}
//                 title="Address"
//                 content={`${user.address.mainAddress}, ${user.address.city}`}
//               />
//               <InfoSection
//                 icon={<LocationOn color="primary" />}
//                 title="State & Country"
//                 content={`${user.address.state}, ${user.address.country}`}
//               />
//               <InfoSection
//                 icon={<LocationOn color="primary" />}
//                 title="Pincode"
//                 content={user.address.pincode}
//               />
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12}>
//           <Card 
//             elevation={0}
//             sx={{
//               borderRadius: '20px',
//               border: '1px solid rgba(0,0,0,0.1)',
//               '&:hover': {
//                 boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
//               },
//               transition: 'all 0.3s ease'
//             }}
//           >
//             <CardContent sx={{ p: 3 }}>
//               <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
//                 Emergency Contact
//               </Typography>
//               <Divider sx={{ mb: 3 }} />
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={4}>
//                   <InfoSection
//                     icon={<EmergencyShare color="primary" />}
//                     title="Contact Name"
//                     content={user.emergencyContact.emergencyContactName}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <InfoSection
//                     icon={<Phone color="primary" />}
//                     title="Contact Phone"
//                     content={user.emergencyContact.emergencyContactPhone}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <InfoSection
//                     icon={<Person color="primary" />}
//                     title="Relation"
//                     content={user.emergencyContact.emergencyContactRelation}
//                   />
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default UserInformationPage;




import React from 'react';
import Grid from '@mui/material/Grid2';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Divider,
  useTheme,
  useMediaQuery,
  Paper,
  LinearProgress,
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  Home,
  Business,
  WorkOutline,
  LocationOn,
  AccountBalance,
  EventNote,
  EmergencyShare,
  CalendarMonth,
  Badge,
  Star
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

const UserInformationPage = ({ }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user } = useSelector(state => state.auth)


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const InfoSection = ({ icon, title, content }) => (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      mb={2}
      sx={{
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateX(10px)',
          '& .MuiSvgIcon-root': {
            color: theme.palette.primary.main,
            transform: 'scale(1.2)',
          }
        }
      }}
    >
      <Box
        sx={{
          bgcolor: theme.palette.primary.main + '0f',
          p: 1,
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {React.cloneElement(icon, {
          sx: {
            transition: 'all 0.3s ease',
            fontSize: '1.5rem'
          }
        })}
      </Box>
      <Box flex={1}>
        <Typography color="textSecondary" variant="caption" sx={{ fontWeight: 500 }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {content}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(145deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[900]} 100%)`
          : `linear-gradient(145deg, ${theme.palette.grey[50]} 0%, ${theme.palette.background.paper} 100%)`,
        minHeight: '100vh'
      }}
    >
      <Grid container spacing={3}>
        {/* Header Section */}
        <Grid size={{ xs: 12 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: '20px',
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              color: theme.palette.primary.contrastText,
              position: 'relative',
              overflow: 'hidden',
              border: 'none'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                borderRadius: '50%',
                transform: 'translate(50%, -50%)'
              }}
            />
            <CardContent sx={{ p: 4 }}>
              <Box
                display="flex"
                flexDirection={isMobile ? 'column' : 'row'}
                alignItems="center"
                gap={4}
              >
                <Avatar
                  src={user.profilePicture || ''}
                  sx={{
                    width: 140,
                    height: 140,
                    border: `4px solid ${theme.palette.background.paper}`,
                    boxShadow: theme.shadows[4],
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  {user.basicInfo.firstName[0]}
                </Avatar>
                <Box flex={1}>
                  <Typography variant="h3" gutterBottom fontWeight="bold">
                    {`${user.basicInfo.firstName} ${user.basicInfo.lastName}`}
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.9 }} gutterBottom>
                    {user.jobTitle}
                  </Typography>
                  <Box display="flex" gap={2} mt={2}>
                    <Chip
                      icon={<Star />}
                      label={user.status}
                      sx={{
                        bgcolor: user.status === 'Active' ? 'rgba(46, 205, 111, 0.2)' : 'rgba(255,255,255,0.2)',
                        color: theme.palette.primary.contrastText,
                        borderRadius: '12px',
                        '& .MuiChip-icon': {
                          color: user.status === 'Active' ? '#2ecd6f' : 'inherit'
                        }
                      }}
                    />
                    <Chip
                      icon={<Badge />}
                      label={user.employeeId}
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.2)',
                        color: theme.palette.primary.contrastText,
                        borderRadius: '12px'
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Stats */}
        <Grid size={{ xs: 12 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  bgcolor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="overline" color="textSecondary">
                  Total Leaves
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {user.leaves.total}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(user.leaves.balance / user.leaves.total) * 100}
                  sx={{
                    mt: 2,
                    height: 8,
                    borderRadius: 4,
                    bgcolor: theme.palette.action.hover
                  }}
                />
                <Typography variant="caption" color="textSecondary" mt={1}>
                  {user.leaves.balance} remaining
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Information Cards */}
        {[
          {
            title: 'Basic Information',
            content: [
              { icon: <Email />, title: 'Email Address', content: user.basicInfo.email },
              { icon: <Phone />, title: 'Phone Number', content: user.basicInfo.phoneNumber },
              { icon: <CalendarMonth />, title: 'Date of Birth', content: formatDate(user.basicInfo.dob) },
              { icon: <Person />, title: 'Gender', content: user.basicInfo.gender }
            ]
          },
          {
            title: 'Work Information',
            content: [
              { icon: <Business />, title: 'Department', content: user.workDetails.department },
              { icon: <WorkOutline />, title: 'Job Title', content: user.workDetails.jobTitle },
              { icon: <LocationOn />, title: 'Work Location', content: user.workDetails.workLocation },
              { icon: <EventNote />, title: 'Hire Date', content: formatDate(user.workDetails.hireDate) }
            ]
          },
          {
            title: 'Bank Details',
            content: [
              { icon: <AccountBalance />, title: 'Bank Name', content: user.bankDetails.bankName },
              { icon: <AccountBalance />, title: 'Account Number', content: user.bankDetails.accountNumber },
              { icon: <AccountBalance />, title: 'IFSC Code', content: user.bankDetails.ifscCode }
            ]
          },
          {
            title: 'Address Information',
            content: [
              { icon: <Home />, title: 'Address', content: `${user.address.mainAddress}, ${user.address.city}` },
              { icon: <LocationOn />, title: 'State & Country', content: `${user.address.state}, ${user.address.country}` },
              { icon: <LocationOn />, title: 'Pincode', content: user.address.pincode }
            ]
          }
        ].map((section, index) => (
          <Grid size={{ xs: 12, md: 6 }} key={index}>
            <Card
              elevation={0}
              sx={{
                borderRadius: '20px',
                height: '100%',
                bgcolor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                '&:hover': {
                  boxShadow: theme.shadows[8],
                },
                transition: 'all 0.3s ease'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
                  {section.title}
                </Typography>
                <Divider sx={{ mb: 3 }} />
                {section.content.map((item, i) => (
                  <InfoSection
                    key={i}
                    icon={item.icon}
                    title={item.title}
                    content={item.content}
                  />
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Emergency Contact */}
        <Grid size={{ xs: 12 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: '20px',
              bgcolor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              '&:hover': {
                boxShadow: theme.shadows[8],
              },
              transition: 'all 0.3s ease'
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
                Emergency Contact
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <InfoSection
                    icon={<EmergencyShare />}
                    title="Contact Name"
                    content={user.emergencyContact.name}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <InfoSection
                    icon={<Phone />}
                    title="Contact Phone"
                    content={user.emergencyContact.phoneNumber}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <InfoSection
                    icon={<Person />}
                    title="Relation"
                    content={user.emergencyContact.relation}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserInformationPage;