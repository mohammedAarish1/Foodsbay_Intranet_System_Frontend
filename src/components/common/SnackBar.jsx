import React from 'react';
import { Alert, Snackbar } from '@mui/material'

const SnackBar = ({
    open,
    autoHideDuration=6000,
    onClose,
    message,
    severity
}) => {
  return (
     <Snackbar
          open={open}
          autoHideDuration={autoHideDuration}
          onClose={onClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={severity}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
  )
}

export default SnackBar
