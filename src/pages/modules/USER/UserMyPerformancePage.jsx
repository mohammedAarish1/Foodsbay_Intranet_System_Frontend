const performanceData = [{
    employeeId: "EMP-16",
    month: "March, 2025",
    averageRating: 2.5,
    ratingPercentage: 88,
    performance: [
        {
            evaluator: "EMP-08",
            reviewDate: new Date(1743224244561),
            review: [
                { param: "awareness", rating: 3, comment: "" },
                { param: "responsiveness", rating: 3, comment: "fdf" },
                { param: "behavior", rating: 5, comment: "" },
            ],
        },
        {
            evaluator: "EMP-09",
            reviewDate: new Date(1743224758977),
            review: [
                { param: "awareness", rating: 3, comment: "" },
                { param: "responsiveness", rating: 3, comment: "" },
                { param: "behavior", rating: 3, comment: "" },
            ],
        },
    ],
}];




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
import PerformanceModal from '../../../components/common/modals/PerformanceModal';



const COLUMNS = [
    { key: "month", label: "Month " },
    { key: "averageRating", label: "Average Rating" },
    { key: "ratingPercentage", label: "Rating (%)" },
];



// Main component
const UserMyPerformancePage = () => {
    const dispatch = useDispatch();
    const { ticketList } = useSelector(state => state.user)
    // const [curLeaveRequest, setCurLeaveRequest] = useState(null)
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [showResponse, setShowResponse] = useState(false)
    const theme = useTheme();
    console.log('ticketList', ticketList)


    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
            label: 'View Details',
            icon: <VisibilityIcon sx={{ mr: 1 }} />,
            onClick: handleOpen,
        },

        {
            label: 'Delete',
            icon: <DeleteIcon sx={{ mr: 1, color: 'error.main' }} />,
            onClick: (row) => handleDeleteClick(row),
        },
    ];

    console.log('selectedItem', selectedItem)


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
                rows={performanceData}
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

            <PerformanceModal
                open={open}
                handleClose={handleClose}
                data={performanceData}
            />

            {/* <Snackbar
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
            </Snackbar> */}
        </Box>
    );
};




export default UserMyPerformancePage
