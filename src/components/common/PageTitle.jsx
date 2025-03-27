import React, { memo } from 'react'
import {
  Typography,
  useTheme,
} from '../MUI';



const PageTitle = memo(({ title }) => {
    const theme = useTheme();
    return (
        <Typography
            variant="h4"
            gutterBottom
            sx={{
                mb: 0,
                color: theme.palette.primary.main,
                fontWeight: 400,
                textAlign: 'center',
                '& span': {
                    color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark,
                }
            }}
        >
            {title}
        </Typography>
    );
});

export default PageTitle;
