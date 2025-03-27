// import React, { useState, useEffect } from 'react';
// // import Grid from '@mui/material/Grid2';
// import {
//   Box,
// } from '@mui/material';
// import {
//   Edit,
//   Delete,
//   Visibility,
//   Timeline
// } from '@mui/icons-material';
// import ItemFormDialog from '../../../components/modules/IMS/ItemFormDialog.jsx';
// import ItemDetailsModal from '../../../components/modules/IMS/ItemDetailsModal.jsx';
// // import CustomSearch from '../../../components/common/Search.jsx';
// import ReusableTable from '../../../components/common/ReusableTable.jsx';
// import { useDispatch, useSelector } from 'react-redux';
// import { createNewEntry, deleteEntry, getAllEntries, updateEntry } from '../../../features/ims/itemAPI.js';
// import { toast } from 'react-toastify';
// import AlertBox from '../../../components/common/AlertBox.jsx';
// import ItemDetailsPopup from '../../../components/modules/IMS/ItemHistory.jsx';
// import ItemHistory from '../../../components/modules/IMS/ItemHistory.jsx';
// // import TimelineIcon from '@mui/icons-material/Timeline';
// // Main ItemList Component
// const ItemListPage = () => {

//   const dispatch = useDispatch()
//   const { itemList } = useSelector(state => state.item)
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
//   const [isItemHistoryOpen, setItemHistoryOpen] = useState(false)


//   const columns = [
//     { key: "name", label: "Name" },
//     { key: "category", label: "Category" },
//     { key: "inventoryType", label: "Inventory Type" },
//     { key: "stockInHand", label: "Stock In Hand" },
//     { key: "unit", label: "Unit" },
//     // { key: "minStock", label: "Minimum Stock" },
//     { key: "status", label: "Status" },
//   ];

//   // const rows = [
//   //   {
//   //     id: 1,
//   //     name: 'Chilly Flakes ',
//   //     category: 'Herb, Seasoning & Spices',
//   //     inventoryType: 'Raw Material',
//   //     stockInHand: '500',
//   //     unit: 'jars',
//   //     minStock: 100,
//   //     status: 'In Stock',
//   //     lastUpdated: '2024-03-15',
//   //     vendorName: 'Spice Master Pvt Ltd',
//   //     hsnCode: '09109920',
//   //     hsnDesc: 'Dried Chilly Flakes',
//   //     gstRate: 18
//   //   },

