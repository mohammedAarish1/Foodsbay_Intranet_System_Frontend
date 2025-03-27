import { useDispatch, useSelector } from 'react-redux';
import ReusableTable from '../../../components/common/ReusableTable';
import { Box } from '../../../components/MUI';
import React, { useEffect } from 'react'
import { addHoliday, deleteHoliday, getHolidayList, getLeaveList, updateLeaveStatus } from '../../../features/hrms/hrmsAPI';
import { DeleteIcon, EditIcon, TimelineIcon, VisibilityIcon } from '../../../assets/icons/icon';
import { useTableActions } from '../../../custom-hooks/useTableActions';
import ViewMessageModal from '../../../components/common/ViewMessageModal';
import UpdateStatusModal from '../../../components/common/modals/UpdateStatusModal';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AlertBox from '../../../components/common/AlertBox.jsx';
import FormDialog from '../../../components/common/FormDialog';

const COLUMNS = [
  { key: "name", label: "Name" },
  { key: "date", label: "Date" },
  { key: "type", label: "Type" },
  { key: "status", label: "Status" },
];

const HolidayPage = () => {

  const dispatch = useDispatch()
  const { holidayList } = useSelector(state => state.hrms.data)
  console.log('holidayList', holidayList)


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
    handleViewHistory,
    isMessageModalOpen,
    setMessageModalOpen,
    handleViewMessageModal,
    isUpdateStatusModalOpen,
    setUpdateStatusModalOpen,
    handleViewUpdateStatusModal,
  } = useTableActions({ type: 'Holiday', actions: { add: addHoliday, edit: () => { },delete:deleteHoliday } });


  const handleStatusUpdate = ({ status, comment }) => {
    dispatch(updateLeaveStatus({ leaveId: selectedItem._id, payload: { status, comment } }))
      .then(result => {
        console.log('resul update', result)
      })
  }

  const actions = [
    // {
    //   label: 'Edit',
    //   icon: <EditIcon sx={{ mr: 1 }} />,
    //   onClick: handleEditing,
    // },
    {
      label: 'Delete',
      icon: <DeleteIcon sx={{ mr: 1, color: 'error.main' }} />,
      onClick: handleDeleteClick,
    },
  ];




  useEffect(() => {
    dispatch(getHolidayList())
  }, [])

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <ReusableTable
        pageTitle="Holidays"
        btnTitle="Add Holiday"
        columns={COLUMNS}
        rows={holidayList}
        actions={actions}
        handleAddingNewItem={handleAddingNewItem}
      />

      <ViewMessageModal
        open={isMessageModalOpen}
        onClose={() => {
          setMessageModalOpen(false)
        }}
        message={selectedItem?.reason || ''}
      />


      <UpdateStatusModal
        open={isUpdateStatusModalOpen}
        onClose={() => {
          setUpdateStatusModalOpen(false)
        }}
        currentStatus={'status'}
        onUpdate={handleStatusUpdate}
      />

      <AlertBox
        item={selectedItem}
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        handleDelete={handleDelete}
      />

      {/* <ItemDetailsModal
        open={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        item={selectedItem}
        section="Employees List"
      /> */}


      <FormDialog
        open={isFormDialogOpen}
        onClose={() => {
          setIsFormDialogOpen(false);
          setEditingItem({});
        }}
        formType="Holiday"
        onSubmit={handleFormSubmission}
        initialValues={editingItem}
      />
    </Box>
  )
}

export default HolidayPage;
