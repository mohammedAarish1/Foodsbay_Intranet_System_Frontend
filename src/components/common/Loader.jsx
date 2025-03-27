import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Fade
} from '@mui/material';
import LoopIcon from '@mui/icons-material/Loop';

// Props:
// - size: 'small', 'medium', 'large' - controls the size of the loader
// - color: primary, secondary, success, error, info, warning, or any custom color
// - text: Optional text to display below the loader
// - variant: 'circular' (default) or 'icon' - changes the style of the loader
// - overlay: Boolean - if true, creates a full-screen overlay

const Loader = ({
  size = 'medium',
  color = 'primary',
  text,
  variant = 'circular',
  overlay = false
}) => {
  // Size mapping
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 60
  };

  const loaderSize = sizeMap[size] || sizeMap.medium;

  const LoaderContent = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      {variant === 'circular' ? (
        <CircularProgress
          size={loaderSize}
          color={color}
          thickness={4}
        />
      ) : (
        <Box
          sx={{
            animation: 'spin 1.5s linear infinite',
            '@keyframes spin': {
              '0%': {
                transform: 'rotate(0deg)',
              },
              '100%': {
                transform: 'rotate(360deg)',
              },
            },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <LoopIcon
            sx={{
              fontSize: loaderSize,
              color: color === 'inherit' ? 'inherit' : `${color}.main`
            }}
          />
        </Box>
      )}

      {text && (
        <Typography
          variant={size === 'small' ? 'caption' : 'body2'}
          color="text.secondary"
          sx={{ mt: 1, textAlign: 'center' }}
        >
          {text}
        </Typography>
      )}
    </Box>
  );

  // If overlay is true, render with full-screen overlay
  if (overlay) {
    return (
      <Fade in={true}>
        <Box
          sx={{
            // position: 'absolute',
            // top: 0,
            // left: 0,
            // right: 0,
            // bottom: 0,
            // width: '100%',
            // height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 9999,
            height: '100vh',

          }}
        >
          <Box
            sx={{
              backgroundColor: 'background.paper',
              borderRadius: 1,
              boxShadow: 3,
              p: 3
            }}
          >
            <LoaderContent />
          </Box>
        </Box>
      </Fade>
    );
  }

  // Default rendering without overlay
  return <LoaderContent />;
};

export default Loader;