// // Reusable Pagination Component
// import React from 'react';
// import {
//   Box,
//   Typography,
//   MenuItem,
//   Button,
//   Stack,
//   FormControl,
//   InputLabel,
//   Select,
// } from '@mui/material';

// const Pagination = ({ count, page, rowsPerPage, onPageChange, onRowsPerPageChange, isSmallScreen }) => {
//     const handlePageChange = (newPage) => {
//       onPageChange(newPage);
//     };
  
//     return (
//       <Box sx={{
//         display: 'flex',
//         flexDirection: isSmallScreen ? 'column' : 'row',
//         justifyContent: 'space-between',
//         alignItems: isSmallScreen ? 'stretch' : 'center',
//         gap: 2,
//         p: 2
//       }}>
//         <FormControl size="small" sx={{ minWidth: 120 }}>
//           <InputLabel>Rows per page</InputLabel>
//           <Select
//             value={rowsPerPage}
//             label="Rows per page"
//             onChange={(e) => onRowsPerPageChange(e.target.value)}
//           >
//             {[5, 10, 25, 50].map((option) => (
//               <MenuItem key={option} value={option}>
//                 {option}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
  
//         <Stack direction="row" spacing={1} sx={{ width: isSmallScreen ? '100%' : 'auto' }}>
//           <Button
//             disabled={page === 0}
//             onClick={() => handlePageChange(page - 1)}
//             variant="outlined"
//             fullWidth={isSmallScreen}
//           >
//             Previous
//           </Button>
//           <Typography variant="body2" sx={{ alignSelf: 'center' }}>
//             Page {page + 1} of {Math.ceil(count / rowsPerPage)}
//           </Typography>
//           <Button
//             disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//             onClick={() => handlePageChange(page + 1)}
//             variant="outlined"
//             fullWidth={isSmallScreen}
//           >
//             Next
//           </Button>
//         </Stack>
//       </Box>
//     );
//   };

//   export default Pagination;




// Pagination.jsx
import React from 'react';
import {
  Box,
  Typography,
  MenuItem,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
} from '../MUI';

const Pagination = ({ 
  count, 
  page, 
  rowsPerPage, 
  onPageChange, 
  onRowsPerPageChange,
  isSmallScreen 
}) => {
  const totalPages = Math.ceil(count / rowsPerPage);
console.log('page',page)
console.log('count',count)
console.log('rowsPerPage',rowsPerPage)
console.log('totalPages',totalPages)
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: isSmallScreen ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: isSmallScreen ? 'stretch' : 'center',
      gap: 2,
      p: 2
    }}>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Rows per page</InputLabel>
        <Select
          value={rowsPerPage}
          label="Rows per page"
          onChange={(e) => {
            onRowsPerPageChange(Number(e.target.value));
            onPageChange(0); // Reset to first page when changing rows per page
          }}
        >
          {[5, 10, 25, 50].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Stack direction="row" spacing={1} sx={{ width: isSmallScreen ? '100%' : 'auto' }}>
        <Button
          disabled={page === 0}
          onClick={() => onPageChange(page - 1)}
          variant="outlined"
          fullWidth={isSmallScreen}
        >
          Previous
        </Button>
        <Typography variant="body2" sx={{ alignSelf: 'center' }}>
          Page {page + 1} of {totalPages}
        </Typography>
        <Button
          disabled={page >= totalPages - 1}
          onClick={() => onPageChange(page + 1)}
          variant="outlined"
          fullWidth={isSmallScreen}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
};

export default Pagination;