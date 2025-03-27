import { useDispatch, useSelector } from 'react-redux';
import ReusableTable from '../../../components/common/ReusableTable';
import { Box, Container, Typography } from '../../../components/MUI';
import React, { useEffect, useState } from 'react'
import { getAttendanceList, getLeaveList, updateEmpLogOutTime, updateLeaveStatus, verifyAttendance } from '../../../features/hrms/hrmsAPI';
import { AttachMoneyIcon, DeleteIcon, EditIcon, InventoryIcon, RuleIcon, TimelineIcon, TrendingUpIcon, VisibilityIcon, WarningIcon } from '../../../assets/icons/icon';
import { useTableActions } from '../../../custom-hooks/useTableActions';
import ViewMessageModal from '../../../components/common/ViewMessageModal';
import UpdateStatusModal from '../../../components/common/modals/UpdateStatusModal';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import EmployeeSessions from '../../../components/modules/HRMS/EmployeeSessions';
import FilterData from '../../../components/common/FilterData';
import { attendanceData } from '../../../data.js'
import AttendanceCharts from '../../../components/charts/AttendanceCharts.jsx'
import Grid from '@mui/material/Grid2';
import StatsCard from '../../../components/common/StatsCard.jsx';
import { toast } from 'react-toastify';



const COLUMNS = [
  { key: "employeeId", label: "Employee ID" },
  { key: "date", label: "Date" },
  { key: "status", label: "Status" },
  { key: "logInTime", label: "Last Logged In" },
  { key: "isApproved", label: "Approved" },
  // { key: "logOutTime", label: "Logged Out" },
  // { key: "workingHours", label: "Working Hours" },
];