//   //   {
//   //     id: 2,
//   //     name: 'Seasonings',
//   //     category: 'Herb, Seasoning & Spices',
//   //     inventoryType: 'Raw Material',
//   //     stockInHand: '500',
//   //     unit: 'jars',
//   //     minStock: 100,
//   //     status: 'In Stock',
//   //     lastUpdated: '2024-03-15',
//   //     vendorName: 'Spice Master Pvt Ltd',
//   //     hsnCode: '09109920',
//   //     hsnDesc: 'Dried Chilly Flakes',
//   //     gstRate: 18
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Seasonings',
//   //     category: 'Herb, Seasoning & Spices',
//   //     inventoryType: 'Raw Material',
//   //     stockInHand: '500',
//   //     unit: 'jars',
//   //     minStock: 100,
//   //     status: 'In Stock',
//   //     lastUpdated: '2024-03-15',
//   //     vendorName: 'Spice Master Pvt Ltd',
//   //     hsnCode: '09109920',
//   //     hsnDesc: 'Dried Chilly Flakes',
//   //     gstRate: 18
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Seasonings',
//   //     category: 'Herb, Seasoning & Spices',
//   //     inventoryType: 'Raw Material',
//   //     stockInHand: '500',
//   //     unit: 'jars',
//   //     minStock: 100,
//   //     status: 'In Stock',
//   //     lastUpdated: '2024-03-15',
//   //     vendorName: 'Spice Master Pvt Ltd',
//   //     hsnCode: '09109920',
//   //     hsnDesc: 'Dried Chilly Flakes',
//   //     gstRate: 18
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Seasonings',
//   //     category: 'Herb, Seasoning & Spices',
//   //     inventoryType: 'Raw Material',
//   //     stockInHand: '500',
//   //     unit: 'jars',
//   //     minStock: 100,
//   //     status: 'In Stock',
//   //     lastUpdated: '2024-03-15',
//   //     vendorName: 'Spice Master Pvt Ltd',
//   //     hsnCode: '09109920',
//   //     hsnDesc: 'Dried Chilly Flakes',
//   //     gstRate: 18
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Seasonings',
//   //     category: 'Herb, Seasoning & Spices',
//   //     inventoryType: 'Raw Material',
//   //     stockInHand: '500',
//   //     unit: 'jars',
//   //     minStock: 100,
//   //     status: 'In Stock',
//   //     lastUpdated: '2024-03-15',
//   //     vendorName: 'Spice Master Pvt Ltd',
//   //     hsnCode: '09109920',
//   //     hsnDesc: 'Dried Chilly Flakes',
//   //     gstRate: 18
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Seasonings',
//   //     category: 'Herb, Seasoning & Spices',
//   //     inventoryType: 'Raw Material',
//   //     stockInHand: '500',
//   //     unit: 'jars',
//   //     minStock: 100,
//   //     status: 'In Stock',
//   //     lastUpdated: '2024-03-15',
//   //     vendorName: 'Spice Master Pvt Ltd',
//   //     hsnCode: '09109920',
//   //     hsnDesc: 'Dried Chilly Flakes',
//   //     gstRate: 18
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Seasonings',
//   //     category: 'Herb, Seasoning & Spices',
//   //     inventoryType: 'Raw Material',
//   //     stockInHand: '500',
//   //     unit: 'jars',
//   //     minStock: 100,
//   //     status: 'In Stock',
//   //     lastUpdated: '2024-03-15',
//   //     vendorName: 'Spice Master Pvt Ltd',
//   //     hsnCode: '09109920',
//   //     hsnDesc: 'Dried Chilly Flakes',
//   //     gstRate: 18
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Seasonings',
//   //     category: 'Herb, Seasoning & Spices',
//   //     inventoryType: 'Raw Material',
//   //     stockInHand: '500',
//   //     unit: 'jars',
//   //     minStock: 100,
//   //     status: 'In Stock',
//   //     lastUpdated: '2024-03-15',
//   //     vendorName: 'Spice Master Pvt Ltd',
//   //     hsnCode: '09109920',
//   //     hsnDesc: 'Dried Chilly Flakes',
//   //     gstRate: 18
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Seasonings',
//   //     category: 'Herb, Seasoning & Spices',
//   //     inventoryType: 'Raw Material',
//   //     stockInHand: '500',
//   //     unit: 'jars',
//   //     minStock: 100,
//   //     status: 'In Stock',
//   //     lastUpdated: '2024-03-15',
//   //     vendorName: 'Spice Master Pvt Ltd',
//   //     hsnCode: '09109920',
//   //     hsnDesc: 'Dried Chilly Flakes',
//   //     gstRate: 18
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Seasonings',
//   //     category: 'Herb, Seasoning & Spices',
//   //     inventoryType: 'Raw Material',
//   //     stockInHand: '500',
//   //     unit: 'jars',
//   //     minStock: 100,
//   //     status: 'In Stock',
//   //     lastUpdated: '2024-03-15',
//   //     vendorName: 'Spice Master Pvt Ltd',
//   //     hsnCode: '09109920',
//   //     hsnDesc: 'Dried Chilly Flakes',
//   //     gstRate: 18
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Seasonings',
//   //     category: 'Herb, Seasoning & Spices',
//   //     inventoryType: 'Raw Material',
//   //     stockInHand: '500',
//   //     unit: 'jars',
//   //     minStock: 100,
//   //     status: 'In Stock',
//   //     lastUpdated: '2024-03-15',
//   //     vendorName: 'Spice Master Pvt Ltd',
//   //     hsnCode: '09109920',
//   //     hsnDesc: 'Dried Chilly Flakes',
//   //     gstRate: 18
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Seasonings',
//   //     category: 'Herb, Seasoning & Spices',
//   //     inventoryType: 'Raw Material',
//   //     stockInHand: '500',
//   //     unit: 'jars',
//   //     minStock: 100,
//   //     status: 'In Stock',
//   //     lastUpdated: '2024-03-15',
//   //     vendorName: 'Spice Master Pvt Ltd',
//   //     hsnCode: '09109920',
//   //     hsnDesc: 'Dried Chilly Flakes',
//   //     gstRate: 18
//   //   },


//   //   // Add more items as needed
//   // ];

