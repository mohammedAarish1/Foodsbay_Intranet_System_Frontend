import React from 'react';
import { Modal, Box, Typography, IconButton, useTheme } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import CloseButton from '../Buttons/CloseButton';

const ViewMessageModal = ({title='', open, onClose, message }) => {
  const theme = useTheme();  // Access the current theme (light or dark)

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: { xs: '80%', sm: '50%', md: '40%' },  // Responsive width
          backgroundColor: theme.palette.background.paper,  // Adjust for light/dark mode
          borderRadius: 2,
          boxShadow: 24,
          padding: 4,
          position: 'relative',
        }}
      >
       <Box
          sx={{
            textAlign: 'end',
          }}
        >
          <CloseButton handleClose={onClose} />
        </Box>

        <Typography
          variant="h6"
          component="h2"
          id="modal-title"
          sx={{
            fontWeight: 'bold',
            // textAlign: 'center',
            marginBottom: 2,
            color: theme.palette.text.primary,  // Adjust text color for the title based on theme
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          id="modal-description"
          sx={{
            // textAlign: 'center',
            color: theme.palette.text.secondary,  // Adjust message text color for readability
          }}
        >
          {message}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ViewMessageModal;
