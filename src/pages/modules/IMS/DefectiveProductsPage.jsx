import React, { useState, useEffect } from 'react';
// import Grid from '@mui/material/Grid2';
import {Box} from '../../../components/MUI';
import {
  DeleteIcon,
} from '../../../assets/icons/icon.js';
import ItemDetailsModal from '../../../components/modules/IMS/ItemDetailsModal.jsx';
import ReusableTable from '../../../components/common/ReusableTable.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { createNewEntry, deleteEntry, getAllEntries, updateEntry } from '../../../features/ims/itemAPI.js';
import { toast } from 'react-toastify';
import AlertBox from '../../../components/common/AlertBox.jsx';
import FormDialog from '../../../components/common/FormDialog.jsx';


// Main ItemList Component
const DefectiveProductsPage = () => {

  // State management
  const dispatch = useDispatch()
  const { defectiveProductsList } = useSelector(state => state.item);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

console.log('defectiveProductsList',defectiveProductsList)

  const columns = [
    { key: "name", label: "Name" },
    { key: "amount", label: "Amount" },
    { key: "quantity", label: "Quantity" },
    { key: "unit", label: "unit" },
    { key: "condition", label: "Type" },
    { key: "createdAt", label: "Date" },
  ];

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

  const handleAddingNewItem = () => {
    setIsFormDialogOpen(true);
    setEditingItem(null)
    setSelectedItem(null)
  }

  const handleViewDetails = (row) => {
    console.log('test', row)
    setSelectedItem(row)
    // setActionAnchorEl(null);
    setIsDetailsModalOpen(true);
  }

  const handleDeleteClick = (row) => {
    // setActionAnchorEl(null);
    setDeleteDialogOpen(true);
    setSelectedItem(row)

  };

  const handleEditing = (row) => {
    // setActionAnchorEl(null);
    // setSnackbar({ open: true, message: 'Edit functionality coming soon', severity: 'info' });
    setEditingItem(row);
    setIsFormDialogOpen(true);
  }

  const actions = [
    // {
    //   label: 'View Details',
    //   icon: <Visibility sx={{ mr: 1 }} />,
    //   // onClick: (row) => alert(`Edit ${row.name}`),
    //   onClick: (row) => handleViewDetails(row),
    // },
    // {
    //   label: 'View Docs',
    //   icon: <DescriptionIcon sx={{ mr: 1 }} />,
    //   // onClick: (row) => alert(`Edit ${row.name}`),
    //   onClick: (row) => console.log(row),
    // },
    // {
    //   label: 'Edit',
    //   icon: <Edit sx={{ mr: 1 }} />,
    //   onClick: (row) => handleEditing(row),
    // },
    {
      label: 'Delete',
      icon: <DeleteIcon sx={{ mr: 1, color: 'error.main' }} />,
      onClick: (row) => handleDeleteClick(row),
    },
  ];


  // handle deleting an item from the list
  const handleFormSubmission = (values, setSubmitting) => {
    const isEdit = !!editingItem;
    const action = isEdit ? updateEntry : createNewEntry;
    const payload = isEdit
      ? {
          id: editingItem._id,
          formData: values,
          type: 'purchaseEntry',
        }
      : { formData: values, type: 'purchase' };
  
    if (isEdit && editingItem.quantity !== values.quantity) {
      values.set('increase', values.quantity > editingItem.quantity);
      values.set('decrease', values.quantity < editingItem.quantity);
    }
  
    dispatch(action(payload))
      .then(result => {
        const message = result.payload?.message || 'Action completed successfully';
        const isRejected = result.error?.message === 'Rejected';
  
        if (isRejected) {
          toast.info(message);
        } else {
          setIsFormDialogOpen(false);
          toast.success(message);
        }
  
        setSubmitting();
      })
      .catch(error => {
        console.log('error', error);
        toast.error('An error occurred');
        setSubmitting();
      });
  };
  
  
  
  const handleDelete = () => {
    if (selectedItem) {
      const id = selectedItem._id;
      dispatch(deleteEntry({ id, type: 'defectiveProductEntry' }))
        .then(result => {
          if (result.payload.success) {
            toast.info(result.payload.message)
          } else {
            toast.error('Something went wrong !')
          }
        })
        .catch(error=>{
          console.log('eer', error)
        })
    }
    setDeleteDialogOpen(false);
    setSelectedItem(null);
  };
  useEffect(() => {
    dispatch(getAllEntries('defectiveProducts'))
  }, [])

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      {/* Content Section */}
      <ReusableTable
        pageTitle="Defective Products"
        columns={columns}
        rows={defectiveProductsList || []}
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


export default DefectiveProductsPage;
