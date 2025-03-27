// import React, { useState, useEffect } from 'react';
// // import Grid from '@mui/material/Grid2';
// import {
//   Box,
// } from '@mui/material';
// import {
//   Edit,
//   Delete,
//   Visibility,
//   Description as DescriptionIcon
// } from '@mui/icons-material';
// import ItemFormDialog from '../../../components/modules/IMS/ItemFormDialog.jsx';
// import ItemDetailsModal from '../../../components/modules/IMS/ItemDetailsModal.jsx';
// import ReusableTable from '../../../components/common/ReusableTable.jsx';
// import { useDispatch, useSelector } from 'react-redux';
// import { createNewEntry, deleteEntry, getAllEntries, updateEntry } from '../../../features/ims/itemAPI.js';
import { toast } from 'react-toastify';
// import AlertBox from '../../../components/common/AlertBox.jsx';


// // Main ItemList Component
// const ItemPurchasePage = () => {


//   // State management
//   const dispatch = useDispatch()
//   const { purchaseList } = useSelector(state => state.item);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

//   const columns = [
//     { key: "name", label: "Name" },
//     { key: "invoiceNo", label: "Invoice Number" },
//     { key: "totalAmount", label: "Amount" },
//     { key: "quantity", label: "Quantity" },
//     { key: "unit", label: "unit" },
//     { key: "clientVendor", label: "Client/Vendor" },
//     { key: "biltyNumber", label: "Bilty Number" },
//     { key: "createdAt", label: "Date" },
//   ];

//   // const rows = [
//   //   {
//   //     id: 1,
//   //     name: 'Pickle Jar',
//   //     invoiceNo: 'INV-2024-001',
//   //     amount: 5000,
//   //     quantity: 100,
//   //     unit: 'kg',
//   //     clientVendor: 'Grocery Mart',
//   //     biltyNumber: 'BLT-2024-001',
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Honey Jar',
//   //     invoiceNo: 'INV-2024-002',
//   //     amount: 5000,
//   //     quantity: 100,
//   //     unit: 'jars',
//   //     clientVendor: 'Grocery Mart',
//   //     biltyNumber: 'BLT-2024-001',
//   //   },

//   //   // Add more mock transactions
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

//   const handleDeleteClick = (row) => {
//     // setActionAnchorEl(null);
//     setDeleteDialogOpen(true);
//     setSelectedItem(row)

//   };

//   const handleEditing = (row) => {
//     // setActionAnchorEl(null);
//     // setSnackbar({ open: true, message: 'Edit functionality coming soon', severity: 'info' });
//     setEditingItem(row);
//     setIsFormDialogOpen(true);
//   }

//   const actions = [
//     {
//       label: 'View Details',
//       icon: <Visibility sx={{ mr: 1 }} />,
//       // onClick: (row) => alert(`Edit ${row.name}`),
//       onClick: (row) => handleViewDetails(row),
//     },
//     {
//       label: 'View Docs',
//       icon: <DescriptionIcon sx={{ mr: 1 }} />,
//       // onClick: (row) => alert(`Edit ${row.name}`),
//       onClick: (row) => console.log(row),
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
//   //     // let updatedData = { ...values };
//   //     if (editingItem.quantity !== values.quantity) {
//   //       values.set('increase',values.quantity > editingItem.quantity)
//   //       values.set('decrease',values.quantity < editingItem.quantity)
//   //     }
//   //     dispatch(updateEntry({ id: editingItem._id, formData:values, type:'purchaseEntry'}))
//   //       .then(result => {
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
//   //         console.log('errorr', error)
//   //         // Handle any unexpected errors
//   //         toast.error('An error occurred');
//   //         setSubmitting();
//   //       });
//   //   } else {
//   //     dispatch(createNewEntry({ formData: values, type: 'purchase' }))
//   //       .then(result => {
//   //         if (result.error?.message === 'Rejected') {
//   //           toast.error(result.payload.message)
//   //         } else {
//   //           setIsFormDialogOpen(false);
//   //           toast.success(result.payload.message)
//   //         }
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


//   // handle deleting an item from the list
  
//   const handleFormSubmission = (values, setSubmitting) => {
//     const isEdit = !!editingItem;
//     const action = isEdit ? updateEntry : createNewEntry;
//     const payload = isEdit
//       ? {
//           id: editingItem._id,
//           formData: values,
//           type: 'purchaseEntry',
//         }
//       : { formData: values, type: 'purchase' };
  
