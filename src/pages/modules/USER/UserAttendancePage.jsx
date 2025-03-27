import { useDispatch, useSelector } from 'react-redux';
import ReusableTable from '../../../components/common/ReusableTable';
import { Box } from '../../../components/MUI';
import React, { useEffect } from 'react'
import { getAttendanceList, getLeaveList, updateEmpLogOutTime, updateLeaveStatus } from '../../../features/hrms/hrmsAPI';
import { DeleteIcon, EditIcon, TimelineIcon, VisibilityIcon } from '../../../assets/icons/icon';
import { useTableActions } from '../../../custom-hooks/useTableActions';
import ViewMessageModal from '../../../components/common/ViewMessageModal';
import UpdateStatusModal from '../../../components/common/modals/UpdateStatusModal';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import EmployeeSessions from '../../../components/modules/HRMS/EmployeeSessions';
import { getSingleUserAttendance, requestAttendanceAdding } from '../../../features/user/userAPI';
import FormDialog from '../../../components/common/FormDialog.jsx';

const COLUMNS = [
  { key: "employeeId", label: "Employee ID" },
  { key: "date", label: "Date" },
  { key: "status", label: "Status" },
  { key: "logInTime", label: "Last Logged In" },
  { key: "isApproved", label: "Approved" },
  // { key: "logOutTime", label: "Logged Out" },
  // { key: "workingHours", label: "Working Hours" },
];

const UserAttendancePage = () => {

  const dispatch = useDispatch()
  const { attendanceList } = useSelector(state => state.user)
  console.log('attendanceListwa', attendanceList)


  const {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    filterAnchorEl,
    setFilterAnchorEl,
    isFilterDrawerOpen,
    setIsFilterDrawerOpen,
    actionAnchorEl,
    setActionAnchorEl,
    setSelectedItem,
    filteredItems,
    paginatedItems,
    selectedItem,
    isFormDialogOpen,
    setIsFormDialogOpen,
    setEditingItem,
    editingItem,
    isMessageModalOpen,
    setMessageModalOpen,
    handleViewMessageModal,
    isUpdateStatusModalOpen,
    setUpdateStatusModalOpen,
    handleViewUpdateStatusModal,
    isEmpSessionModalOpen,
    setEmpSessionModalOpen,
    handleViewEmpSessionModal,
    handleFormSubmission,
    handleAddingNewItem,
  } = useTableActions({ type: 'attendanceRequest', actions: { add: requestAttendanceAdding, edit: () => { } } });

  console.log('selectedItemmmm', selectedItem)


  const actions = [
    {
      label: 'View Sessions',
      icon: <VisibilityIcon sx={{ mr: 1, color: 'gray' }} />,
      onClick: handleViewEmpSessionModal,
    },
    // {
    //   label: 'Update Status',
    //   icon: <AutorenewIcon sx={{ mr: 1, color: '' }} />,
    //   onClick: handleViewUpdateStatusModal,
    // },
  ];

  // const onUpdateLogoutTime=(sessionId,updatedLogoutTime)=>{
  //    const payload = { sessionId, updatedLogoutTime,date:selectedItem?.date }
  //       dispatch(updateEmpLogOutTime({ attendanceId: selectedItem?._id, payload }))
  //         .then(result => {
  //           console.log('result', result)
  //           if(result.payload.success){
  //             // setIsEditing(null);
  //             toast.success(result.payload.message)
  //           }
  //         })
  // }


  useEffect(() => {
    dispatch(getSingleUserAttendance("EMP-08"))
  }, [dispatch])

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <ReusableTable
        pageTitle="Attendance History"
        btnTitle="Request a Attendance"
        columns={COLUMNS}
        rows={attendanceList}
        actions={actions}
        handleAddingNewItem={handleAddingNewItem}
      />

      <EmployeeSessions
        open={isEmpSessionModalOpen}
        curData={selectedItem ? selectedItem : {}}
        onUpdateLogoutTime={() => { }}
        onClose={() => setEmpSessionModalOpen(false)}
        isUser={true}
      />


      {/* <ViewMessageModal
        open={isMessageModalOpen}
        onClose={() => {
          setMessageModalOpen(false)
        }}
        message={selectedItem?.reason || ''}
      /> */}


      {/* <UpdateStatusModal
        open={isUpdateStatusModalOpen}
        onClose={() => {
          setUpdateStatusModalOpen(false)
        }}
        currentStatus={'status'}
        onUpdate={handleStatusUpdate}
      /> */}

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


      <FormDialog
        open={isFormDialogOpen}
        onClose={() => {
          setIsFormDialogOpen(false);
          setEditingItem({});
        }}
        formType="Attendance Request"
        onSubmit={handleFormSubmission}
        initialValues={editingItem}
      />
    </Box>
  )
}

export default UserAttendancePage;
