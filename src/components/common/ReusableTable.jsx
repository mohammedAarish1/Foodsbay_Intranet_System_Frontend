// // ReusableTable.jsx
// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Menu,
//   MenuItem,
//   Card,
//   Box,
//   Typography,
//   Alert,
//   useMediaQuery,
//   Chip,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   TextField,
//   InputAdornment,
//   Drawer,
//   Grid2,
// } from "@mui/material";
// import { Add, Close, Delete, Download, Edit, FilterList, LocalShipping, MoreVert, Search, Visibility } from "@mui/icons-material";
// import { useTheme } from "@emotion/react";
// // import Grid from '@mui/material/Grid2';
// import Pagination from './Pagination.jsx';
// import MobileCard from "./MobileCard.jsx";
// import { getItemTypeColor, getStatusColor } from "../../helper/getDynamicColor.js";
// // import CustomSearch from "./Search.jsx";



// const ReusableTable = ({ pageTitle, columns, rows, actions, handleAddingNewItem }) => {
//   const theme = useTheme();
//   const [actionAnchorEl, setActionAnchorEl] = useState(null);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('all');
//   const [error, setError] = useState(null);
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
//   const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [filterAnchorEl, setFilterAnchorEl] = useState(null);
//   const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

//   console.log('rows', rows)
//   // Filter items
//   const filteredItems = rows?.filter((item) => {
//     const matchesSearch = item.name?.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
//       item.inventoryType?.toLowerCase().includes(searchTerm.trim().toLowerCase());
//     const matchesCategory = categoryFilter === 'all' || item.category?.toLowerCase() === categoryFilter.toLowerCase();
//     return matchesSearch && matchesCategory;
//   });

//   const handleActionClick = (e, row) => {
//     setActionAnchorEl(e.currentTarget);
//     setSelectedItem(row);
//   };

//   const handleFilterClick = (event) => {
//     if (isMobileScreen) {
//       setIsFilterDrawerOpen(true);
//     } else {
//       setFilterAnchorEl(event.currentTarget);
//     }
//   };


//   // Paginated items for both mobile and desktop views
//   const paginatedItems = filteredItems.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );


//   const handleExport = () => {
//     const csv = filteredItems.map(item =>
//       Object.values(item).join(',')
//     ).join('\n');

//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'inventory.csv';
//     a.click();
//     window.URL.revokeObjectURL(url);

//     setSnackbar({ open: true, message: 'Export completed', severity: 'success' });
//   };

//   return (
//     <>

//       {/* Header Section */}
//       <Box sx={{
//         mb: 3,
//         display: 'flex',
//         flexDirection: isSmallScreen ? 'column' : 'row',
//         gap: 2,
//         justifyContent: 'space-between',
//         alignItems: isSmallScreen ? 'stretch' : 'center'
//       }}>
//         <Typography variant="h4" component="h1">
//           {pageTitle}
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<Add />}
//           fullWidth={isSmallScreen}
//           // onClick={() => setSnackbar({ open: true, message: 'Add item functionality coming soon', severity: 'info' })}
//           onClick={handleAddingNewItem}
//         >
//           Add New Item
//         </Button>
//       </Box>
//       {/* Search and Filter Section */}
//       <Box sx={{
//         mb: 3,
//         display: 'flex',
//         flexDirection: isSmallScreen ? 'column' : 'row',
//         gap: 2
//       }}>
//         <TextField
//           size="small"
//           placeholder="Search items..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           slotProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Search />
//               </InputAdornment>
//             ),
//           }}
//           fullWidth
//         />
//         <Box sx={{
//           display: 'flex',
//           gap: 2,
//           flexDirection: isSmallScreen ? 'row' : 'row',
//           width: isSmallScreen ? '100%' : 'auto'
//         }}>
//           <Button
//             variant="outlined"
//             startIcon={<FilterList />}
//             onClick={handleFilterClick}
//             fullWidth={isSmallScreen}
//           >
//             Filter
//           </Button>