//     if (isEdit && editingItem.quantity !== values.quantity) {
//       values.set('increase', values.quantity > editingItem.quantity);
//       values.set('decrease', values.quantity < editingItem.quantity);
//     }
  
//     dispatch(action(payload))
//       .then(result => {
//         const message = result.payload?.message || 'Action completed successfully';
//         const isRejected = result.error?.message === 'Rejected';
  
//         if (isRejected) {
//           toast.info(message);
//         } else {
//           setIsFormDialogOpen(false);
//           toast.success(message);
//         }
  
//         setSubmitting();
//       })
//       .catch(error => {
//         console.log('error', error);
//         toast.error('An error occurred');
//         setSubmitting();
//       });
//   };
  
  
  
//   const handleDelete = () => {
//     if (selectedItem) {
//       const id = selectedItem._id;
//       dispatch(deleteEntry({ id, type: 'purchaseEntry' }))
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
//     dispatch(getAllEntries('purchases'))
//   }, [])

//   return (
//     <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
//       {/* Content Section */}
//       <ReusableTable
//         pageTitle="Purchase"
//         columns={columns}
//         rows={purchaseList || []}
//         actions={actions}
//         handleAddingNewItem={handleAddingNewItem}
//       />

//       {/* Delete Confirmation Dialog */}
//       <AlertBox
//         item={selectedItem}
//         deleteDialogOpen={deleteDialogOpen}
//         setDeleteDialogOpen={setDeleteDialogOpen}
//         handleDelete={handleDelete}
//       />
//       {/* Details Model */}
//       <ItemDetailsModal
//         open={isDetailsModalOpen}
//         onClose={() => setIsDetailsModalOpen(false)}
//         item={selectedItem}
//         section="Sale&Purchase"
//       />

//       {/* Form Dialog */}
//       <ItemFormDialog
//       title='Purchase Entry'
//         open={isFormDialogOpen}
//         onClose={() => {
//           setIsFormDialogOpen(false);
//           setEditingItem({});
//         }}
//         formType="Sale&Purchase"
//         onSubmit={handleFormSubmission}
//         initialValues={editingItem ? editingItem : {}}
//       />
//     </Box>
//   );
// };

// export default ItemPurchasePage;



// pages/ItemPurchasePage.jsx
import React, { useEffect, useState } from 'react';
import { Box } from '../../../components/MUI';
import { EditIcon, DeleteIcon, VisibilityIcon,  DocumentIcon } from '../../../assets/icons/icon.js';
import { useDispatch, useSelector } from 'react-redux';
import { createNewEntry, deleteEntry, getAllEntries, updateEntry } from '../../../features/ims/itemAPI.js';

import ItemDetailsModal from '../../../components/modules/IMS/ItemDetailsModal.jsx';
import ReusableTable from '../../../components/common/ReusableTable.jsx';
import AlertBox from '../../../components/common/AlertBox.jsx';
import { useTableActions } from '../../../custom-hooks/useTableActions.js';
import FormDialog from '../../../components/common/FormDialog.jsx';



const COLUMNS = [
  { key: "name", label: "Name" },
  { key: "invoiceNo", label: "Invoice Number" },
  { key: "totalAmount", label: "Amount" },
  { key: "quantity", label: "Quantity" },
  { key: "unit", label: "unit" },
  { key: "clientVendor", label: "Client/Vendor" },
  { key: "biltyNumber", label: "Bilty Number" },
  { key: "createdAt", label: "Date" },
];

const ItemPurchasePage = () => {
  const dispatch = useDispatch();
  const { purchaseList } = useSelector(state => state.item);
  
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
    handleDelete
  } = useTableActions({ type: 'purchaseEntry' });

  const actions = [
    {
      label: 'View Details',
      icon: <VisibilityIcon sx={{ mr: 1 }} />,
      onClick: handleViewDetails,
    },
    {
      label: 'View Docs',
      icon: <DocumentIcon sx={{ mr: 1 }} />,
      onClick: (row) => console.log(row),
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
    dispatch(getAllEntries('purchases'));
  }, [dispatch]);

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <ReusableTable
        pageTitle="Purchase"
        columns={COLUMNS}
        rows={purchaseList || []}
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
        section="Sale&Purchase"
      />

      <FormDialog
        title='Purchase Entry'
        open={isFormDialogOpen}
        onClose={() => {
          setIsFormDialogOpen(false);
          setEditingItem({});
        }}
        formType="Sale&Purchase"
        onSubmit={handleFormSubmission}
        initialValues={editingItem || {}}
      />
    </Box>
  );
};

export default ItemPurchasePage;