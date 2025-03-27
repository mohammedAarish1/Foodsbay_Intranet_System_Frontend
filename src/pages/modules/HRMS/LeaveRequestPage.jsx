import { useDispatch, useSelector } from 'react-redux';
import ReusableTable from '../../../components/common/ReusableTable';
import { Box } from '../../../components/MUI';
import React, { useEffect } from 'react'
import { getLeaveList, updateLeaveStatus } from '../../../features/hrms/hrmsAPI';
import { DeleteIcon, EditIcon, TimelineIcon, VisibilityIcon } from '../../../assets/icons/icon';
import { useTableActions } from '../../../custom-hooks/useTableActions';
import ViewMessageModal from '../../../components/common/ViewMessageModal';
import UpdateStatusModal from '../../../components/common/modals/UpdateStatusModal';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const COLUMNS = [
  { key: "employeeName", label: "Name" },
  { key: "department", label: "Department" },
  { key: "leaveType", label: "Type" },
  { key: "startDate", label: "From" },
  { key: "endDate", label: "To" },
  { key: "totalDays", label: "Days" },
  { key: "status", label: "Status" },
];

const LeaveRequestPage = () => {

  const dispatch = useDispatch()
  const { leaveList } = useSelector(state => state.hrms.data)
  console.log('leavlist', leaveList)


  const {
    selectedItem,
    isMessageModalOpen,
    setMessageModalOpen,
    handleViewMessageModal,
    isUpdateStatusModalOpen,
    setUpdateStatusModalOpen,
    handleViewUpdateStatusModal
  } = useTableActions({ type: 'leaveRequest', actions: { add: () => { }, edit: () => { } } });


  const handleStatusUpdate = ({ status, comment }) => {
    dispatch(updateLeaveStatus({ leaveId: selectedItem._id, payload: { status, comment } }))
      .then(result => {
        console.log('resul update', result)
      })
  }

  const actions = [
    {
      label: 'View Reason',
      icon: <VisibilityIcon sx={{ mr: 1 }} />,
      onClick: handleViewMessageModal,
    },
    {
      label: 'Update Status',
      icon: <AutorenewIcon sx={{ mr: 1, color: '' }} />,
      onClick: handleViewUpdateStatusModal,
    },
  ];




  useEffect(() => {
    dispatch(getLeaveList())
  }, [dispatch])

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <ReusableTable
        pageTitle="Leave Requests"
        columns={COLUMNS}
        rows={leaveList}
        actions={actions}
      // handleAddingNewItem={handleAddingNewItem}
      />

      <ViewMessageModal
        open={isMessageModalOpen}
        onClose={() => {
          setMessageModalOpen(false)
        }}
        message={selectedItem?.reason || ''}
      />


      <UpdateStatusModal
        type='Leave Status'
        open={isUpdateStatusModalOpen}
        onClose={() => {
          setUpdateStatusModalOpen(false)
        }}
        currentStatus={selectedItem ? selectedItem.status : 'pending'}
        onUpdate={handleStatusUpdate}
      />

      {/* <AlertBox
        item={selectedItem}
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        handleDelete={handleDelete}
      /> */}

      {/* <ItemDetailsModal
        open={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        item={selectedItem}
        section="Employees List"
      /> */}


      {/* <ItemFormDialog
        open={isFormDialogOpen}
        onClose={() => {
          setIsFormDialogOpen(false);
          setEditingItem({});
        }}
        formType="Employees List"
        onSubmit={handleFormSubmission}
        initialValues={editingItem}
      /> */}
    </Box>
  )
}

export default LeaveRequestPage;