const AttendanceLogsPage = () => {

  const dispatch = useDispatch()
  const { attendanceList } = useSelector(state => state.hrms.data)
  console.log('attendanceList', attendanceList)


  // const dispatch = useDispatch();
  const { loading } = useSelector(state => state.hrms);
  const [filters, setFilters] = useState({
    employeeId: '',
    status: [],
    dateRange: { start: '', end: '' },
  });
  // const [filters, setFilters] = useState({
  //   search: '',
  //   category: '',
  //   status: [],
  //   dateRange: { start: '', end: '' },
  //   priceRange: { min: 0, max: 1000 },
  //   inStock: false
  // });

  // Define filter fields for inventory items
  // const filterFields = [
  //   {
  //     name: 'search',
  //     label: 'Search Items',
  //     type: 'text',
  //     placeholder: 'Search by name, SKU, or description'
  //   },
  //   {
  //     name: 'category',
  //     label: 'Category',
  //     type: 'select',
  //     options: [
  //       { value: 'pickles', label: 'Pickles' },
  //       { value: 'honey', label: 'Honey' },
  //       { value: 'seasonings', label: 'Seasonings' },
  //       { value: 'spices', label: 'Spices' },
  //       { value: 'other', label: 'Other' }
  //     ]
  //   },
  //   {
  //     name: 'status',
  //     label: 'Status',
  //     type: 'multiselect',
  //     options: [
  //       { value: 'active', label: 'Active' },
  //       { value: 'low_stock', label: 'Low Stock' },
  //       { value: 'out_of_stock', label: 'Out of Stock' },
  //       { value: 'discontinued', label: 'Discontinued' }
  //     ]
  //   },
  //   {
  //     name: 'dateRange',
  //     label: 'Created Date',
  //     type: 'dateRange'
  //   },
  //   {
  //     name: 'priceRange',
  //     label: 'Price Range',
  //     type: 'range',
  //     min: 0,
  //     max: 1000
  //   },
  //   {
  //     name: 'inStock',
  //     label: 'In Stock Only',
  //     type: 'boolean'
  //   }
  // ];


  const filterFields = [
    {
      name: 'employeeId',
      label: 'Employee ID',
      type: 'select',
      options: [
        { value: 'EMP-08', label: 'EMP-08' },
        { value: 'EMP-09', label: 'EMP-09' },
        { value: 'EMP-10', label: 'EMP-10' },
        { value: 'EMP-11', label: 'EMP-11' },

      ]
    },
    {
      name: 'status',
      label: 'Status',
      type: 'multiselect',
      options: [
        { value: 'Present', label: 'Present' },
        { value: 'Absent', label: 'Absent' },
        { value: 'Leave', label: 'Leave' },
      ]
    },
    {
      name: 'dateRange',
      label: '',
      type: 'dateRange'
    },
  ];


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

  console.log('selectedItem', selectedItem)


  // const statsData = [
  //   {
  //     icon: <InventoryIcon fontSize="large" />,
  //     title: 'Total Items',
  //     value: '2,345',
  //     desc: `+12.5% from last month`,
  //     bgColor: ['#1976d2', '#2196f3']
  //   },
  //   {
  //     icon: <WarningIcon fontSize="large" />,
  //     title: 'Total Present',
  //     value: '15',
  //     desc: '-2.3% from the last month',
  //     bgColor: ['#6a1b9a', '#8e24aa']
  //   },
  //   {
  //     icon: <TrendingUpIcon fontSize="large" />,
  //     title: 'Total Absent',
  //     value: '456',
  //     desc: '+8.2%',
  //     bgColor: ['#2e7d32', '#4caf50']
  //   },
  //   {
  //     icon: <AttachMoneyIcon fontSize="large" />,
  //     title: 'On leave',
  //     value: '$234,567',
  //     desc: 'Increased by +15.2%',
  //     bgColor: ['#ff5722', '#ff9800']
  //   },

  // ]

 const handleAttendanceVerification = ({ status }) => {
  console.log('status',status)
    dispatch(verifyAttendance({ attendanceId: selectedItem._id, status }))
        .then(result => {
                console.log('result', result)
                const message = result.payload?.message || 'Action completed successfully';
                const isRejected = result.error?.message === 'Rejected';
                if (isRejected) {
                  toast.error(message);
                } else {
                  toast.success(message);
                }
              })
  }

  const actions = [
    {
      label: 'View Sessions',
      icon: <VisibilityIcon sx={{ mr: 1, color: 'gray' }} />,
      onClick: handleViewEmpSessionModal,
    },
    {
      label: 'Verify Attendance',
      icon: <RuleIcon sx={{ mr: 1, color: 'gray' }} />,
      onClick: handleViewUpdateStatusModal,
    },
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




  // Handle filter changes
  const handleApplyFilters = (newFilters) => {
    console.log('newFilters', newFilters)
    setFilters(newFilters);

    // Dispatch action to fetch filtered data from backend
    dispatch(getAttendanceList({
      filters: newFilters,
      // page: 1,
      // limit: 10
    }));
  };

  // Initial data fetch
  useEffect(() => {
    dispatch(getAttendanceList({
      filters,
      // page: 1,
      // limit: 10
    }));
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getAttendanceList())
  // }, [dispatch])

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>


      {/* <Box sx={{ mb: 3 }}>
        <Grid container spacing={3}>
          {statsData.map(stats => (
            <StatsCard stats={stats} />
          ))}
        </Grid>
      </Box> */}

      {/* <FilterData
        fields={filterFields}
        onApplyFilters={handleApplyFilters}
        initialFilters={filters}
        showFilterBar={true}
        title="Inventory Filters"
        loading={loading}
      /> */}

      <ReusableTable
        pageTitle="Attendance Logs"
        btnTitle=''
        columns={COLUMNS}
        rows={attendanceList}
        actions={actions}
        // handleAddingNewItem={handleAddingNewItem}

        filterFields={filterFields}
        handleApplyFilters={handleApplyFilters}
        filters={filters}
        showFilterBar={true}
        title="Inventory Filters"
        loading={loading}
      />

      <EmployeeSessions
        open={isEmpSessionModalOpen}
        curData={selectedItem ? selectedItem : {}}
        onUpdateLogoutTime={() => { }}
        onClose={() => setEmpSessionModalOpen(false)}
      />
      <Container maxWidth="lg" sx={{ my: 3 }}>
        {/* <Typography variant="h4" sx={{ my: 3 }}>HR Dashboard</Typography> */}
        <AttendanceCharts
          data={attendanceList}
          defaultChart="status"
          title="Employee Attendance Overview"
        />
      </Container>

      {/* <ViewMessageModal
        open={isMessageModalOpen}
        onClose={() => {
          setMessageModalOpen(false)
        }}
        message={selectedItem?.reason || ''}
      /> */}


      <UpdateStatusModal
      type="Verify Attendance"
        open={isUpdateStatusModalOpen}
        onClose={() => {
          setUpdateStatusModalOpen(false)
        }}
        currentStatus={'status'}
        onUpdate={handleAttendanceVerification}
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

export default AttendanceLogsPage;
