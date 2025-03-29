// shared/hooks/useTableActions.js
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
// import { createNewEntry, updateEntry, deleteEntry } from '../features/ims/itemAPI';
import { createNewEntry, deleteEntry, getAllEntries, updateEntry } from '../../../features/ims/itemAPI.js';
import ItemFormDialog from '../../../components/common/FormDialog.jsx';
import ItemDetailsModal from '../../../components/modules/IMS/ItemDetailsModal.jsx';
import AlertBox from '../../../components/common/AlertBox.jsx';
import ItemHistory from '../../../components/modules/IMS/ItemHistory.jsx';

import { Box } from '../../../components/MUI/index.js';
import { EditIcon, DeleteIcon, VisibilityIcon, TimelineIcon, VpnKeyIcon, StarOutlineIcon } from '../../../assets/icons/icon.js';
import { useSelector } from 'react-redux';
import ReusableTable from '../../../components/common/ReusableTable.jsx';
import { useTableActions } from '../../../custom-hooks/useTableActions.js';
import UserCredentialsModal from '../../../components/modules/HRMS/UserCredentialsModal.jsx';
import api from '../../../config/axiosConfig.js';
import { createNewEmployee, deleteEmployee, getEmployeeList, updateEmployee } from '../../../features/hrms/hrmsAPI.js';
import ReviewPerformanceModal from '../../../components/modules/USER/ReviewPerformanceModal.jsx';


const COLUMNS = [
    { key: "employeeId", label: "Employee ID" },
    { key: "basicInfo.firstName", label: "First Name" },
    { key: "basicInfo.lastName", label: "Last Name" },
    { key: "basicInfo.phoneNumber", label: "Phone Number" },
    { key: "status", label: "Status" },
];





const UserAddRatingPage = () => {
    const dispatch = useDispatch();
      const { user } = useSelector(state => state.auth)
    
    const { employeesList } = useSelector(state => state.hrms.data);

    console.log('employeesList', employeesList)
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
        handleFormSubmission,
        handleDelete,
        isUserCredentialModalOpen,
        setUserCredentialModalOpen,

        isReviewModalOpen,
        setReviewModalOpen,
        handleViewReviewModal
    } = useTableActions({ type: 'employee', actions: { add: createNewEmployee, edit: updateEmployee, delete: deleteEmployee } });

    const handleSubmitReview = async (reviewData) => {
        try {
            // Axios or fetch to send data to backend
            console.log('reviewData', reviewData)
              const response = await api.post('/api/v1/hrms/add/performance-review', reviewData);
              console.log('responseeeee',response.data)
              if(response.data.success){
                toast.success(response.data.message)
              }
            // Handle success
        } catch (error) {
            console.log('errorrr',error.response.data)
            toast.error(error.response.data?.message)
            // Handle error
        }
    };
    // const handleViewUserCredentials = async () => {
    //   // const response = await api.post(`/api/v1/hrms/generate/user/credentials`,{employeeId:"EMP001"})
    //   setUserCredentialModalOpen(true)
    // }

    const actions = [
        {
            label: 'Add Ratings',
            icon: <StarOutlineIcon sx={{ mr: 1 }} />,
            onClick: handleViewReviewModal,
        },
    ];

    useEffect(() => {
        dispatch(getEmployeeList('employees'));
    }, []);

    console.log('seleteditem', selectedItem)
    return (
        <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
            <ReusableTable
                pageTitle="Review Performance"
                btnTitle=''
                columns={COLUMNS}
                rows={employeesList}
                actions={actions}
                handleAddingNewItem={handleAddingNewItem}
            />

            <AlertBox
                item={selectedItem}
                deleteDialogOpen={deleteDialogOpen}
                setDeleteDialogOpen={setDeleteDialogOpen}
                handleDelete={handleDelete}
            />


            <ReviewPerformanceModal
                open={isReviewModalOpen}
                handleClose={() => setReviewModalOpen(false)}
                employeeId={selectedItem?.employeeId || ''}
                onSubmit={handleSubmitReview}
            />

            <ItemFormDialog
                open={isFormDialogOpen}
                onClose={() => {
                    setIsFormDialogOpen(false);
                    setEditingItem({});
                }}
                formType="Employees List"
                onSubmit={handleFormSubmission}
                initialValues={editingItem}
            />


        </Box>
    );
};



export default UserAddRatingPage
