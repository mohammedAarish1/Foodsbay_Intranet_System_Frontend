// import React, { useState } from 'react';
// import { 
//   Box, 
//   Typography, 
//   Paper, 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableContainer, 
//   TableHead, 
//   TableRow, 
//   Button, 
//   IconButton, 
//   Tooltip,
//   useTheme,
//   useMediaQuery,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions
// } from '@mui/material';
// import { 
//   Visibility as ViewIcon, 
//   Edit as EditIcon, 
//   Delete as DeleteIcon, 
//   AddCircleOutline as AddIcon,
//   DocumentScanner as DocScanIcon 
// } from '@mui/icons-material';

// // Sample data structure - replace with your actual data fetching logic
// const mockTransactionData = [
//   {
//     id: 1,
//     name: 'Pickle Jar',
//     invoiceNumber: 'INV-2024-001',
//     amount: 5000,
//     units: 100,
//     clientVendor: 'Grocery Mart',
//     biltyNumber: 'BLT-2024-001',
//     date: '2024-02-15',
//   },
//   // Add more mock data entries
// ];

// const InventoryTransactionList = ({ 
//   transactionType, // 'inward' or 'outward'
//   data = mockTransactionData 
// }) => {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
//   const [openViewDialog, setOpenViewDialog] = useState(false);
//   const [selectedTransaction, setSelectedTransaction] = useState(null);

//   const handleViewDetails = (transaction) => {
//     setSelectedTransaction(transaction);
//     setOpenViewDialog(true);
//   };

//   const handleCloseViewDialog = () => {
//     setOpenViewDialog(false);
//     setSelectedTransaction(null);
//   };

//   const renderTransactionTable = () => {
//     return (
//       <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
//         <Table sx={{ minWidth: isSmallScreen ? 300 : 650 }}>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               {!isSmallScreen && (
//                 <>
//                   <TableCell>Invoice No.</TableCell>
//                   <TableCell>Amount</TableCell>
//                 </>
//               )}
//               <TableCell>Units</TableCell>
//               <TableCell>Client/Vendor</TableCell>
//               {!isSmallScreen && (
//                 <>
//                   <TableCell>Bilty No.</TableCell>
//                   <TableCell>Date</TableCell>
//                 </>
//               )}
//               <TableCell align="center">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((transaction) => (
//               <TableRow 
//                 key={transaction.id} 
//                 hover
//                 sx={{ 
//                   '&:last-child td, &:last-child th': { border: 0 },
//                   transition: 'background-color 0.2s',
//                 }}
//               >
//                 <TableCell>{transaction.name}</TableCell>
//                 {!isSmallScreen && (
//                   <>
//                     <TableCell>{transaction.invoiceNumber}</TableCell>
//                     <TableCell>{transaction.amount}</TableCell>
//                   </>
//                 )}
//                 <TableCell>{transaction.units}</TableCell>
//                 <TableCell>{transaction.clientVendor}</TableCell>
//                 {!isSmallScreen && (
//                   <>
//                     <TableCell>{transaction.biltyNumber}</TableCell>
//                     <TableCell>{transaction.date}</TableCell>
//                   </>
//                 )}
//                 <TableCell align="center">
//                   <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
//                     <Tooltip title="View Docs">
//                       <IconButton color="primary" size="small">
//                         <DocScanIcon />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="View Details">
//                       <IconButton 
//                         color="info" 
//                         size="small" 
//                         onClick={() => handleViewDetails(transaction)}
//                       >
//                         <ViewIcon />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Edit">
//                       <IconButton color="warning" size="small">
//                         <EditIcon />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Delete">
//                       <IconButton color="error" size="small">
//                         <DeleteIcon />
//                       </IconButton>
//                     </Tooltip>
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
//   };

//   const renderDetailsDialog = () => {
//     return (
//       <Dialog 
//         open={openViewDialog} 
//         onClose={handleCloseViewDialog}
//         maxWidth="md"
//         fullWidth
//       >
//         <DialogTitle>Transaction Details</DialogTitle>
//         <DialogContent dividers>
//           {selectedTransaction && (
//             <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
//               <Typography><strong>Name:</strong> {selectedTransaction.name}</Typography>
//               <Typography><strong>Invoice Number:</strong> {selectedTransaction.invoiceNumber}</Typography>
//               <Typography><strong>Amount:</strong> {selectedTransaction.amount}</Typography>
//               <Typography><strong>Units:</strong> {selectedTransaction.units}</Typography>
//               <Typography><strong>Client/Vendor:</strong> {selectedTransaction.clientVendor}</Typography>
//               <Typography><strong>Bilty Number:</strong> {selectedTransaction.biltyNumber}</Typography>
//               <Typography><strong>Date:</strong> {selectedTransaction.date}</Typography>
//             </Box>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseViewDialog} color="primary">Close</Button>
//         </DialogActions>
//       </Dialog>
//     );
//   };

//   return (
//     <Box sx={{ 
//       width: '100%', 
//       p: 2,
//       bgcolor: theme.palette.background.default
//     }}>
//       <Box sx={{ 
//         display: 'flex', 
//         justifyContent: 'space-between', 
//         alignItems: 'center', 
//         mb: 2 
//       }}>
//         <Typography variant="h4" gutterBottom>
//           {transactionType === 'inward' ? 'Item Inward' : 'Item Outward'}
//         </Typography>
//         <Button 
//           variant="contained" 
//           color="primary" 
//           startIcon={<AddIcon />}
//         >
//           Add New
//         </Button>
//       </Box>

//       {renderTransactionTable()}
//       {renderDetailsDialog()}
//     </Box>
//   );
// };

// export default InventoryTransactionList;