//           <Button
//             variant="outlined"
//             startIcon={<Download />}
//             onClick={handleExport}
//             fullWidth={isSmallScreen}
//           >
//             Export
//           </Button>
//         </Box>
//       </Box>
//       {/* Filter Menu/Drawer for mobile */}
//       {isMobileScreen ? (
//         <Drawer
//           anchor="right"
//           open={isFilterDrawerOpen}
//           onClose={() => setIsFilterDrawerOpen(false)}
//         >
//           <Box sx={{ width: 250, p: 2 }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//               <Typography variant="h6">Filters</Typography>
//               <IconButton onClick={() => setIsFilterDrawerOpen(false)}>
//                 <Close />
//               </IconButton>
//             </Box>
//             <FormControl fullWidth size="small">
//               <InputLabel>Category</InputLabel>
//               <Select
//                 value={categoryFilter}
//                 label="Category"
//                 onChange={(e) => setCategoryFilter(e.target.value)}
//               >
//                 <MenuItem value="all">All Categories</MenuItem>
//                 <MenuItem value="pickles">Pickles</MenuItem>
//                 <MenuItem value="honey">Honey</MenuItem>
//                 <MenuItem value="seasonings">Seasonings</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>
//         </Drawer>
//       ) : (
//         <Menu
//           anchorEl={filterAnchorEl}
//           open={Boolean(filterAnchorEl)}
//           onClose={() => setFilterAnchorEl(null)}
//         >
//           <MenuItem>
//             <FormControl fullWidth size="small">
//               <InputLabel>Category</InputLabel>
//               <Select
//                 value={categoryFilter}
//                 label="Category"
//                 onChange={(e) => setCategoryFilter(e.target.value)}
//               >
//                 <MenuItem value="all">All Categories</MenuItem>
//                 <MenuItem value="pickles">Pickles</MenuItem>
//                 <MenuItem value="honey">Honey</MenuItem>
//                 <MenuItem value="seasonings">Seasonings</MenuItem>
//               </Select>
//             </FormControl>
//           </MenuItem>
//         </Menu>
//       )}

//       <Card>
//         {isLoading ? (
//           <Box sx={{ p: 3, textAlign: 'center' }}>
//             <Typography>Loading items...</Typography>
//           </Box>
//         ) : error ? (
//           <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
//         ) : (
//           <>
//             {isMobileScreen ? (

//               // Mobile view - cards
//               <Box sx={{ p: 2 }}>
//                 {paginatedItems.length === 0 && (
//                   <Typography variant="h6" color="textSecondary" textAlign={'center'} pt={4} fontWeight="bold">
//                     No items found
//                   </Typography>
//                 )}
//                 {/* {paginatedItems.map((item) => (
//                   <MobileItemCard
//                     key={item.id}
//                     item={item}
//                     onActionClick={handleActionClick}
//                     actions={actions}
//                     actionAnchorEl={actionAnchorEl}
//                     setActionAnchorEl={setActionAnchorEl}
//                     selectedItem={selectedItem}
//                   />
//                 ))} */}
//                 {paginatedItems.map((item) => (
//                   <MobileCard
//                     key={item.id}
//                     item={item}
//                     onActionClick={handleActionClick}
//                     actions={actions || []}
//                     actionAnchorEl={actionAnchorEl}
//                     setActionAnchorEl={setActionAnchorEl}
//                     selectedItem={selectedItem}
//                     displayFields={columns}
//                   />
//                 ))}
//               </Box>
//             ) : (
//               <TableContainer component={Paper}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       {columns.map((column) => (
//                         <TableCell key={column.key}>{column.label}</TableCell>
//                       ))}
//                       {actions && <TableCell>Actions</TableCell>}
//                     </TableRow>
//                   </TableHead>
//                   {paginatedItems.length === 0 && (
//                     <TableRow>
//                       <TableCell colSpan={columns.length + 1} align="center">
//                         <Typography variant="h6" color="textSecondary" fontWeight="bold">
//                           No items found
//                         </Typography>
//                       </TableCell>
//                     </TableRow>
//                   )}
//                   <TableBody>
//                     {paginatedItems.map((row, index) => (
//                       <TableRow key={index}>
//                         {columns.map((column) => (
//                           // in below code i am checking the value is stock in hand then we will check if it's below min stock and show the warning message accordingly and if it's not stock in hand then we simply show the value
//                           <TableCell key={column.key}>
//                             {
//                               column.key === 'stockInHand' ?
//                                 (row[column.key] < row['minStock'] ?
//                                   (<Grid2 item xs={6}>
//                                     {row[column.key]} <Chip
//                                       label={'low stock'}
//                                       color={getStatusColor('low stock')}
//                                       size="small"
//                                     />
//                                   </Grid2>)
//                                   :
//                                   (row[column.key])
//                                 )
//                                 :
//                                 column.key === 'condition' ?
//                                   // Add your custom logic for 'type' column
//                                   (<Grid2 item xs={6} color={'red'}>
//                                     <Chip
//                                       label={row[column.key]}
//                                       color={getItemTypeColor(row[column.key])}
//                                       size="small"
//                                     />
//                                   </Grid2>)
//                                   :
//                                   // (column.key==='createdAt' ? new Date(row[column.key]).toLocaleDateString(): row[column.key] || "-")
//                                   row[column.key] || "-"
//                             }
//                           </TableCell>
//                         ))}

