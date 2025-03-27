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
  styled,
  CardContent,
} from '../../../components/MUI';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, deleteLeaveRequest, getSingleUserLeaves } from '../../../features/user/userAPI';
import ReusableTable from '../../../components/common/ReusableTable';
import { DeleteIcon, EditIcon, EventAvailableIcon, EventBusyIcon, PolicyIcon, VisibilityIcon } from '../../../assets/icons/icon';
import ItemFormDialog from '../../../components/common/FormDialog';
import { useTableActions } from '../../../custom-hooks/useTableActions';
import AlertBox from '../../../components/common/AlertBox';
import ViewMessageModal from '../../../components/common/ViewMessageModal';
import FormDialog from '../../../components/common/FormDialog';
import PageTitle from '../../../components/common/PageTitle';
import StatsCard from '../../../components/common/StatsCard';



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
  { key: "leaveType", label: "Leave Type" },
  { key: "startDate", label: "Start Date" },
  { key: "endDate", label: "End date" },
  { key: "totalDays", label: "Total Days" },
  { key: "status", label: "Status" },
];


// const StatsCard = memo(({ icon: Icon, title, value, gradient = 'primary', delay = 500 }) => {
//   const theme = useTheme();
//   const gradientColors = {
//     primary: {
//       dark: `linear-gradient(45deg, ${alpha(theme.palette.primary.dark, 0.8)}, ${alpha(theme.palette.primary.main, 0.6)})`,
//       light: `linear-gradient(45deg, ${alpha(theme.palette.primary.light, 0.8)}, ${alpha(theme.palette.primary.main, 0.2)})`
//     },
//     secondary: {
//       dark: `linear-gradient(45deg, ${alpha(theme.palette.secondary.dark, 0.8)}, ${alpha(theme.palette.secondary.main, 0.6)})`,
//       light: `linear-gradient(45deg, ${alpha(theme.palette.secondary.light, 0.8)}, ${alpha(theme.palette.secondary.main, 0.2)})`
//     }
//   };

//   return (
//     <Grow in timeout={delay}>
//       <Card
//         sx={{
//           p: 3,
//           background: theme.palette.mode === 'dark' ? gradientColors[gradient].dark : gradientColors[gradient].light,
//           borderRadius: 2,
//           boxShadow: theme.shadows[8],
//           transition: 'transform 0.3s ease-in-out',
//           '&:hover': {
//             transform: 'translateY(-5px)',
//           }
//         }}
//       >
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//           <Icon sx={{ fontSize: 40, mr: 2, color: theme.palette[gradient].main }} />
//           <Typography variant="h6">{title}</Typography>
//         </Box>
//         <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
//           {value}
//         </Typography>
//       </Card>
//     </Grow>
//   );
// });


const SectionTitle = memo(({ icon: Icon, children }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
      <Icon sx={{ fontSize: 30, mr: 2, color: theme.palette.primary.main }} />
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        {children}
      </Typography>
    </Box>
  );
});



const FormikCheckbox = memo(({ field, form: { touched, errors }, label }) => {
  const theme = useTheme();
  const errorMessage = touched[field.name] && errors[field.name];

  return (
    <Box>
      <FormControlLabel
        control={
          <Checkbox
            {...field}
            checked={field.value}
            sx={{
              color: theme.palette.primary.main,
              '&.Mui-checked': {
                color: theme.palette.primary.main,
              },
            }}
          />
        }
        label={
          <Typography sx={{ color: theme.palette.text.secondary }}>
            {label}
          </Typography>
        }
      />
      {errorMessage && (
        <Typography
          color="error"
          variant="caption"
          display="block"
          sx={{ mt: 1 }}
        >
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
});


// Main component
const UserLeavesPage = () => {
  const dispatch = useDispatch();
  const { leaveList } = useSelector(state => state.user)
  const { user } = useSelector(state => state.auth)

  // const [curLeaveRequest, setCurLeaveRequest] = useState(null)
  const [showSnackbar, setShowSnackbar] = useState(false);
  const theme = useTheme();
  console.log('user', user)

  const statsData = [
    {
      icon: <EventAvailableIcon fontSize="large" />,
      title: 'Total Leaves',
      value: user?.leaves.total || 0,
      desc: ``,
      bgColor: [theme.palette.secondary.dark, theme.palette.primary.dark]
    },
    {
      icon: <EventBusyIcon fontSize="large" />,
      title: 'Leaves Taken',
      value: user?.leaves.total - user?.leaves.balance || 0,
      desc: ``,
      bgColor: [theme.palette.warning.dark, theme.palette.primary.dark]
    },
    {
      icon: <EventBusyIcon fontSize="large" />,
      title: 'Balance Leaves',
      value: user?.leaves.balance || 0,
      desc: ``,
      bgColor: [theme.palette.success.dark, theme.palette.primary.dark]
    },
  ]


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
  } = useTableActions({ type: 'leaveRequest', actions: { add: addRequest, edit: () => { }, delete: deleteLeaveRequest } });



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
      label: 'View Comments',
      icon: <VisibilityIcon sx={{ mr: 1 }} />,
      onClick: handleViewMessageModal,
    },
    // {
    //   label: 'View Docs',
    //   icon: <DocumentIcon sx={{ mr: 1 }} />,
    //   // onClick: (row) => alert(`Edit ${row.name}`),
    //   // onClick: (row) => console.log(row),
    // },
    {
      label: 'Edit',
      icon: <EditIcon sx={{ mr: 1 }} />,
      onClick: (row) => handleEditing(row),
    },
    {
      label: 'Delete',
      icon: <DeleteIcon sx={{ mr: 1, color: 'error.main' }} />,
      onClick: (row) => handleDeleteClick(row),
    },
  ];

  const leavePolicies = [
    "Leaves must be applied at least 3 days in advance",
    "Maximum consecutive leaves allowed: 5 days",
    "Sick leaves require medical documentation for more than 2 days",
    "Unused leaves can be carried forward up to 5 days"
  ];



  useEffect(() => {
    dispatch(getSingleUserLeaves("EMP001"));
  }, [dispatch]);

  return (
    <Box
      //  p={3} 
      sx={{ minHeight: '100vh' }}
    >
      {/* <PageTitle title="Leave Management" /> */}

      <Grid container spacing={3} sx={{ mt: 2, mb: 4, }}>
        {statsData.map((stats, index) => (
          <StatsCard stats={stats} key={index} size={{ xs: 12, sm: 6, md: 4 }} />
          // card component 

        ))}
      </Grid>

      <ReusableTable
        pageTitle="Leave History"
        btnTitle='Request a Leave'
        columns={COLUMNS}
        rows={leaveList}
        actions={actions}

        handleAddingNewItem={handleAddingNewItem}
      />
      <ViewMessageModal
        open={isMessageModalOpen}
        onClose={() => {
          setMessageModalOpen(false)
        }}
        message={selectedItem?.comment || ''}
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
          <SectionTitle icon={PolicyIcon}>Leave Policies</SectionTitle>
          <Box component="ul" sx={{ pl: 2 }}>
            {leavePolicies.map((policy, index) => (
              <Typography
                component="li"
                key={index}
                sx={{
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  '&::before': {
                    content: '""',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: theme.palette.primary.main,
                    mr: 2,
                    display: 'inline-block'
                  }
                }}
              >
                {policy}
              </Typography>
            ))}
          </Box>
        </Paper>
      </Fade>
      {/* ========= form here ========= */}

      <FormDialog
        open={isFormDialogOpen}
        onClose={() => {
          setIsFormDialogOpen(false);
          setEditingItem({});
        }}
        formType="leaveRequest"
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

export default UserLeavesPage;