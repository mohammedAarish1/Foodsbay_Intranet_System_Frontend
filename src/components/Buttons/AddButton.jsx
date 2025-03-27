import { Box, Button ,useTheme} from '@mui/material'
import React, { memo } from 'react'
import { AddIcon } from '../../assets/icons/icon'

const GradientButton = memo(({ startIcon, children, onClick, ...props }) => {
    const theme = useTheme();
    return (
      <Button
        variant="contained"
        size="large"
        startIcon={startIcon}
        onClick={onClick}
        sx={{
          borderRadius: 8,
          px: 4,
          py: 1.5,
          textTransform: 'none',
          fontSize: '1.1rem',
          background: theme.palette.mode === 'dark'
            ? `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`
            : `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          boxShadow: theme.shadows[5],
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: theme.shadows[8],
          },
          transition: 'all 0.3s ease-in-out'
        }}
        {...props}
      >
        {children}
      </Button>
    );
  });


const AddButton = ({title,handleClick}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', }}>
        <GradientButton
          startIcon={<AddIcon />}
        //   onClick={() => setOpenDialog(true)}
          onClick={handleClick}
        >
          {title}
        </GradientButton>
      </Box>
  )
}

export default AddButton