//                         <TableCell align="center">
//                           <IconButton onClick={(e) => handleActionClick(e, row)}>
//                             <MoreVert />
//                           </IconButton>
//                         </TableCell>
//                         {actions && (
//                           <Menu
//                             anchorEl={actionAnchorEl}
//                             open={Boolean(actionAnchorEl)}
//                             onClose={() => setActionAnchorEl(null)}
//                           >
//                             {actions.map((action, idx) => (

//                               <MenuItem key={action.label} onClick={() => {
//                                 action.onClick(selectedItem);
//                                 setActionAnchorEl(null);
//                               }}>
//                                 {action.icon} {action.label}
//                               </MenuItem>

//                               // <IconButton key={idx} onClick={() => action.onClick(row)}>
//                               //   {action.icon}
//                               // </IconButton>
//                             ))}
//                           </Menu>
//                         )}
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>

//             )}

//             {/* Pagination Section */}
//             <Pagination
//               count={filteredItems.length}
//               page={page}
//               rowsPerPage={rowsPerPage}
//               onPageChange={setPage}
//               onRowsPerPageChange={setRowsPerPage}
//               isSmallScreen={isSmallScreen}
//             />

//           </>
//         )}
//       </Card>


//     </>
//   );
// };

// export default ReusableTable;



// components/TableHeader.jsx
import React from 'react';
import { Box, Typography, Button } from '../MUI';
import { AddIcon, CancelIcon, CheckCircleOutlineIcon } from '../../assets/icons/icon.js';




export const TableHeader = React.memo(({
  title,
  onAddNew,
  isSmallScreen
}) => (
  <Box sx={{
    // mb: 3,
    display: 'flex',
    flexDirection: isSmallScreen ? 'column' : 'row',
    gap: 2,
    justifyContent: 'space-between',
    alignItems: isSmallScreen ? 'stretch' : 'center'
  }}>
    <Typography variant="h4" component="h1">
      {title}
    </Typography>
    <AddButton title='Request New Leave' handleClick={onAddNew} />
    {/* <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      fullWidth={isSmallScreen}
      onClick={onAddNew}
    >
      Add New Item
    </Button> */}
  </Box>
));

// components/TableToolbar.jsx
// import React from 'react';
import {
  // Box,
  TextField,
  // Button,
  InputAdornment
} from '../MUI';
import { FilterList, Download, Search } from '@mui/icons-material';

export const TableToolbar = React.memo(({
  searchTerm,
  onSearchChange,
  onFilterClick,
  onExport,
  isSmallScreen
}) => (
  <Box sx={{
    mb: 3,
    display: 'flex',
    flexDirection: isSmallScreen ? 'column' : 'row',
    gap: 2
  }}>
    <TextField
      size="small"
      placeholder="Search items..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      slotProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      fullWidth
    />
    <Box sx={{
      display: 'flex',
      gap: 2,
      flexDirection: 'row',
      width: isSmallScreen ? '100%' : 'auto'
    }}>
      {/* <Button
        variant="outlined"
        startIcon={<FilterList />}
        onClick={onFilterClick}
        fullWidth={isSmallScreen}
      >
        Filter
      </Button> */}


      {/* <Button
        variant="outlined"
        startIcon={<Download />}
        onClick={onExport}
        fullWidth={isSmallScreen}
      >
        Export
      </Button> */}
    </Box>
  </Box>
));

