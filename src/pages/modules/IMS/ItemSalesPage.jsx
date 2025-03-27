import React, { useState, useEffect } from 'react';
// import Grid from '@mui/material/Grid2';
import { Box } from '../../../components/MUI';
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
  { key: "biltyNumber", label: "Bilty Number" },
  { key: "createdAt", label: "Date" },
];

// Main ItemList Component
const ItemSalesPage = () => {
  const dispatch = useDispatch()
  const { salesList } = useSelector(state => state.item);


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
  } = useTableActions({ type: 'salesEntry' });

  // const rows = [
  //   {
  //     id: 1,
  //     name: 'Pickle Jar',
  //     invoiceNo: 'INV-2024-001',
  //     amount: 5000,
  //     quantity: 100,
  //     unit: 'kg',
  //     clientVendor: 'Grocery Mart',
  //     biltyNumber: 'BLT-2024-001',
  //     remarks:'testing'
  //   },
  //   {
  //     id: 2,
  //     name: 'Honey Jar',
  //     invoiceNo: 'INV-2024-002',
  //     amount: 5000,
  //     quantity: 100,
  //     unit: 'jars',
  //     clientVendor: 'Grocery Mart',
  //     biltyNumber: 'BLT-2024-001',
  //     remarks:'testing'
  //   },

  //   // Add more mock transactions
  // ];



  const actions = [
    {
      label: 'View Details',
      icon: <VisibilityIcon sx={{ mr: 1 }} />,
      // onClick: (row) => alert(`Edit ${row.name}`),
      onClick: handleViewDetails,
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
      onClick: handleEditing,
    },
    {
      label: 'Delete',
      icon: <DeleteIcon sx={{ mr: 1, color: 'error.main' }} />,
      onClick: handleDeleteClick,
    },
  ];


  useEffect(() => {
    dispatch(getAllEntries('sales'))
  }, [])

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      {/* Content Section */}
      <ReusableTable
        pageTitle="Sales"
        columns={COLUMNS}
        rows={salesList || []}
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
        section="Sale&Purchase"
      />

      {/* Form Dialog */}
      <FormDialog
        title='Sales Entry'
        open={isFormDialogOpen}
        onClose={() => {
          setIsFormDialogOpen(false);
          setEditingItem({});
        }}
        formType="Sale&Purchase"
        onSubmit={handleFormSubmission}
        initialValues={editingItem ? editingItem : {}}
      />
    </Box>
  );
};

export default ItemSalesPage;


