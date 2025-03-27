import React, { useState, useEffect } from 'react';
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
import {   getAllEntries } from '../../../features/ims/itemAPI.js';
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
  { key: "debitNoteNo", label: "Debit Note No." },
  { key: "createdAt", label: "Date" },
];

// Main ItemList Component
const ItemPurchaseReturnPage = () => {

  const dispatch = useDispatch()
  const { purchaseReturnList } = useSelector(state => state.item);
    console.log('purchaseReturnList',purchaseReturnList)
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
    } = useTableActions({ type: 'purchaseReturnEntry' });
  


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
    dispatch(getAllEntries('purchase-return'))
  }, [])

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      {/* Content Section */}
      <ReusableTable
        pageTitle="Purchase Return"
        columns={COLUMNS}
        rows={purchaseReturnList || []}
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
        section="Purchase Return"
      />

      {/* Form Dialog */}
      <FormDialog
      title='Purchase Return'
        open={isFormDialogOpen}
        onClose={() => {
          setIsFormDialogOpen(false);
          setEditingItem({});
        }}
        formType="Purchase Return"
        onSubmit={handleFormSubmission}
        initialValues={editingItem ? editingItem : {}}
      />
    </Box>
  );
};


export default ItemPurchaseReturnPage;
