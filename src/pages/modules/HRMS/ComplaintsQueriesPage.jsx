import React, { useState, memo, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import {
  Box,
  Card,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Alert,
  Snackbar,
  Paper,
  useTheme,
  alpha,
  Fade,
  Grow,
} from '../../../components/MUI';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, addTicket, deleteLeaveRequest, getSingleUserLeaves } from '../../../features/user/userAPI';
import ReusableTable from '../../../components/common/ReusableTable';
import { DeleteIcon, EditIcon, EventAvailableIcon, EventBusyIcon, PolicyIcon, VisibilityIcon } from '../../../assets/icons/icon';
import ItemFormDialog from '../../../components/common/FormDialog';
import { useTableActions } from '../../../custom-hooks/useTableActions';
import AlertBox from '../../../components/common/AlertBox';
import ViewMessageModal from '../../../components/common/ViewMessageModal';
import FormDialog from '../../../components/common/FormDialog';
import PageTitle from '../../../components/common/PageTitle';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import UpdateStatusModal from '../../../components/common/modals/UpdateStatusModal';
import { getTicketList, updateTicketStatus } from '../../../features/hrms/hrmsAPI';



const COLUMNS = [
  { key: "employeeName", label: "Name" },
  { key: "department", label: "Department" },
  { key: "createdAt", label: "Submitted On" },
  { key: "priority", label: "Priority" },
  { key: "type", label: "Type" },
  { key: "status", label: "Status" },
  { key: "resolvedAt", label: "Resolve On" },
];



// Main component
const ComplaintsQueriesPage = () => {
  const dispatch = useDispatch();
  const { ticketList } = useSelector(state => state.hrms.data)
  // const [curLeaveRequest, setCurLeaveRequest] = useState(null)
  const [showSnackbar, setShowSnackbar] = useState(false);
  const theme = useTheme();
  console.log('ticketList', ticketList)

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
    isMessageModalOpen,
    setMessageModalOpen,
    handleViewMessageModal,
    isUpdateStatusModalOpen,
    setUpdateStatusModalOpen,
    handleViewUpdateStatusModal
  } = useTableActions({ type: '', actions: { add: addTicket, edit: () => { }, delete: deleteLeaveRequest } });

  const handleStatusUpdate = ({ status, comment }) => {
    dispatch(updateTicketStatus({ ticketId: selectedItem._id, payload: { status, comment } }))
      .then(result => {
        console.log('resul update', result)
      })
  }

  // Mock data
  const employeeData = {
    name: "John Doe",
    id: "EMP14",
    department: "Production",
    totalLeaves: 24,
    balanceLeaves: 15
  };

  const actions = [
    {
      label: 'View Message',
      icon: <VisibilityIcon sx={{ mr: 1 }} />,
      onClick: handleViewMessageModal,
    },
    {
      label: 'Update Status',
      icon: <AutorenewIcon sx={{ mr: 1 }} />,
      onClick: handleViewUpdateStatusModal,
    },
    // {
    //   label: 'View Docs',
    //   icon: <DocumentIcon sx={{ mr: 1 }} />,
    //   // onClick: (row) => alert(`Edit ${row.name}`),
    //   // onClick: (row) => console.log(row),
    // },

  ];




  useEffect(() => {
    dispatch(getTicketList("EMP-08"));
  }, [dispatch]);

  return (
    <Box
      //  p={3} 
      sx={{ minHeight: '100vh' }}
    >

      <ReusableTable
        pageTitle="Complaints and Queries"
        btnTitle=''
        columns={COLUMNS}
        rows={ticketList}
        actions={actions}

        handleAddingNewItem={handleAddingNewItem}
      />
      <ViewMessageModal
      title='Message:'
        open={isMessageModalOpen}
        onClose={() => {
          setMessageModalOpen(false)
        }}
        message={selectedItem?.description || ''}
      />

      <UpdateStatusModal
        type='Complaints and Queries'
        open={isUpdateStatusModalOpen}
        onClose={() => {
          setUpdateStatusModalOpen(false)
        }}
        currentStatus={selectedItem ? selectedItem.status : 'pending'}
        onUpdate={handleStatusUpdate}
      />
      <AlertBox
        item={selectedItem}
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        handleDelete={handleDelete}
      />
      {/* ======== Leave Policies ======== */}
      {/* <Fade in timeout={1000}>
        <Paper
          sx={{
            p: 4,
            mb: 4,
            mt: 4,
            borderRadius: 2,
            background: theme.palette.mode === 'dark'
              ? alpha(theme.palette.background.paper, 0.6)
              : theme.palette.background.paper,
            boxShadow: theme.shadows[4],
          }}
        >
        </Paper>
      </Fade> */}
      {/* ========= form here ========= */}

      <FormDialog
        open={isFormDialogOpen}
        onClose={() => {
          setIsFormDialogOpen(false);
          setEditingItem({});
        }}
        formType="Complaints and Queries"
        onSubmit={handleFormSubmission}
        initialValues={editingItem}
      />

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionComponent={Grow}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{
            width: '100%',
            boxShadow: theme.shadows[3],
          }}
        >
          Leave request submitted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};




export default ComplaintsQueriesPage