//   const handleAddingNewItem = () => {
//     setIsFormDialogOpen(true);
//     setEditingItem(null)
//     setSelectedItem(null)
//   }

//   const handleViewDetails = (row) => {
//     console.log('test', row)
//     setSelectedItem(row)
//     // setActionAnchorEl(null);
//     setIsDetailsModalOpen(true);
//   }
//   const handleViewHistory = (row) => {
//     console.log('history', row)
//     setSelectedItem(row)
//     setItemHistoryOpen(true);
//   }

//   const handleDeleteClick = (row) => {
//     // setActionAnchorEl(null);
//     setDeleteDialogOpen(true);
//     setSelectedItem(row)

//   };

//   const handleEditing = (row) => {
//     console.log('rowwwwww', row)
//     // setActionAnchorEl(null);
//     // setSnackbar({ open: true, message: 'Edit functionality coming soon', severity: 'info' });
//     setEditingItem(row);
//     setIsFormDialogOpen(true);
//   }
//   const actions = [
//     {
//       label: 'More Details',
//       icon: <Visibility sx={{ mr: 1 }} />,
//       // onClick: (row) => alert(`Edit ${row.name}`),
//       onClick: (row) => handleViewDetails(row),
//     },
//     {
//       label: 'View History',
//       icon: <Timeline sx={{ mr: 1 }} />,
//       onClick: (row) => handleViewHistory(row),
//     },
//     {
//       label: 'Edit',
//       icon: <Edit sx={{ mr: 1 }} />,
//       onClick: (row) => handleEditing(row),
//     },
//     {
//       label: 'Delete',
//       icon: <Delete sx={{ mr: 1, color: 'error.main' }} />,
//       onClick: (row) => handleDeleteClick(row),
//     },
//   ];


//   // const handleFormSubmission = (values, setSubmitting) => {
//   //   if (editingItem) {
//   //     dispatch(updateEntry({ id: editingItem._id, formData: values, type: 'itemEntry' }))
//   //       .then(result => {
//   //         console.log('result update', result)
//   //         if (result.error?.message === 'Rejected') {
//   //           setIsFormDialogOpen(false);
//   //           toast.info(result.payload.message)
//   //         } else {
//   //           setIsFormDialogOpen(false);
//   //           toast.success(result.payload.message)
//   //         }
//   //         setSubmitting();
//   //       })
//   //       .catch(error => {
//   //         console.log('err', error)
//   //         // Handle any unexpected errors
//   //         toast.error('An error occurred');
//   //         setSubmitting();
//   //       });
//   //   } else {
//   //     console.log('values', values)
//   //     dispatch(createNewEntry({ formData: values, type: 'newItem' }))
//   //       .then(result => {
//   //         console.log('result add', result)
//   //         if (result.error?.message === 'Rejected') {
//   //           toast.error(result.payload.message)
//   //         } else {
//   //           setIsFormDialogOpen(false);
//   //           toast.success(result.payload.message)
//   //         }
//   //         // toast.error(result)
//   //         // Call the callback to reset submitting state
//   //         setSubmitting();
//   //       })
//   //       .catch(error => {
//   //         // Handle any unexpected errors
//   //         toast.error('An error occurred');
//   //         setSubmitting();
//   //       })


//   //   }
//   // };


//   // Event handlers
//   // const handleFilterClick = (event) => {
//   //   if (isMobileScreen) {
//   //     setIsFilterDrawerOpen(true);
//   //   } else {
//   //     setFilterAnchorEl(event.currentTarget);
//   //   }
//   // };

//   // const handleActionClick = (event, item) => {
//   //   // console.log('check',event.currentTarget)
//   //   console.log('check', item)
//   //   setActionAnchorEl(event.currentTarget);
//   //   setSelectedItem(item);
//   // };


//   // handle deleting an item from the list


//   const handleFormSubmission = (values, setSubmitting) => {
//     const isEdit = !!editingItem;
//     const action = isEdit ? updateEntry : createNewEntry;
//     const payload = isEdit ? { id: editingItem._id, formData: values, type: 'itemEntry' } : { formData: values, type: 'newItem' };

//     dispatch(action(payload))
//       .then(result => {
//         const message = result.payload?.message || 'Action completed successfully';
//         const isRejected = result.error?.message === 'Rejected';

