import React, { useState, useEffect } from 'react';
// import Grid from '@mui/material/Grid2';
import {
  Box,
} from '../../../components/MUI';

import {
  EditIcon,
  DeleteIcon,
  VisibilityIcon,
   DocumentIcon
} from '../../../assets/icons/icon.js';
import ItemDetailsModal from '../../../components/modules/IMS/ItemDetailsModal.jsx';
import ReusableTable from '../../../components/common/ReusableTable.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { createNewEntry, deleteEntry, getAllEntries, updateEntry } from '../../../features/ims/itemAPI.js';
import { toast } from 'react-toastify';
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
  { key: "creditNoteNo", label: "Credit Note No." },
  { key: "condition", label: "Type" },
  { key: "createdAt", label: "Date" },
];

// Main ItemList Component
const ItemSalesReturnPage = () => {

  // State management
  const dispatch = useDispatch()
  const { salesReturnList } = useSelector(state => state.item);
 
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
    } = useTableActions({ type: 'salesReturnEntry' });

  // const rows = [
  //   {
  //     id: 1,
  //     name: 'Pickle Jar',
  //     invoiceNo: 'INV-2024-001',
  //     amount: 4000,
  //     quantity: 10,
  //     unit: 'kg',
  //     clientVendor: 'Grocery Mart',
  //     debitNoteNo: 'DBN-2024-001',
  //     condition:'perfect'
  //   },
 
  //   {
  //     id: 2,
  //     name: 'Pickle Jar',
  //     invoiceNo: 'INV-2024-002',
  //     amount: 2000,
  //     quantity: 5,
  //     unit: 'litre',
  //     clientVendor: 'Grocery Mart',
  //     debitNoteNo: 'DBN-2024-002',
  //     condition:'damaged'
  //   },
 
  //   // Add more mock transactions
  // ];



  const actions = [
    {
      label: 'View Details',
      icon: <VisibilityIcon sx={{ mr: 1 }} />,
      // onClick: (row) => alert(`Edit ${row.name}`),
      onClick: (row) => handleViewDetails(row),
    },
    {
      label: 'View Docs',
      icon: <DocumentIcon sx={{ mr: 1 }} />,
      // onClick: (row) => alert(`Edit ${row.name}`),
      onClick: (row) => console.log(row),
    },
    {
      label: 'Edit',
      icon: <EditIcon sx={{ mr: 1 }} />,
      onClick: (row) => handleEditing(row),
    },
    {
      label: 'Delete',
      icon: <DeleteIcon sx={{ mr: 1, color: 'error.main' }} />,
      onClick: (row) => handleDeleteClick(row),
    },
  ];

  
  useEffect(() => {
    dispatch(getAllEntries('sales-return'))
  }, [])

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      {/* Content Section */}
      <ReusableTable
        pageTitle="Sales Return"
        columns={COLUMNS}
        rows={salesReturnList || []}
        actions={actions}
        handleAddingNewItem={handleAddingNewItem}
      />

      {/* Delete Confirmation Dialog */}
      <AlertBox
        item={selectedItem}
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        handleDelete={handleDelete}
      />
      {/* Details Model */}
      <ItemDetailsModal
        open={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        item={selectedItem}
        section="Sales Return"
      />

      {/* Form Dialog */}
      <FormDialog
      title='Sales Return'
        open={isFormDialogOpen}
        onClose={() => {
          setIsFormDialogOpen(false);
          setEditingItem({});
        }}
        formType="Sales Return"
        onSubmit={handleFormSubmission}
        initialValues={editingItem ? editingItem : {}}
      />
    </Box>
  );
};

export default ItemSalesReturnPage;