// // src/theme/index.js
// import { createTheme } from '@mui/material/styles';

import { createTheme } from "@mui/material";

// export const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2',
//       light: '#42a5f5',
//       dark: '#1565c0'
//     },
//     secondary: {
//       main: '#9c27b0',
//       light: '#ba68c8',
//       dark: '#7b1fa2'
//     },
//     success: {
//       main: '#2e7d32',
//       light: '#4caf50',
//       dark: '#1b5e20'
//     },
//     warning: {
//       main: '#ed6c02',
//       light: '#ff9800',
//       dark: '#e65100'
//     },
//     error: {
//       main: '#d32f2f',
//       light: '#ef5350',
//       dark: '#c62828'
//     }
//   },
//   // ... other theme configurations
// });




const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          '.MuiToolbar-root .MuiTypography-root': {
            color: 'var(--mui-palette-text-primary)'
          }
        }
      }
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;