//         if (isRejected) {
//           toast.error(message);
//         } else {
//           setIsFormDialogOpen(false);
//           toast.success(message);
//         }

//         setSubmitting();
//       })
//       .catch(error => {
//         console.log('err', error);
//         toast.error('An error occurred');
//         setSubmitting();
//       });
//   };


//   const handleDelete = () => {
//     if (selectedItem) {
//       const id = selectedItem._id;
//       dispatch(deleteEntry({ id, type: 'itemEntry' }))
//         .then(result => {
//           if (result.payload.success) {
//             toast.info(result.payload.message)
//           } else {
//             toast.error('Something went wrong !')
//           }
//         })
//     }
//     setDeleteDialogOpen(false);
//     setSelectedItem(null);
//   };

//   useEffect(() => {
//     dispatch(getAllEntries('items'))
//   }, [])

//   return (
//     <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
//       <ReusableTable
//         pageTitle="Inventory"
//         columns={columns}
//         rows={itemList}
//         actions={actions}
//         handleAddingNewItem={handleAddingNewItem}
//       />
//       {/* <Dialog
//         open={deleteDialogOpen}
//         onClose={() => setDeleteDialogOpen(false)}
//         maxWidth="xs"
//         fullWidth
//       >
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Are you sure you want to delete "{selectedItem?.name}"? This action cannot be undone.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
//           <Button onClick={handleDelete} color="error" variant="contained">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog> */}
//       <AlertBox
//         item={selectedItem}
//         deleteDialogOpen={deleteDialogOpen}
//         setDeleteDialogOpen={setDeleteDialogOpen}
//         handleDelete={handleDelete}
//       />

//       {/* Snackbar for notifications */}
//       {/* <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           severity={snackbar.severity}
//           sx={{ width: '100%' }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar> */}

//       <ItemDetailsModal
//         open={isDetailsModalOpen}
//         onClose={() => setIsDetailsModalOpen(false)}
//         item={selectedItem}
//         section="Item List"
//       />
//       <ItemHistory
//         open={isItemHistoryOpen}
//         handleClose={() => setItemHistoryOpen(false)}
//         itemId={selectedItem?._id}
//       />

//       <ItemFormDialog
//         open={isFormDialogOpen}
//         onClose={() => {
//           setIsFormDialogOpen(false);
//           setEditingItem({});
//         }}
//         formType="Item List"
//         onSubmit={handleFormSubmission}
//         // initialValues={editingItem ? editingItem : {}}
//         initialValues={editingItem }
//       />
//     </Box>
//   );
// };

// export default ItemListPage;




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

import { Box } from '../../../components/MUI';
import { EditIcon, DeleteIcon, VisibilityIcon, TimelineIcon, VpnKeyIcon } from '../../../assets/icons/icon.js';
import { useSelector } from 'react-redux';
import ReusableTable from '../../../components/common/ReusableTable.jsx';
import { useTableActions } from '../../../custom-hooks/useTableActions.js';
import UserCredentialsModal from '../../../components/modules/HRMS/UserCredentialsModal.jsx';
import api from '../../../config/axiosConfig.js';
import { createNewEmployee, deleteEmployee, getEmployeeList, updateEmployee } from '../../../features/hrms/hrmsAPI.js';


const COLUMNS = [
  { key: "employeeId", label: "Employee ID" },
  { key: "basicInfo.firstName", label: "First Name" },
  { key: "basicInfo.lastName", label: "Last Name" },
  { key: "basicInfo.phoneNumber", label: "Phone Number" },
  { key: "status", label: "Status" },
];