// components/FilterDrawer.jsx
// import React from 'react';
import {
  Drawer,
  // Box, 
  // Typography, 
  // IconButton,
  FormControl,
  InputLabel,
  Select,
  // MenuItem 
} from '@mui/material';
import { Close } from '@mui/icons-material';


export const FilterDrawer = React.memo(({
  open,
  onClose,
  categoryFilter,
  onCategoryChange,
  categories = ['pickles', 'honey', 'seasonings']
}) => (
  <Drawer anchor="right" open={open} onClose={onClose}>
    <Box sx={{ width: 250, p: 2 }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2
      }}>
        <Typography variant="h6">Filters</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <FormControl fullWidth size="small">
        <InputLabel>Category</InputLabel>
        <Select
          value={categoryFilter}
          label="Category"
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <MenuItem value="all">All Categories</MenuItem>
          {categories.map(category => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  </Drawer>
));

// ReusableTable.jsx
import { useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Card,
  // Box,
  // Typography,
  Alert,
  useMediaQuery,
  Chip,
  Grid2
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import MobileCard from "./MobileCard.jsx";
import Pagination from './Pagination.jsx';
import { getColor } from '../../helper/getDynamicColor';
import { useTableState } from '../../custom-hooks/useTableState.js';
import { formatDate, getNestedValue } from '../../helper/commonUtils.js';
import AddButton from '../Buttons/AddButton.jsx';
import FilterData from './FilterData.jsx';
import PageTitle from './PageTitle.jsx'

const ReusableTable = React.memo(({
  pageTitle,
  btnTitle = '',
  columns,
  rows = [],
  actions = [],
  handleAddingNewItem,
  onExport,


  filterFields,
  handleApplyFilters,
  filters,
  showFilterBar,
  title = "",
  loading
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    filterAnchorEl,
    setFilterAnchorEl,
    isFilterDrawerOpen,
    setIsFilterDrawerOpen,
    actionAnchorEl,
    setActionAnchorEl,
    selectedItem,
    setSelectedItem,
    filteredItems,
    paginatedItems
  } = useTableState(rows);
  console.log('paginatedItemswwwwwwwwwwwwwwwwwwwwwwwwwwww', paginatedItems)

  const handleActionClick = useCallback((e, row) => {
    setActionAnchorEl(e.currentTarget);
    setSelectedItem(row);
  }, []);

  const handleFilterClick = useCallback((event) => {
    if (isMobileScreen) {
      setIsFilterDrawerOpen(true);
    } else {
      setFilterAnchorEl(event.currentTarget);
    }
  }, [isMobileScreen]);

  const renderCellContent = useCallback((column, row) => {
    // console.log('render cell content', column, row);

    if (column.key === 'stockInHand' && row[column.key] < row['minStock']) {
      return (
        <Grid2 xs={6}>
          {row[column.key]}
          <Chip
            label='low stock'
            color={getColor('low stock')}
            size="small"
          />
        </Grid2>
      );
    }


    if (column.key === 'condition') {
      return (
        <Grid2 xs={6} color='red'>
          <Chip
            label={row[column.key]}
            color={getColor(row[column.key])}
            size="small"
          />
        </Grid2>
      );
    }
    if (column.key === 'status') {
      return (
        <Grid2 xs={6} color='red'>
          <Chip
            label={row[column.key]}
            color={getColor(row[column.key])}
            size="small"
          />
        </Grid2>
      );
    }
    if (column.key === 'isApproved') {
      return (
        <Grid2  xs={6}>
          {row[column.key] ?  row['status'] === 'Present' ? (
            <CheckCircleOutlineIcon color="success" />
          ) :'__' : (
            <CancelIcon color="error" />
          )}
        </Grid2>
      );
    }
    if (column.key === 'status') {
      return (
        <Grid2 xs={6} color='red'>
          <Chip
            label={row[column.key]}
            color={getColor(row[column.key])}
            size="small"
          />
        </Grid2>
      );
    }

    if (column.key === 'date') {
      return formatDate(row[column.key])
    }
    if (column.key === 'createdAt' || column.key === 'resolvedAt') {
      return formatDate(row[column.key],'datetime')
    }


    if (column.key === 'logInTime') {
      // below code is for showing the last log in time of the employee
      const value = row.sessions.length !== 0 && (row.sessions[row.sessions.length - 1][column.key]);
      return formatDate(value, 'time');
      // return row.sessions.length !== 0 && (row.sessions[row.sessions.length - 1][column.key]) || '-'
    }

    // console.log('column.key',column.key)

    // Determine if column.key is for a nested value (contains a dot)
    const isNested = column.key.includes('.');

    // Access nested value if needed, otherwise access directly
    const value = isNested ? getNestedValue(row, column.key) : row[column.key];

    return value !== undefined ? value : "__";
  }, []);

  const handleExport = useCallback(() => {
    if (onExport) {
      onExport(paginatedItems);
      return;
    }

    // Default export logic
    const csv = paginatedItems
      .map(item => Object.values(item).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }, [paginatedItems, onExport]);

  return (
    <>
      <Box sx={{
        mb: 2,
        display: 'flex',
        flexDirection: isSmallScreen ? 'column' : 'row',
        gap: 2,
        // bgcolor:'red',
        justifyContent: 'space-between',
        alignItems: isSmallScreen ? 'stretch' : 'center'
      }}>

        <PageTitle title={pageTitle} />
        {btnTitle && (
          <AddButton title={btnTitle} handleClick={handleAddingNewItem} />
        )}
      </Box>

      <TableToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onFilterClick={handleFilterClick}
        onExport={handleExport}
        isSmallScreen={isSmallScreen}
      />
      {pageTitle === "Attendance Logs" && (
        <FilterData
          fields={filterFields}
          onApplyFilters={handleApplyFilters}
          initialFilters={filters}
          showFilterBar={showFilterBar}
          title={title}
          loading={loading}
        />

      )}


      <FilterDrawer
        open={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
      />

      <Card>
        {isMobileScreen ? (
          <Box sx={{ p: 2 }}>
            {paginatedItems.length === 0 ? (
              <Typography
                variant="h6"
                color="textSecondary"
                textAlign="center"
                pt={4}
                fontWeight="bold"
              >
                No data found
              </Typography>
            ) : (
              paginatedItems.map((item) => (
                <MobileCard
                  key={item._id || item.id}
                  item={item}
                  onActionClick={handleActionClick}
                  actions={actions}
                  actionAnchorEl={actionAnchorEl}
                  setActionAnchorEl={setActionAnchorEl}
                  selectedItem={selectedItem}
                  displayFields={columns}
                />
              ))
            )}
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.key}>{column.label}</TableCell>
                  ))}
                  {actions.length > 0 && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1} align="center">
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        fontWeight="bold"
                      >
                        No Data found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedItems.map((row) => (
                    <TableRow key={row._id || row.id}>
                      {columns.map((column) => (
                        <TableCell key={column.key}>
                          {renderCellContent(column, row)}
                        </TableCell>
                      ))}
                      {actions.length > 0 && (
                        <TableCell align="center">
                          <IconButton onClick={(e) => handleActionClick(e, row)}>
                            <MoreVert />
                          </IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Pagination
          count={filteredItems?.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
          isSmallScreen={isSmallScreen}
        />
      </Card>

      <Menu
        anchorEl={actionAnchorEl}
        open={Boolean(actionAnchorEl)}
        onClose={() => setActionAnchorEl(null)}
      >
        {actions.map((action) => (
          <MenuItem
            key={action.label}
            onClick={() => {
              action.onClick(selectedItem);
              setActionAnchorEl(null);
            }}
          >
            {action.icon} {action.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
});

export default ReusableTable;