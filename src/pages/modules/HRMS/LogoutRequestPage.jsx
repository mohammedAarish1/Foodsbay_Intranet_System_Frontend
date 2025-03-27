import { useDispatch, useSelector } from 'react-redux';
import ReusableTable from '../../../components/common/ReusableTable';
import { Box } from '../../../components/MUI';
import React, { useEffect } from 'react'
import { getLeaveList, getLogoutRequests, updateLeaveStatus } from '../../../features/hrms/hrmsAPI';
import { DeleteIcon, EditIcon, TimelineIcon, VisibilityIcon } from '../../../assets/icons/icon';
import { useTableActions } from '../../../custom-hooks/useTableActions';
import ViewMessageModal from '../../../components/common/ViewMessageModal';
import UpdateStatusModal from '../../../components/common/modals/UpdateStatusModal';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import EmployeeSessions from '../../../components/modules/HRMS/EmployeeSessions';

const COLUMNS = [
  { key: "employeeName", label: "Name" },
  { key: "department", label: "Department" },
  { key: "date", label: "Date" },
  { key: "status", label: "Status" },
];

const LogoutRequestPage = () => {

  const dispatch = useDispatch()
  const { logoutRequestList } = useSelector(state => state.hrms.data)
  console.log('logoutRequestList', logoutRequestList)


  const {
    selectedItem,
    isMessageModalOpen,
    setMessageModalOpen,
    handleViewMessageModal,
    isUpdateStatusModalOpen,
    setUpdateStatusModalOpen,
    handleViewUpdateStatusModal,
    isEmpSessionModalOpen,
    setEmpSessionModalOpen,
    handleViewEmpSessionModal
  } = useTableActions({ type: 'leaveRequest', actions: { add: () => { }, edit: () => { } } });


  const handleStatusUpdate = ({ status, comment }) => {
    dispatch(updateLeaveStatus({ leaveId: selectedItem._id, payload: { status, comment } }))
      .then(result => {
        console.log('resul update', result)
      })
  }

  const actions = [
    {
      label: 'View Sessions',
      icon: <VisibilityIcon sx={{ mr: 1 }} />,
      onClick: handleViewEmpSessionModal,
    },
    {
      label: 'Update Status',
      icon: <AutorenewIcon sx={{ mr: 1, color: '' }} />,
      onClick: handleViewUpdateStatusModal,
    },
  ];




  useEffect(() => {
    dispatch(getLogoutRequests())
  }, [dispatch])

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <ReusableTable
        pageTitle="Logout Requests"
        columns={COLUMNS}
        rows={logoutRequestList}
        actions={actions}
      // handleAddingNewItem={handleAddingNewItem}
      />


      <EmployeeSessions
        open={isEmpSessionModalOpen}
        curData={selectedItem ? selectedItem : {}}
        onUpdateLogoutTime={() => { }}
        onClose={() => setEmpSessionModalOpen(false)}
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

export default LogoutRequestPage;
