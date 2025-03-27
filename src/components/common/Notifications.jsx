// import React, { useState } from 'react';
// import { Box, Stack } from '@mui/material';
// import {  ThemeSwitcher } from '@toolpad/core/DashboardLayout';
// import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
// import { 
//   IconButton, 
//   Menu, 
//   MenuItem, 
//   Typography, 
// } from '@mui/material';


// function Notifications() {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   // Sample notifications (you'll replace this with your actual data)
//   const notifications = [
//     { id: 1, message: 'New order received', time: '2 mins ago' },
//     { id: 2, message: 'Profile updated successfully', time: '1 hour ago' },
//   ];

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <Stack>
//        <Box sx={{ display: 'flex', alignItems: 'center' }}>
//       <IconButton 
//         onClick={handleClick}
//         color="inherit"
//         size="small"
//       >
//         <NotificationsNoneOutlinedIcon />
//       </IconButton>
//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'right',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'right',
//         }}
//       >
//         {notifications.length === 0 ? (
//           <MenuItem disabled>No notifications</MenuItem>
//         ) : (
//           notifications.map((notification) => (
//             <MenuItem key={notification.id} onClick={handleClose}>
//               <Box>
//                 <Typography variant="body2">{notification.message}</Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   {notification.time}
//                 </Typography>
//               </Box>
//             </MenuItem>
//           ))
//         )}
//       </Menu>
//       <ThemeSwitcher />
//       </Box>
//     </Stack>
//   );
// }

// export default Notifications;



import React, { useState } from 'react';
import { 
  Box, 
  Stack, 
  IconButton, 
  Menu, 
  MenuItem, 
  Typography, 
  Badge, 
  Divider, 
  List, 
  ListItem, 
  ListItemText,
} from '../MUI';
import { ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import {ClearIcon,NotificationsNoneOutlinedIcon,CheckCircleOutlineIcon} from '../../assets/icons/icon.js';

function Notifications() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      message: 'New order received', 
      time: '2 mins ago',
      type: 'success'
    },
    { 
      id: 2, 
      message: 'Profile updated successfully', 
      time: '1 hour ago',
      type: 'info'
    },
  ]);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDismissNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getNotificationColor = (type) => {
    switch(type) {
      case 'success': return 'success.main';
      case 'error': return 'error.main';
      case 'warning': return 'warning.main';
      default: return 'info.main';
    }
  };

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Badge 
        badgeContent={notifications.length} 
        color="error"
        overlap="circular"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <IconButton 
          onClick={handleClick}
          color="inherit"
          size="medium"
          sx={{
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              backgroundColor: 'action.hover'
            }
          }}
        >
          <NotificationsNoneOutlinedIcon />
        </IconButton>
      </Badge>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            width: 320,
            maxHeight: 400,
            borderRadius: 2,
          }
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ 
          px: 2, 
          py: 1, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <Typography variant="h6" color="text.primary">
            Notifications
          </Typography>
          <Typography 
            variant="body2" 
            color="primary" 
            sx={{ cursor: 'pointer' }}
            onClick={() => setNotifications([])}
          >
            Clear All
          </Typography>
        </Box>

        <Divider />

        {notifications.length === 0 ? (
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary">
              No new notifications
            </Typography>
          </MenuItem>
        ) : (
          <List>
            {notifications.map((notification) => (
              <ListItem 
                key={notification.id}
                secondaryAction={
                  <IconButton 
                    edge="end" 
                    onClick={() => handleDismissNotification(notification.id)}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                }
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CheckCircleOutlineIcon 
                    sx={{ 
                      color: getNotificationColor(notification.type),
                      fontSize: 24 
                    }} 
                  />
                  <ListItemText
                    primary={notification.message}
                    secondary={notification.time}
                    primaryTypographyProps={{
                      variant: 'body2',
                      color: 'text.primary'
                    }}
                    secondaryTypographyProps={{
                      variant: 'caption',
                      color: 'text.secondary'
                    }}
                  />
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </Menu>
      
      <ThemeSwitcher />
    </Stack>
  );
}

export default Notifications;