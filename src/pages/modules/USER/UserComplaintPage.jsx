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
import { addRequest, addTicket, deleteLeaveRequest, getSingleUserLeaves, getTicketList } from '../../../features/user/userAPI';
import ReusableTable from '../../../components/common/ReusableTable';
import { DeleteIcon, EditIcon, EventAvailableIcon, EventBusyIcon, PolicyIcon, VisibilityIcon } from '../../../assets/icons/icon';
import ItemFormDialog from '../../../components/common/FormDialog';
import { useTableActions } from '../../../custom-hooks/useTableActions';
import AlertBox from '../../../components/common/AlertBox';
import ViewMessageModal from '../../../components/common/ViewMessageModal';
import FormDialog from '../../../components/common/FormDialog';
import PageTitle from '../../../components/common/PageTitle';


// const leaveList = [
//   {
//     _id: "1",
//     employeeId: "E001",
//     leaveType: "Sick",
//     startDate: "2025-02-01",
//     endDate: "2025-02-03",
//     totalDays: 3,
//     reason: "Flu symptoms",
//     status: "approved",

//   },
//   {
//     _id: "2",
//     employeeId: "E002",
//     leaveType: "Vacation",
//     startDate: "2025-02-10",
//     endDate: "2025-02-14",
//     totalDays: 5,
//     reason: "Family trip to the mountains",
//     status: "approved",

//   },
//   {
//     _id: "3",
//     employeeId: "E003",
//     leaveType: "Personal",
//     startDate: "2025-02-12",
//     endDate: "2025-02-12",
//     totalDays: 1,
//     reason: "Personal day",
//     status: "rejected",

//   },
//   {
//     _id: "4",
//     employeeId: "E004",
//     leaveType: "Sick",
//     startDate: "2025-01-20",
//     endDate: "2025-01-22",
//     totalDays: 3,
//     reason: "Medical procedure recovery",
//     status: "approved",

//   },
//   {
//     _id: "5",
//     employeeId: "E005",
//     leaveType: "Vacation",
//     startDate: "2025-03-05",
//     endDate: "2025-03-07",
//     totalDays: 3,
//     reason: "Beach vacation",
//     status: "approved",
//   },

// ]

const COLUMNS = [
  { key: "createdAt", label: "Submitted On" },
  { key: "priority", label: "Priority" },
  { key: "type", label: "Type" },
  { key: "status", label: "Status" },
  { key: "resolvedAt", label: "Resolve On" },
];



// Main component
const UserComplaintPage = () => {
  const dispatch = useDispatch();
  const { ticketList } = useSelector(state => state.user)
  // const [curLeaveRequest, setCurLeaveRequest] = useState(null)
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showResponse, setShowResponse] = useState(false)
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
    handleViewMessageModal
  } = useTableActions({ type: '', actions: { add: addTicket, edit: () => { }, delete: deleteLeaveRequest } });


  const handleShowingResponse = (row) => {
    handleViewMessageModal(row)
    setShowResponse(true)
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
      label: 'View Query Message',
      icon: <VisibilityIcon sx={{ mr: 1 }} />,
      onClick: handleViewMessageModal,
    },
    {
      label: 'View Response',
      icon: <VisibilityIcon sx={{ mr: 1 }} />,
      onClick:(row)=> handleShowingResponse(row),
    },
    // {
    //   label: 'View Docs',
    //   icon: <DocumentIcon sx={{ mr: 1 }} />,
    //   // onClick: (row) => alert(`Edit ${row.name}`),
    //   // onClick: (row) => console.log(row),
    // },
    // {
    //   label: 'Edit',
    //   icon: <EditIcon sx={{ mr: 1 }} />,
    //   onClick: (row) => handleEditing(row),
    // },
    {
      label: 'Delete',
      icon: <DeleteIcon sx={{ mr: 1, color: 'error.main' }} />,
      onClick: (row) => handleDeleteClick(row),
    },
  ];

console.log('selectedItem',selectedItem)


  useEffect(() => {
    dispatch(getTicketList("EMP-08"));
  }, [dispatch]);

  return (
    <Box
      //  p={3} 
      sx={{ minHeight: '100vh' }}
    >


      {/* <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <GradientButton
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Request New Leave
        </GradientButton>
      </Box> */}

      {/* <AddButton title='Request New Leave' handleClick={() => setOpenDialog(true)} /> */}

      <ReusableTable
        pageTitle="Complaints and Queries"
        btnTitle='Add New'
        columns={COLUMNS}
        rows={ticketList}
        actions={actions}

        handleAddingNewItem={handleAddingNewItem}
      />
      <ViewMessageModal
        title='Query Message:'
        open={isMessageModalOpen}
        onClose={() => {
          setMessageModalOpen(false)
        }}
        message={showResponse ? selectedItem?.response : selectedItem?.description || ''}
      />
      <AlertBox
        item={selectedItem}
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        handleDelete={handleDelete}
      />
      {/* ======== Leave Policies ======== */}
      <Fade in timeout={1000}>
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
      </Fade>
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


export default UserComplaintPage