const employees = [
  {
    basicInfo: {
      firstName: 'John',
      lastName: 'Doe',
      dob: '30/1/2025, 4:38:23 pm',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      gender: 'male',
    },
    address: {
      mainAdd: '123 Main St',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      pincode: '10001',
    },
    employeeId: 'EMP001',
    hireDate: '30/1/2025, 4:38:23 pm',
    department: 'HR',
    jobTitle: 'HR Manager',
    managerId: null,
    status: 'active',
    salary: 75000,
    workLocation: 'New York',
    bankDetails: {
      accountNumber: '1234567890',
      bankName: 'Bank of America',
      ifscCode: 'BOFA123456',
    },
    leaves: {
      total: 12,
      balance: 12,
    },
    attendanceHistory: [
      { date: '30/1/2025, 4:38:23 pm', status: 'present' },
      { date: '30/1/2025, 4:38:23 pm', status: 'absent' },
    ],
    emergencyContact: {
      name: 'Jane Doe',
      phoneNumberhone: '0987654321',
      relation: 'Spouse',
    },
    documents: [
      { documentType: 'ID Proof', documentUrl: 'http://example.com/idproof' },
    ],
    profilePicture: 'http://example.com/profile1.jpg',
  },
  {
    basicInfo: {
      firstName: 'Alice',
      lastName: 'Smith',
      dob: '30/1/2025, 4:38:23 pm',
      email: 'alice.smith@example.com',
      phoneNumber: '2233445566',
      gender: 'female',
    },
    address: {
      mainAdd: '456 Oak St',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      pincode: '90001',
    },
    employeeId: 'EMP002',
    hireDate: '30/1/2025, 4:38:23 pm',
    department: 'Engineering',
    jobTitle: 'Software Engineer',
    managerId: null,
    status: 'active',
    salary: 95000,
    workLocation: 'Los Angeles',
    bankDetails: {
      accountNumber: '9876543210',
      bankName: 'Chase Bank',
      ifscCode: 'CHAS987654',
    },
    leaves: {
      total: 12,
      balance: 12,
    },
    attendanceHistory: [
      { date: new Date('2025-01-01').toLocaleDateString(), status: 'present' },
      { date: new Date('2025-01-02').toLocaleDateString(), status: 'half-day' },
    ],
    emergencyContact: {
      name: 'Bob Smith',
      phoneNumberhone: '1122334455',
      relation: 'Brother',
    },
    documents: [
      { documentType: 'Passport', documentUrl: 'http://example.com/passport' },
    ],
    profilePicture: 'http://example.com/profile2.jpg',
  },
  {
    basicInfo: {
      firstName: 'Robert',
      lastName: 'Johnson',
      dob: new Date('1980-10-11').toLocaleDateString(),
      email: 'robert.johnson@example.com',
      phoneNumber: '3344556677',
      gender: 'male',
    },
    address: {
      mainAdd: '789 Pine St',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      pincode: '60601',
    },
    employeeId: 'EMP003',
    hireDate: new Date('2008-03-15').toLocaleDateString(),
    department: 'Finance',
    jobTitle: 'Financial Analyst',
    managerId: null,
    status: 'inactive',
    salary: 70000,
    workLocation: 'Chicago',
    bankDetails: {
      accountNumber: '1112233445',
      bankName: 'Wells Fargo',
      ifscCode: 'WELF111223',
    },
    leaves: {
      total: 12,
      balance: 10,
    },
    attendanceHistory: [
      { date: new Date('2025-01-01').toLocaleDateString(), status: 'absent' },
      { date: new Date('2025-01-02').toLocaleDateString(), status: 'present' },
    ],
    emergencyContact: {
      name: 'Lisa Johnson',
      phoneNumberhone: '5566778899',
      relation: 'Wife',
    },
    documents: [
      { documentType: 'ID Proof', documentUrl: 'http://example.com/idproof2' },
    ],
    profilePicture: 'http://example.com/profile3.jpg',
  },
  {
    basicInfo: {
      firstName: 'David',
      lastName: 'Williams',
      dob: new Date('1995-05-15').toLocaleDateString(),
      email: 'david.williams@example.com',
      phoneNumber: '4455667788',
      gender: 'male',
    },
    address: {
      mainAdd: '101 Maple St',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      pincode: '94101',
    },
    employeeId: 'EMP004',
    hireDate: new Date('2018-07-01').toLocaleDateString(),
    department: 'Sales',
    jobTitle: 'Sales Representative',
    managerId: 'EMP001',
    status: 'active',
    salary: 65000,
    workLocation: 'San Francisco',
    bankDetails: {
      accountNumber: '5554443332',
      bankName: 'Citibank',
      ifscCode: 'CITI555444',
    },
    leaves: {
      total: 12,
      balance: 12,
    },
    attendanceHistory: [
      { date: new Date('2025-01-01').toLocaleDateString(), status: 'present' },
      { date: new Date('2025-01-02').toLocaleDateString(), status: 'absent' },
    ],
    emergencyContact: {
      name: 'Olivia Williams',
      phoneNumberhone: '6677889900',
      relation: 'Mother',
    },
    documents: [
      { documentType: 'Resume', documentUrl: 'http://example.com/resume' },
    ],
    profilePicture: 'http://example.com/profile4.jpg',
  },
  {
    basicInfo: {
      firstName: 'Sarah',
      lastName: 'Brown',
      dob: new Date('1988-11-05').toLocaleDateString(),
      email: 'sarah.brown@example.com',
      phoneNumber: '5566778899',
      gender: 'female',
    },
    address: {
      mainAdd: '202 Birch St',
      city: 'Seattle',
      state: 'WA',
      country: 'USA',
      pincode: '98101',
    },
    employeeId: 'EMP005',
    hireDate: new Date('2012-12-20').toLocaleDateString(),
    department: 'Engineering',
    jobTitle: 'Product Manager',
    managerId: 'EMP002',
    status: 'active',
    salary: 90000,
    workLocation: 'Seattle',
    bankDetails: {
      accountNumber: '6677889900',
      bankName: 'Bank of Seattle',
      ifscCode: 'BOS667788',
    },
    leaves: {
      total: 12,
      balance: 5,
    },
    attendanceHistory: [
      { date: new Date('2025-01-01').toLocaleDateString(), status: 'half-day' },
      { date: new Date('2025-01-02').toLocaleDateString(), status: 'present' },
    ],
    emergencyContact: {
      name: 'Michael Brown',
      phoneNumberhone: '3344556677',
      relation: 'Father',
    },
    documents: [
      { documentType: 'Offer Letter', documentUrl: 'http://example.com/offerletter' },
    ],
    profilePicture: 'http://example.com/profile5.jpg',
  },
  // Add similar objects for remaining employees (EMP006 to EMP010)
];



