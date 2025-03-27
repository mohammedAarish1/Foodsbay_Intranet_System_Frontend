import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Paper,
  Tooltip,
  Chip,
  LinearProgress,
  useTheme,
  useMediaQuery,
  Avatar
} from '@mui/material';
import {
  Edit,
  Close,
  Save,
  AccessTime,
  ExitToApp,
  Login,
  Calculate,
  MoreVert,
  Event,
  StarRate
} from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import { useDispatch } from 'react-redux';
import { updateEmpLogOutTime } from '../../../features/hrms/hrmsAPI';
import { toast } from 'react-toastify';
import { requestLogoutUpdate } from '../../../features/user/userAPI';
import CloseButton from '../../Buttons/CloseButton';


const EmployeeSessions = ({ open, curData, onUpdateLogoutTime, onClose, isUser = false }) => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(null);
  const [updatedLogoutTime, setUpdatedLogoutTime] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  console.log('curData', curData)
  // Function to format the time from "hh:mm:ss am/pm" to a Date object
  // const formatTime = (timeStr) => {
  //   const [time, modifier] = timeStr.split(' ');
  //   let [hours, minutes, seconds] = time.split(':');
  //   if (modifier === 'pm' && hours !== '12') hours = parseInt(hours, 10) + 12;
  //   if (modifier === 'am' && hours === '12') hours = 0;

  //   return new Date(1970, 0, 1, hours, minutes, seconds);
  // };

  // Calculate working hours if both login and logout times are available
  // const calculateWorkingHours = (login, logout) => {
  //   if (login && logout) {
  //     const loginDate = formatTime(login);
  //     const logoutDate = formatTime(logout);
  //     const diffInMillis = logoutDate - loginDate;
  //     const diffInHours = diffInMillis / (1000 * 60 * 60);
  //     return diffInHours.toFixed(2);
  //   }
  //   return null;
  // };

  const handleLogoutTimeChange = (e) => {
    setUpdatedLogoutTime(e.target.value);
  };

  const handleSubmission = (sessionId) => {
    const payload = { sessionId, updatedLogoutTime, date: curData.date }
    console.log('payload', payload)
    if (isUser) {
      // =========== for user for requesting to log out ========
      dispatch(requestLogoutUpdate({ attendanceId: curData._id, payload }))
        .then(result => {
          console.log('result', result)
          if (result.payload.success) {
            setIsEditing(null);
            toast.success(result.payload.message)
          }
        })

    } else {
      // ==============  for HR  ==============
      dispatch(updateEmpLogOutTime({ attendanceId: curData._id, payload }))
        .then(result => {
          console.log('result', result)
          const message = result.payload?.message || 'Action completed successfully';
          const isRejected = result.error?.message === 'Rejected';
          console.log('resultttttt', result)
          if (isRejected) {
            toast.error(message);
          } else {
            setIsEditing(null);
            toast.success(message);
          }
        })
    }
    onClose();
  };

  // Calculate the total working hours for all sessions
  const totalWorkingHours = curData.sessions?.reduce((total, session) => {
    // const workingHours = calculateWorkingHours(session.logInTime, session.logOutTime);
    return session?.workingHours ? total + session?.workingHours : total;
  }, 0).toFixed(2);

  // console.log('hoursssssssss',totalWorkingHours)

  // Get efficiency based on total working hours (example metric)
  const getEfficiencyColor = (hours) => {
    const totalHours = parseFloat(hours);
    if (totalHours >= 8) return theme.palette.success.main;
    if (totalHours >= 6) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  // Sort sessions by date (assuming the most recent is at the top)
  // const sortedSessions = curData.sessions && [...curData.sessions].sort((a, b) => {
  //   console.log('aaaaaazzzzzzzzzzz', a.logInTime)
  //   const dateA = formatTime(a.logInTime);
  //   const dateB = formatTime(b.logInTime);
  //   return dateB - dateA
  // });

  // Function to get session status chip
  const getSessionStatusChip = (session) => {
    if (!session.logOutTime) {
      return (
        <Chip
          label="Active"
          color="success"
          size="small"
          icon={<StarRate />}
          sx={{ fontWeight: 'bold' }}
        />
      );
    }
    return (
      <Chip
        label="Completed"
        color="default"
        size="small"
        variant="outlined"
      />
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
        }
      }}
    >
      <DialogTitle sx={{
        bgcolor: theme.palette.primary.main,
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccessTime />
          <Typography variant="h6">Employee Session Logs</Typography>
        </Box>
        <CloseButton handleClose={onClose} />
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ my: 3 }}>
          <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: `1px solid ${theme.palette.primary.light}` }}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, sm: 7 }}>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Calculate color="primary" fontSize="small" />
                  Total Working Hours
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 5 }} >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h5" fontWeight="bold" color="primary">
                    {totalWorkingHours}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">hours</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={Math.min((parseFloat(totalWorkingHours) / 8) * 100, 100)}
                  sx={{
                    mt: 1,
                    height: 8,
                    borderRadius: 4,
                    bgcolor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: getEfficiencyColor(totalWorkingHours)
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Box>

        <List sx={{ p: 0 }}>
          {curData.sessions?.map((session, index) => {
            // const workingHours = calculateWorkingHours(session.logInTime, session.logOutTime);
            // const sessionDate = session.logInTime.split(' ')[0]; // Extract date if included

            return (
              <ListItem key={index} sx={{ p: 0, mb: 2 }}>
                <Paper
                  elevation={1}
                  sx={{
                    width: '100%',
                    borderRadius: 2,
                    overflow: 'hidden',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      p: 1,
                      px: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      // bgcolor: theme.palette.grey[50],
                      borderBottom: `1px solid ${theme.palette.grey[200]}`
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Event fontSize="small" color="action" />
                      <Typography variant="caption" color="text.secondary">
                        Session #{session.id}
                      </Typography>
                    </Box>
                    {getSessionStatusChip(session)}
                  </Box>

                  <Box sx={{ p: 2 }}>
                    <Grid container spacing={isMobile ? 3 : 2}>
                      <Grid size={{ xs: 12, sm: 4 }} >
                        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Login fontSize="small" color="primary" />
                            Login Time
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Avatar sx={{ bgcolor: theme.palette.primary.light, width: 32, height: 32, mr: 1.5 }}>
                              <AccessTime fontSize="small" />
                            </Avatar>
                            <Typography variant="body1">
                              {session.logInTime}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <ExitToApp fontSize="small" color={session.logOutTime ? "primary" : "disabled"} />
                            Logout Time
                          </Typography>

                          {isEditing === index ? (
                            <Box sx={{ mt: 1 }}>
                              <TextField
                                type="time"
                                value={updatedLogoutTime}
                                onChange={handleLogoutTimeChange}
                                fullWidth
                                size="small"
                                slotProps={{
                                  sx: { borderRadius: 1 }
                                }}
                              // InputLabelProps={{
                              //   shrink: true,
                              // }}
                              />
                            </Box>
                          ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                              <Avatar sx={{
                                bgcolor: session.logOutTime ? theme.palette.primary.light : theme.palette.grey[200],
                                width: 32,
                                height: 32,
                                mr: 1.5
                              }}>
                                <ExitToApp fontSize="small" />
                              </Avatar>
                              <Typography variant="body1" color={session.logOutTime ? 'textPrimary' : 'text.disabled'}>
                                {session.logOutTime ? session.logOutTime : 'Not logged out yet'}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </Grid>

                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Calculate fontSize="small" color={session.workingHours ? "primary" : "disabled"} />
                            Working Hours
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            {session.workingHours ? (
                              <>
                                <Avatar sx={{
                                  bgcolor: theme.palette.success.light,
                                  width: 32,
                                  height: 32,
                                  mr: 1.5
                                }}>
                                  <Typography variant="caption" fontWeight="bold">{session.workingHours}</Typography>
                                </Avatar>
                                <Typography variant="body1">
                                  {session.workingHours} hours
                                </Typography>
                              </>
                            ) : (
                              <Typography variant="body1" color="text.disabled">
                                Pending logout
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>

                    {/* Update/Save Button Area */}
                    {(session.logOutTime === null || isEditing === index) && (
                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        gap: '10px',
                        mt: 2,
                        pt: 2,
                        borderTop: `1px dashed ${theme.palette.grey[200]}`
                      }}>
                        {!isUser && session.logoutUpdateRequest?.isRequested && (
                          <Typography>Requested Log out Time: {session.logoutUpdateRequest?.requestedLogoutTime}</Typography>
                        )}

                        {isEditing === index ? (
                          <>
                            <Button
                              variant="contained"
                              color="primary"
                              startIcon={<Save />}
                              onClick={() => handleSubmission(session._id)}
                              sx={{
                                mr: 1,
                                px: 2,
                                borderRadius: '20px'
                              }}
                            >
                              {isUser ? 'Request' : 'Save Changes'}
                            </Button>
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => setIsEditing(null)}
                              startIcon={<Close />}
                              sx={{
                                borderRadius: '20px'
                              }}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <Tooltip title="Update logout time">
                            <Button
                              variant="outlined"
                              color="primary"
                              disabled={isUser && session.logoutUpdateRequest?.isRequested && session.logoutUpdateRequest?.status === 'Pending'}
                              startIcon={<Edit />}
                              onClick={() => {
                                if (session.logoutUpdateRequest?.requestedLogoutTime) {
                                  const [time, modifier] = session.logoutUpdateRequest?.requestedLogoutTime?.split(' ');
                                  let [hours, minutes] = time.split(':');

                                  if (modifier === 'pm' && hours !== '12') {
                                    hours = (parseInt(hours) + 12).toString();
                                  }

                                  if (modifier === 'am' && hours === '12') {
                                    hours = '00';
                                  }
                                  setUpdatedLogoutTime(`${hours}:${minutes}`);
                                } else {

                                  setUpdatedLogoutTime('');
                                }
                                setIsEditing(index);
                              }}
                              sx={{
                                borderRadius: '20px',
                                px: 2
                              }}
                            >
                              {isUser ? session.logoutUpdateRequest?.isRequested && session.logoutUpdateRequest?.status === 'Pending' ? 'Requested' : 'Request to Update Log out' : 'Update Logout Time'}
                            </Button>
                          </Tooltip>
                        )}
                      </Box>
                    )}


                    {isUser && session.logoutUpdateRequest?.isRequested && (
                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        gap: '10px',
                        mt: 2,
                        pt: 2,
                        borderTop: `1px dashed ${theme.palette.grey[200]}`
                      }}>
                        Logout Approval Status:
                        <Button
                          variant="outlined"
                          color="primary"
                          // disabled={isUser && session.logoutUpdateRequest?.isRequested && session.logoutUpdateRequest?.status === 'Pending'}
                          sx={{
                            borderRadius: '20px',
                            px: 2
                          }}
                        >
                          {session.logoutUpdateRequest?.status}
                        </Button>
                      </Box>
                    )}

                  </Box>
                </Paper>
              </ListItem>
            );
          })}
        </List>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: `1px solid ${theme.palette.grey[200]}` }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={{
            borderRadius: '20px',
            px: 3
          }}
          startIcon={<Close />}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeSessions;