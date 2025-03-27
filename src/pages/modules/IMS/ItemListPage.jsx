// import React, { useState, useEffect } from 'react';
// // import Grid from '@mui/material/Grid2';
// import {
//   Box,
// } from '@mui/material';
// import {
//   Edit,
//   Delete,
//   Visibility,
//   Timeline
// } from '@mui/icons-material';
// import ItemFormDialog from '../../../components/modules/IMS/ItemFormDialog.jsx';
// import ItemDetailsModal from '../../../components/modules/IMS/ItemDetailsModal.jsx';
// // import CustomSearch from '../../../components/common/Search.jsx';
// import ReusableTable from '../../../components/common/ReusableTable.jsx';
// import { useDispatch, useSelector } from 'react-redux';
// import { createNewEntry, deleteEntry, getAllEntries, updateEntry } from '../../../features/ims/itemAPI.js';
// import { toast } from 'react-toastify';
// import AlertBox from '../../../components/common/AlertBox.jsx';
// import ItemDetailsPopup from '../../../components/modules/IMS/ItemHistory.jsx';
// import ItemHistory from '../../../components/modules/IMS/ItemHistory.jsx';
// // import TimelineIcon from '@mui/icons-material/Timeline';
// // Main ItemList Component
// const ItemListPage = () => {

//   const dispatch = useDispatch()
//   const { itemList } = useSelector(state => state.item)
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
//   const [isItemHistoryOpen, setItemHistoryOpen] = useState(false)


//   const columns = [
//     { key: "name", label: "Name" },
//     { key: "category", label: "Category" },
//     { key: "inventoryType", label: "Inventory Type" },
//     { key: "stockInHand", label: "Stock In Hand" },
//     { key: "unit", label: "Unit" },
//     // { key: "minStock", label: "Minimum Stock" },
//     { key: "status", label: "Status" },
//   ];

//   // const rows = [
//   //   {
//   //     id: 1,
//   //     name: 'Chilly Flakes ',
//   //     category: 'Herb, Seasoning & Spices',
//   //     inventoryType: 'Raw Material',
//   //     stockInHand: '500',
//   //     unit: 'jars',
//   //     minStock: 100,
//   //     status: 'In Stock',
//   //     lastUpdated: '2024-03-15',
//   //     vendorName: 'Spice Master Pvt Ltd',
//   //     hsnCode: '09109920',
//   //     hsnDesc: 'Dried Chilly Flakes',
//   //     gstRate: 18
//   //   },

//   //   {
//   //     id: 2,
//   //     name: 'Seasonings',
//   //     category: 'Herb, Seasoning & Spices',
//   //     inventoryType: 'Raw Material',
//   //     stockInHand: '500',
//   //     unit: 'jars',
//   //     minStock: 100,
//   //     status: 'In Stock',
//   //     lastUpdated: '2024-03-15',
//   //     vendorName: 'Spice Master Pvt Ltd',
//   //     hsnCode: '09109920',
//   //     hsnDesc: 'Dried Chilly Flakes',
//   //     gstRate: 18
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Seasonings',
//   //     category: 'Herb, Seasoning & Spices',
//   //     inventoryType: 'Raw Material',
//   //     stockInHand: '500',
//   //     unit: 'jars',
//   //     minStock: 100,
//   //     status: 'In Stock',
//   //     lastUpdated: '2024-03-15',
//   //     vendorName: 'Spice Master Pvt Ltd',
//   //     hsnCode: '09109920',
//   //     hsnDesc: 'Dried Chilly Flakes',
//   //     gstRate: 18
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Seasonings',
//   //     category: 'Herb, Seasoning & Spices',
//   //     inventoryType: 'Raw Material',
//   //     stockInHand: '500',
//   //     unit: 'jars',
//   //     minStock: 100,
//   //     status: 'In Stock',
//   //     lastUpdated: '2024-03-15',
//   //     vendorName: 'Spice Master Pvt Ltd',
//   //     hsnCode: '09109920',
//   //     hsnDesc: 'Dried Chilly Flakes',
//   //     gstRate: 18
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Seasonings',
//   //     category: 'Herb, Seasoning & Spices',
//   //     inventoryType: 'Raw Material',
//   //     stockInHand: '500',
//   //     unit: 'jars',
//   //     minStock: 100,
//   //     status: 'In Stock',
//   //     lastUpdated: '2024-03-15',
//   //     vendorName: 'Spice Master Pvt Ltd',
//   //     hsnCode: '09109920',
//   //     hsnDesc: 'Dried Chilly Flakes',
//   //     gstRate: 18
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Seasonings',
//   //     category: 'Herb, Seasoning & Spices',
//   //     inventoryType: 'Raw Material',
//   //     stockInHand: '500',
//   //     unit: 'jars',
//   //     minStock: 100,
//   //     status: 'In Stock',
//   //     lastUpdated: '2024-03-15',
//   //     vendorName: 'Spice Master Pvt Ltd',
//   //     hsnCode: '09109920',
//   //     hsnDesc: 'Dried Chilly Flakes',
//   //     gstRate: 18
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Seasonings',
//   //     category: 'Herb, Seasoning & Spices',
//   //     inventoryType: 'Raw Material',
//   //     stockInHand: '500',
//   //     unit: 'jars',
//   //     minStock: 100,
//   //     status: 'In Stock',
//   //     lastUpdated: '2024-03-15',
//   //     vendorName: 'Spice Master Pvt Ltd',
//   //     hsnCode: '09109920',
//   //     hsnDesc: 'Dried Chilly Flakes',
//   //     gstRate: 18
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Seasonings',
//   //     category: 'Herb, Seasoning & Spices',
//   //     inventoryType: 'Raw Material',
//   //     stockInHand: '500',
//   //     unit: 'jars',
//   //     minStock: 100,
//   //     status: 'In Stock',
//   //     lastUpdated: '2024-03-15',
//   //     vendorName: 'Spice Master Pvt Ltd',
//   //     hsnCode: '09109920',
//   //     hsnDesc: 'Dried Chilly Flakes',
//   //     gstRate: 18
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Seasonings',
//   //     category: 'Herb, Seasoning & Spices',
//   //     inventoryType: 'Raw Material',
//   //     stockInHand: '500',
//   //     unit: 'jars',
//   //     minStock: 100,
//   //     status: 'In Stock',
//   //     lastUpdated: '2024-03-15',
//   //     vendorName: 'Spice Master Pvt Ltd',
//   //     hsnCode: '09109920',
//   //     hsnDesc: 'Dried Chilly Flakes',
//   //     gstRate: 18
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Seasonings',
//   //     category: 'Herb, Seasoning & Spices',
//   //     inventoryType: 'Raw Material',
//   //     stockInHand: '500',
//   //     unit: 'jars',
//   //     minStock: 100,
//   //     status: 'In Stock',
//   //     lastUpdated: '2024-03-15',
//   //     vendorName: 'Spice Master Pvt Ltd',
//   //     hsnCode: '09109920',
//   //     hsnDesc: 'Dried Chilly Flakes',
//   //     gstRate: 18
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Seasonings',
//   //     category: 'Herb, Seasoning & Spices',
//   //     inventoryType: 'Raw Material',
//   //     stockInHand: '500',
//   //     unit: 'jars',
//   //     minStock: 100,
//   //     status: 'In Stock',
//   //     lastUpdated: '2024-03-15',
//   //     vendorName: 'Spice Master Pvt Ltd',
//   //     hsnCode: '09109920',
//   //     hsnDesc: 'Dried Chilly Flakes',
//   //     gstRate: 18
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Seasonings',
//   //     category: 'Herb, Seasoning & Spices',
//   //     inventoryType: 'Raw Material',
//   //     stockInHand: '500',
//   //     unit: 'jars',
//   //     minStock: 100,
//   //     status: 'In Stock',
//   //     lastUpdated: '2024-03-15',
//   //     vendorName: 'Spice Master Pvt Ltd',
//   //     hsnCode: '09109920',
//   //     hsnDesc: 'Dried Chilly Flakes',
//   //     gstRate: 18
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Seasonings',
//   //     category: 'Herb, Seasoning & Spices',
//   //     inventoryType: 'Raw Material',
//   //     stockInHand: '500',
//   //     unit: 'jars',
//   //     minStock: 100,
//   //     status: 'In Stock',
//   //     lastUpdated: '2024-03-15',
//   //     vendorName: 'Spice Master Pvt Ltd',
//   //     hsnCode: '09109920',
//   //     hsnDesc: 'Dried Chilly Flakes',
//   //     gstRate: 18
//   //   },


//   //   // Add more items as needed
//   // ];

//   const handleAddingNewItem = () => {
//     setIsFormDialogOpen(true);
//     setEditingItem(null)
//     setSelectedItem(null)
//   }

//   const handleViewDetails = (row) => {
//     console.log('test', row)
//     setSelectedItem(row)
//     // setActionAnchorEl(null);
//     setIsDetailsModalOpen(true);
//   }
//   const handleViewHistory = (row) => {
//     console.log('history', row)
//     setSelectedItem(row)
//     setItemHistoryOpen(true);
//   }

//   const handleDeleteClick = (row) => {
//     // setActionAnchorEl(null);
//     setDeleteDialogOpen(true);
//     setSelectedItem(row)

//   };

//   const handleEditing = (row) => {
//     console.log('rowwwwww', row)
//     // setActionAnchorEl(null);
//     // setSnackbar({ open: true, message: 'Edit functionality coming soon', severity: 'info' });
//     setEditingItem(row);
//     setIsFormDialogOpen(true);
//   }
//   const actions = [
//     {
//       label: 'More Details',
//       icon: <Visibility sx={{ mr: 1 }} />,
//       // onClick: (row) => alert(`Edit ${row.name}`),
//       onClick: (row) => handleViewDetails(row),
//     },
//     {
//       label: 'View History',
//       icon: <Timeline sx={{ mr: 1 }} />,
//       onClick: (row) => handleViewHistory(row),
//     },
//     {
//       label: 'Edit',
//       icon: <Edit sx={{ mr: 1 }} />,
//       onClick: (row) => handleEditing(row),
//     },
//     {
//       label: 'Delete',
//       icon: <Delete sx={{ mr: 1, color: 'error.main' }} />,
//       onClick: (row) => handleDeleteClick(row),
//     },
//   ];


//   // const handleFormSubmission = (values, setSubmitting) => {
//   //   if (editingItem) {
//   //     dispatch(updateEntry({ id: editingItem._id, formData: values, type: 'itemEntry' }))
//   //       .then(result => {
//   //         console.log('result update', result)
//   //         if (result.error?.message === 'Rejected') {
//   //           setIsFormDialogOpen(false);
//   //           toast.info(result.payload.message)
//   //         } else {
//   //           setIsFormDialogOpen(false);
//   //           toast.success(result.payload.message)
//   //         }
//   //         setSubmitting();
//   //       })
//   //       .catch(error => {
//   //         console.log('err', error)
//   //         // Handle any unexpected errors
//   //         toast.error('An error occurred');
//   //         setSubmitting();
//   //       });
//   //   } else {
//   //     console.log('values', values)
//   //     dispatch(createNewEntry({ formData: values, type: 'newItem' }))
//   //       .then(result => {
//   //         console.log('result add', result)
//   //         if (result.error?.message === 'Rejected') {
//   //           toast.error(result.payload.message)
//   //         } else {
//   //           setIsFormDialogOpen(false);
//   //           toast.success(result.payload.message)
//   //         }
//   //         // toast.error(result)
//   //         // Call the callback to reset submitting state
//   //         setSubmitting();
//   //       })
//   //       .catch(error => {
//   //         // Handle any unexpected errors
//   //         toast.error('An error occurred');
//   //         setSubmitting();
//   //       })


//   //   }
//   // };


//   // Event handlers
//   // const handleFilterClick = (event) => {
//   //   if (isMobileScreen) {
//   //     setIsFilterDrawerOpen(true);
//   //   } else {
//   //     setFilterAnchorEl(event.currentTarget);
//   //   }
//   // };

//   // const handleActionClick = (event, item) => {
//   //   // console.log('check',event.currentTarget)
//   //   console.log('check', item)
//   //   setActionAnchorEl(event.currentTarget);
//   //   setSelectedItem(item);
//   // };


//   // handle deleting an item from the list


//   const handleFormSubmission = (values, setSubmitting) => {
//     const isEdit = !!editingItem;
//     const action = isEdit ? updateEntry : createNewEntry;
//     const payload = isEdit ? { id: editingItem._id, formData: values, type: 'itemEntry' } : { formData: values, type: 'newItem' };

//     dispatch(action(payload))
//       .then(result => {
//         const message = result.payload?.message || 'Action completed successfully';
//         const isRejected = result.error?.message === 'Rejected';

//         if (isRejected) {
//           toast.error(message);
//         } else {
//           setIsFormDialogOpen(false);
//           toast.success(message);
//         }

//         setSubmitting();
//       })
//       .catch(error => {
//         console.log('err', error);
//         toast.error('An error occurred');
//         setSubmitting();
//       });
//   };


//   const handleDelete = () => {
//     if (selectedItem) {
//       const id = selectedItem._id;
//       dispatch(deleteEntry({ id, type: 'itemEntry' }))
//         .then(result => {
//           if (result.payload.success) {
//             toast.info(result.payload.message)
//           } else {
//             toast.error('Something went wrong !')
//           }
//         })
//     }
//     setDeleteDialogOpen(false);
//     setSelectedItem(null);
//   };

//   useEffect(() => {
//     dispatch(getAllEntries('items'))
//   }, [])

//   return (
//     <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
//       <ReusableTable
//         pageTitle="Inventory"
//         columns={columns}
//         rows={itemList}
//         actions={actions}
//         handleAddingNewItem={handleAddingNewItem}
//       />
//       {/* <Dialog
//         open={deleteDialogOpen}
//         onClose={() => setDeleteDialogOpen(false)}
//         maxWidth="xs"
//         fullWidth
//       >
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Are you sure you want to delete "{selectedItem?.name}"? This action cannot be undone.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
//           <Button onClick={handleDelete} color="error" variant="contained">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog> */}
//       <AlertBox
//         item={selectedItem}
//         deleteDialogOpen={deleteDialogOpen}
//         setDeleteDialogOpen={setDeleteDialogOpen}
//         handleDelete={handleDelete}
//       />

//       {/* Snackbar for notifications */}
//       {/* <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           severity={snackbar.severity}
//           sx={{ width: '100%' }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar> */}

//       <ItemDetailsModal
//         open={isDetailsModalOpen}
//         onClose={() => setIsDetailsModalOpen(false)}
//         item={selectedItem}
//         section="Item List"
//       />
//       <ItemHistory
//         open={isItemHistoryOpen}
//         handleClose={() => setItemHistoryOpen(false)}
//         itemId={selectedItem?._id}
//       />

//       <ItemFormDialog
//         open={isFormDialogOpen}
//         onClose={() => {
//           setIsFormDialogOpen(false);
//           setEditingItem({});
//         }}
//         formType="Item List"
//         onSubmit={handleFormSubmission}
//         // initialValues={editingItem ? editingItem : {}}
//         initialValues={editingItem }
//       />
//     </Box>
//   );
// };

// export default ItemListPage;




// shared/hooks/useTableActions.js
import React, { useEffect,useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
// import { createNewEntry, updateEntry, deleteEntry } from '../features/ims/itemAPI';
import { createNewEntry, deleteEntry, getAllEntries, updateEntry } from '../../../features/ims/itemAPI.js';
import ItemDetailsModal from '../../../components/modules/IMS/ItemDetailsModal.jsx';
import AlertBox from '../../../components/common/AlertBox.jsx';
import ItemHistory from '../../../components/modules/IMS/ItemHistory.jsx';

import { Box } from '../../../components/MUI';
import { EditIcon, DeleteIcon, VisibilityIcon, TimelineIcon } from '../../../assets/icons/icon.js';
import {  useSelector } from 'react-redux';
import ReusableTable from '../../../components/common/ReusableTable.jsx';
import { useTableActions } from '../../../custom-hooks/useTableActions.js';
import FormDialog from '../../../components/common/FormDialog.jsx';


const COLUMNS = [
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  { key: "inventoryType", label: "Inventory Type" },
  { key: "stockInHand", label: "Stock In Hand" },
  { key: "unit", label: "Unit" },
  { key: "status", label: "Status" },
];

const ItemListPage = () => {
  const dispatch = useDispatch();
  const { itemList } = useSelector(state => state.item);
  // const [isItemHistoryOpen, setItemHistoryOpen] = useState(false);
  
  const {
    selectedItem,
    deleteDialogOpen,
    isFormDialogOpen,
    editingItem,
    isDetailsModalOpen,
    setDeleteDialogOpen,
    setIsDetailsModalOpen,
    setIsFormDialogOpen,
    setEditingItem,
    handleAddingNewItem,
    handleViewDetails,
    handleDeleteClick,
    handleEditing,
    handleFormSubmission,
    handleDelete,
    isItemHistoryOpen,
    handleViewHistory
  } = useTableActions({ type: 'itemEntry',actions:{add:createNewEntry,edit:updateEntry} });

  const actions = [
    {
      label: 'More Details',
      icon: <VisibilityIcon sx={{ mr: 1 }} />,
      onClick: handleViewDetails,
    },
    {
      label: 'View History',
      icon: <TimelineIcon sx={{ mr: 1 }} />,
      onClick: handleViewHistory,
    },
    {
      label: 'Edit',
      icon: <EditIcon sx={{ mr: 1 }} />,
      onClick: handleEditing,
    },
    {
      label: 'Delete',
      icon: <DeleteIcon sx={{ mr: 1, color: 'error.main' }} />,
      onClick: handleDeleteClick,
    },
  ];

  useEffect(() => {
    dispatch(getAllEntries('items'));
  }, [dispatch]);

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <ReusableTable
        pageTitle="Inventory"
        columns={COLUMNS}
        rows={itemList}
        actions={actions}
        handleAddingNewItem={handleAddingNewItem}
      />
      
      <AlertBox
        item={selectedItem}
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        handleDelete={handleDelete}
      />

      <ItemDetailsModal
        open={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        item={selectedItem}
        section="Item List"
      />

      <ItemHistory
        open={isItemHistoryOpen}
        handleClose={() => setItemHistoryOpen(false)}
        itemId={selectedItem?._id}
      />

      <FormDialog
        open={isFormDialogOpen}
        onClose={() => {
          setIsFormDialogOpen(false);
          setEditingItem({});
        }}
        formType="Item List"
        onSubmit={handleFormSubmission}
        initialValues={editingItem}
      /> 
    </Box>
  );
};

export default ItemListPage;
