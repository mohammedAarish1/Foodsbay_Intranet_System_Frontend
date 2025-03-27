import React from 'react'
import {
    Box,
    Button,
    CircularProgress,
} from '../MUI';

const SubmitButton = ({
    title,
    isSubmitting,
    style
}) => {
    return (
        <Box sx={style}>
        <Button
            type="submit"
            variant="contained"
            color="primary"
            // disabled={isSubmitting}
            fullWidth
            sx={{
                // mt: 3,
                fontWeight: "bold",
                bgcolor: "#1976d2",
                color: "#fff",
                "&:hover": {
                  bgcolor: "#125ea6",
                },
              }}
        >
            {/* {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
            ) : (
                {title}
            )} */}
            {title}
        </Button>
        </Box>
    )
}

export default SubmitButton