const EmployeeListPage = () => {
  const dispatch = useDispatch();
  const { employeesList } = useSelector(state => state.hrms.data);
  const [isItemHistoryOpen, setItemHistoryOpen] = useState(false);
  // const [isUserCredentialModalOpen, setUserCredentialModalOpen] = useState(false)
console.log('employeesList',employeesList)
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
    isUserCredentialModalOpen,
    setUserCredentialModalOpen,
    handleViewUserCredentials
  } = useTableActions({ type: 'employee', actions: { add: createNewEmployee, edit: updateEmployee, delete: deleteEmployee } });


  // const handleViewUserCredentials = async () => {
  //   // const response = await api.post(`/api/v1/hrms/generate/user/credentials`,{employeeId:"EMP001"})
  //   setUserCredentialModalOpen(true)
  // }

  const actions = [
    {
      label: 'More Details',
      icon: <VisibilityIcon sx={{ mr: 1 }} />,
      onClick: handleViewDetails,
    },
    // {
    //   label: 'View History',
    //   icon: <TimelineIcon sx={{ mr: 1 }} />,
    //   onClick: (row) => {
    //     setSelectedItem(row);
    //     setItemHistoryOpen(true);
    //   },
    // },
    {
      label: 'Edit',
      icon: <EditIcon sx={{ mr: 1 }} />,
      onClick: handleEditing,
    },
    {
      label: 'Show ID & Password',
      icon: <VpnKeyIcon sx={{ mr: 1, color: 'success.main' }} />,
      onClick: handleViewUserCredentials,
    },
    {
      label: 'Delete',
      icon: <DeleteIcon sx={{ mr: 1, color: 'error.main' }} />,
      onClick: handleDeleteClick,
    },

  ];

  useEffect(() => {
    console.log('lllllllllllllllllllllllllllllllkkkkkkkkkkkkkkk')
    dispatch(getEmployeeList('employees'));
  }, []);

  console.log('seleteditem', selectedItem)
  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <ReusableTable
        pageTitle="Employees"
        btnTitle='Add New Employee'
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

      <ItemDetailsModal
        open={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        item={selectedItem}
        section="Employees List"
      />

      <ItemHistory
        open={isItemHistoryOpen}
        handleClose={() => setItemHistoryOpen(false)}
        itemId={selectedItem?._id}
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

      <UserCredentialsModal
        open={isUserCredentialModalOpen}
        onClose={() => setUserCredentialModalOpen(false)}
        // credentials={selectedItem}
        userId={selectedItem?.employeeId || ''}
        password={selectedItem?.passwordStatus.isTemporary ? selectedItem?.password : ''}
      />
    </Box>
  );
};

export default EmployeeListPage;
