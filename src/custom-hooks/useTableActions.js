import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { createNewEntry, deleteEntry, updateEntry } from '../features/ims/itemAPI';
import { toast } from 'react-toastify';


export const useTableActions = ({ type, onClose, actions }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isUserCredentialModalOpen, setUserCredentialModalOpen] = useState(false)
  const [isItemHistoryOpen, setItemHistoryOpen] = useState(false);
  const [isMessageModalOpen, setMessageModalOpen] = useState(false);
  const [isUpdateStatusModalOpen,setUpdateStatusModalOpen]=useState(false);

    const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  

  const [isEmpSessionModalOpen,setEmpSessionModalOpen]=useState(false)

  const dispatch = useDispatch();

  const handleAddingNewItem = () => {
    setIsFormDialogOpen(true);
    setEditingItem(null);
    setSelectedItem(null);
  };

  const handleViewDetails = (row) => {
    setSelectedItem(row);
    setIsDetailsModalOpen(true);
  };

  const handleDeleteClick = (row) => {
    setDeleteDialogOpen(true);
    setSelectedItem(row);
  };

  const handleEditing = (row) => {
    setEditingItem(row);
    setIsFormDialogOpen(true);
  };
  const handleViewUserCredentials = (row) => {
    setSelectedItem(row);
    setUserCredentialModalOpen(true);
  };

  const handleViewHistory = (row) => {
    setSelectedItem(row);
    setItemHistoryOpen(true);
  }

  const handleViewMessageModal = (row) => {
    console.log('rowwwwwwwwwwwww',row)
    setSelectedItem(row);
    setMessageModalOpen(true)
  }
  const handleViewUpdateStatusModal = (row) => {
    setSelectedItem(row);
    setUpdateStatusModalOpen(true)
  }
  const handleViewEmpSessionModal = (row) => {
    setSelectedItem(row);
    setEmpSessionModalOpen(true)
  }
// for showing performance review modal
  const handleViewReviewModal=(row)=>{
    setSelectedItem(row);
    setReviewModalOpen(true);
}

  const handleFormSubmission = async (values, setSubmitting) => {
    // console.log('values',values)
    try {
      const isEdit = !!editingItem;
      const action = isEdit ? actions.edit : actions.add;
      let payload = isEdit ? { id: editingItem._id, formData: values, type } : { formData: values, type };

      // Handle quantity changes for purchase entries
      if (type === 'purchaseEntry' && isEdit && editingItem.quantity !== values.quantity) {
        values.set('increase', values.quantity > editingItem.quantity);
        values.set('decrease', values.quantity < editingItem.quantity);
      }

      dispatch(action(payload))
        .then(result => {
          console.log('result', result)
          const message = result.payload?.message || 'Action completed successfully';
          const isRejected = result.error?.message === 'Rejected';
          console.log('resultttttt', result)
          if (isRejected) {
            toast.error(message);
          } else {
            setIsFormDialogOpen(false);
            toast.success(message);
          }
        })

    } catch (error) {
      console.error('Error in form submission:', error);
      toast.error('An error occurred');
    } finally {
      setSubmitting();
    }
  };

  const handleDelete = async () => {
    if (selectedItem) {
      try {
        dispatch(actions.delete({ id: selectedItem._id, type }))
          .then(result => {
            console.log('delete result', result)

            if (result.payload?.success) {
              toast.info(result.payload.message);
            } else {
              toast.error('Something went wrong!');
            }
          })

      } catch (error) {
        console.error('Error deleting item:', error);
        toast.error('Delete operation failed');
      }
    }
    setDeleteDialogOpen(false);
    setSelectedItem(null);
  };

  return {
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
    isUserCredentialModalOpen,
    setUserCredentialModalOpen,
    handleViewUserCredentials,
    isItemHistoryOpen,
    handleViewHistory,
    isMessageModalOpen,
    setMessageModalOpen,
    handleViewMessageModal,
    isUpdateStatusModalOpen,
    setUpdateStatusModalOpen,
    handleViewUpdateStatusModal,
    isEmpSessionModalOpen,
    setEmpSessionModalOpen,
    handleViewEmpSessionModal,
    isReviewModalOpen,
    setReviewModalOpen,
    handleViewReviewModal
  };
};