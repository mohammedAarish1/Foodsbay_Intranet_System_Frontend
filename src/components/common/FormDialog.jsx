// import React, { useEffect, useState } from 'react';
// import { Formik, Form, Field } from 'formik';
// import Grid from '@mui/material/Grid2';
// import {
//   TextField,
//   Select,
//   MenuItem,
//   Button,
//   Typography,
//   Paper,
//   Dialog,
//   useTheme,
//   alpha,
//   IconButton,
//   Box,
//   CircularProgress
// } from '@mui/material';
// import {
//   Close as CloseIcon,
// } from '@mui/icons-material';
// import { generateValidationSchema } from '../../../schemas/common/entrySchema';
// import api from '../../../config/axiosConfig';


// // Reusable form component
// const ItemFormDialog = ({
//   open,
//   onClose,
//   formType,
//   initialValues = {},
//   onSubmit
// }) => {
//   const [items,setItems]=useState([]);

//   const getIAllItems=async(type)=>{
//     try {
//       const response =await api.get(`/api/v1/item/list/${type}`)
//       console.log('res', response.data?.data.itemList)
//       if(response.data.status===200){
//         setItems(response.data?.data?.itemList)
//       }
//     } catch (error) {
//       throw error
//     }
//   }
//   // Dynamic form fields based on form type
//   const getFormFields = (formType) => {
//     // const baseFields = [
//     //   { name: 'name', label: 'Name', type: 'text' },
//     //   // { name: 'category', label: 'Category', type: 'text' }
//     // ];

//     const specificFields = {
//       'Item List': [
//         { name: 'name', label: 'Name', type: 'text' },
//         {
//           name: 'category', label: 'Category', type: 'select',
//           options: ['Herb, Seasoning & Spices', 'Pickles', 'Chutney']
//         },
//         {
//           name: 'inventoryType', label: 'Inventory Type', type: 'select',
//           options: ['Raw Material', 'Finished Goods', 'Packaging']
//         },
//         { name: 'stockInHand', label: 'Stock In Hand', type: 'number' },
//         { name: 'minStock', label: 'Minimum Stock', type: 'number' },
//         {
//           name: 'unit', label: 'Unit Type', type: 'select',
//           options: ['jars', 'kg', 'litre', 'g']
//         },
//         {
//           name: 'status', label: 'Status', type: 'select',
//           options: ['In Stock', 'Out of Stock']
//         },
//         { name: 'vendorName', label: 'Vendor Name', type: 'text' },
//         { name: 'hsnCode', label: 'HSN Code', type: 'text' },
//         { name: 'hsnDesc', label: 'HSN Description', type: 'text' },
//         {
//           name: 'gstRate', label: 'GST Rate', type: 'select',
//           options: [0, 5, 12, 18, 28]
//         },
//       ],
//       'Purchases': [
//         {
//           name: 'name', label: 'Name', type: 'select',
//           options:items.map(item => item.name) || []
//         },
//         { name: 'invoiceNo', label: 'Invoice Number', type: 'text' },
//         { name: 'amount', label: 'Amount', type: 'number' },
//         { name: 'quantity', label: 'Quantity', type: 'number' },
//         {
//           name: 'unit', label: 'Unit Type', type: 'select',
//           options: ['jars', 'kg', 'litre', 'g']
//         },
//         { name: 'clientVendor', label: 'Client/Vendor', type: 'text' },
//         { name: 'biltyNumber', label: 'Bilty Number', type: 'text' },
//       ],
//       'Sales': [
//         { name: 'invoiceNo', label: 'Invoice Number', type: 'text' },
//         { name: 'amount', label: 'Amount', type: 'number' },
//         { name: 'units', label: 'Units', type: 'number' },
//         { name: 'clientVendor', label: 'Client/Vendor', type: 'text' },
//         { name: 'bltNumber', label: 'BLT Number', type: 'text' },
//       ],
//       'Purchase Return': [
//         { name: 'invoiceNo', label: 'Invoice Number', type: 'text' },
//         { name: 'amount', label: 'Amount', type: 'number' },
//         { name: 'quantity', label: 'Quantity', type: 'number' },
//         { name: 'clientVendor', label: 'Client/Vendor', type: 'text' },
//         { name: 'creditNoteNo', label: 'Credit Note No.', type: 'text' },
//         {
//           name: 'type', label: 'Type', type: 'select',
//           options: ['Return', 'Replacement']
//         },
//         { name: 'viewDocs', label: 'View Docs', type: 'file' }
//       ],
//       'Sales Return': [
//         { name: 'invoiceNo', label: 'Invoice Number', type: 'text' },
//         { name: 'amount', label: 'Amount', type: 'number' },
//         { name: 'quantity', label: 'Quantity', type: 'number' },
//         { name: 'clientVendor', label: 'Client/Vendor', type: 'text' },
//         { name: 'creditNoteNo', label: 'Credit Note No.', type: 'text' },
//         {
//           name: 'type', label: 'Type', type: 'select',
//           options: ['Return', 'Replacement']
//         },
//         { name: 'viewDocs', label: 'View Docs', type: 'file' }
//       ]
//     };

//     return [...(specificFields[formType] || [])];
//   };

//   // Determine initial values
//   const defaultInitialValues = getFormFields(formType).reduce((acc, field) => {
//     acc[field?.name] = initialValues[field?.name] || '';
//     return acc;
//   }, {});


// useEffect(()=>{
//   if(formType==='Purchases'){
//     getIAllItems("items")
//   }
// },[])

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="md"
//       fullWidth
//       sx={{
//         '& .MuiDialog-paper': {
//           borderRadius: 4,
//           // background: theme.palette.mode === 'dark'
//           //   ? alpha(theme.palette.background.default, 0.95)
//           //   : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
//         }
//       }}
//     >
//       <Paper elevation={3} sx={{ p: 3, margin: 'auto' }}>
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             p: 2,
//             pb: 4
//           }}
//         >
//           <Typography variant="h6" gutterBottom>
//             {formType} Form
//           </Typography>
//           <IconButton
//             onClick={onClose}
//             sx={{
//               color: 'text.secondary',
//               transition: 'all 0.2s ease',
//               '&:hover': {
//                 backgroundColor: 'action.hover',
//                 transform: 'rotate(90deg)',
//               }
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </Box>
//         <Formik
//           initialValues={defaultInitialValues}
//           validationSchema={generateValidationSchema(formType)}
//           onSubmit={(values, { setSubmitting, resetForm }) => {
//             onSubmit(values, () => {
//               setSubmitting(false);
//               resetForm();
//             });
//           }}
//         >
//           {({ errors, touched, isSubmitting,setFieldValue }) => (
//             <Form>
//               <Grid container spacing={2}>
//                 {getFormFields(formType).map((field) => (
//                   <Grid item size={{ xs: 12, sm: 6 }} key={field.name}>
//                     {field.type === 'select' ? (
//                       <Field
//                         as={TextField}
//                         select
//                         fullWidth
//                         name={field.name}
//                         label={field.label}
//                         variant="outlined"
//                         error={touched[field.name] && Boolean(errors[field.name])}
//                         helperText={touched[field.name] && errors[field.name]}
//                         onChange={(e) => {
//                           // Set the field value using Formik's setFieldValue
//                           setFieldValue(field.name, e.target.value);

//                           // If this is for the 'name' field in Purchases form type
//                           if (formType === 'Purchases' && field.name === 'name') {
//                             // Example: Fetch additional details based on selected item name
//                             // You might want to add a function to get item details
//                             const selectedItem = items.find(item => item.name === e.target.value);
//                             console.log('selectedItemmmmmmmmmm',selectedItem)
//                             if (selectedItem) {
//                               // For example, you could pre-fill other fields based on the selected item
//                               setFieldValue('category', selectedItem.category);
//                               setFieldValue('unit', selectedItem.unit);
//                               // Add more pre-filling logic as needed
//                             }
//                           }
//                         }}
//                       >
//                         {field.options.map((option) => (
//                           <MenuItem key={option} value={option}>
//                             {option}
//                             {/* {field.name==='gstRate'&& '%'} */}
//                           </MenuItem>
//                         ))}
//                       </Field>
//                     ) : (
//                       <Field
//                         as={TextField}
//                         fullWidth
//                         name={field.name}
//                         label={field.label}
//                         type={field.type}
//                         variant="outlined"
//                         error={touched[field.name] && Boolean(errors[field.name])}
//                         helperText={touched[field.name] && errors[field.name]}
//                         InputLabelProps={field.type === 'date' ? { shrink: true } : {}}
//                       />
//                     )}
//                   </Grid>
//                 ))}
//                 <Grid item size={{ xs: 12 }}>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     disabled={isSubmitting}
//                     fullWidth
//                   >
//                     {isSubmitting ? (
//                       <CircularProgress size={24} color='red' />
//                     ) : (
//                       'Submit'
//                     )}
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Form>
//           )}
//         </Formik>
//       </Paper>
//     </Dialog>
//   );
// };

// export default ItemFormDialog;







import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Grid from '@mui/material/Grid2';
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Paper,
  Dialog,
  IconButton,
  Box,
  CircularProgress,
  Autocomplete,
  FormControlLabel,
  Checkbox
} from '../MUI';
import {
  CloseIcon,
  CloudUploadIcon,
  DeleteIcon,
  PersonIcon
} from '../../assets/icons/icon.js';
import { styled } from '@mui/material/styles';
import { generateValidationSchema } from '../../schemas/common/entrySchema.js';
import api from '../../config/axiosConfig.js';
import { useSelector } from 'react-redux';
import AutoCompleteField from './AutoCompleteField.jsx';
import CloseButton from '../Buttons/CloseButton.jsx';
import SubmitButton from '../Buttons/SubmitButton.jsx';

const calculateTotalDays = (startDate, endDate) => {
  console.log('startdate', startDate)
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }
  return 0;
};

// Styled component for file input
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const FormDialog = ({
  title = '',
  open,
  onClose,
  formType,
  initialValues = null,
  onSubmit
}) => {
  console.log('initialValues', initialValues)
  const [items, setItems] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);



  const [documents, setDocuments] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [removedFiles, setRemovedFiles] = useState([]);

  // Add a new ref for the file input
  // const fileInputRef = useRef(null);
  // const {itemList,salesList}=useSelector(state=>state.item)

  // const [removedDocuments, setRemovedDocuments] = useState([]);
  // const [filteredItems, setFilteredItems] = useState([]);

  // const [transactions, setTransactions] = useState([]); // for the list of sale and purchase
  // const [filteredTransactions, setFilteredTransactions] = useState([]);


  // Add refs for file inputs
  const profileInputRef = useRef(null);
  const documentsInputRef = useRef(null);

  const getAllItems = async (type) => {
    console.log('checkingg...')
    try {
      const response = await api.get(`/api/v1/item/list/${type}`);
      console.log('response', response.data)
      if (response.data.status === 200) {
        setItems(response.data?.data);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  // Add this new function to handle profile picture upload
  // const handleProfilePicture = (event) => {
  //   console.log('handnle profile picture')
  //   const file = event.target.files[0];
  //   console.log('file', file)
  //   if (file) {
  //     file.isProfilePicture = true
  //     // for Previewing the image
  //     const reader = new FileReader();
  //     console.log('reader', reader)
  //     reader.onloadend = () => {
  //       setProfilePreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);

  //     // Update uploadedFiles state for the profile picture
  //     setUploadedFiles(prev => {
  //       // Remove any existing profile picture
  //       const filesWithoutProfile = prev.filter(f => !f.isProfilePicture);
  //       return [...filesWithoutProfile, file];
  //     });
  //   }
  // };
  console.log('upload files ', uploadedFiles);




  const getFormFields = (formType) => {

    const specificFields = {
      'Item List': [
        // { name: 'name', label: 'Name', type: 'text' },
        {
          name: 'name',
          label: 'Name',
          type: 'autocomplete',
          options: items.map(item => item.name)
        },
        {
          name: 'category', label: 'Category', type: 'select',
          options: ['Herb, Seasoning & Spices', 'Honey', 'Bottles', 'Pickles', 'Chutney', 'Oats', 'Cap', 'Jars', 'Labels', 'Shippers']
        },
        {
          name: 'inventoryType', label: 'Inventory Type', type: 'select',
          options: ['Raw Material', 'Finished Goods', 'Packaging']
        },
        { name: 'minStock', label: 'Minimum Stock', type: 'number' },
        {
          name: 'unit', label: 'Unit Type', type: 'select',
          options: ['jars', 'kg', 'litre', 'g', 'pcs', 'ml']
        },
        { name: 'hsnCode', label: 'HSN Code', type: 'text' },
        { name: 'hsnDesc', label: 'HSN Description', type: 'text' },
        {
          name: 'gstRate', label: 'GST Rate', type: 'select',
          options: [0, 5, 12, 18, 28]
        },
      ],
      'Sale&Purchase': [
        {
          name: 'name', label: 'Name', type: 'select',
          options: items?.map(item => item.name) || []
        },
        { name: 'invoiceNo', label: 'Invoice Number', type: 'text' },
        { name: 'quantity', label: 'Quantity', type: 'number' },
        { name: 'unitPrice', label: 'Unit Price', type: 'Unit Price' },
        // { name: 'taxableAmount', label: 'Total Amount', type: 'number' },
        {
          name: 'unit', label: 'Unit Type', type: 'select',
          options: ['jars', 'kg', 'litre', 'g', 'pcs', 'ml']
        },
        { name: 'clientVendor', label: 'Client/Vendor', type: 'text' },
        { name: 'biltyNumber', label: 'Bilty Number', type: 'text' },
        { name: 'remarks', label: 'Remarks', type: 'text' },
      ],
      'Sales Return': [
        {
          name: 'name', label: 'Name', type: 'select',
          options: items.map(item => item.name) || []
        },
        {
          name: 'invoiceNo',
          label: 'Ref. Invoice Number',
          type: 'autocomplete',
          // options: transactions?.map(entry => entry.invoiceNo)
        },
        // { name: 'invoiceNo', label: 'Ref. Invoice Number', type: 'text' },
        { name: 'unitPrice', label: 'Unit Price', type: 'Unit Price' },
        { name: 'quantity', label: 'Quantity', type: 'number' },
        {
          name: 'unit', label: 'Unit Type', type: 'select',
          options: ['jars', 'kg', 'litre', 'g', 'pcs', 'ml']
        },
        { name: 'clientVendor', label: 'Client/Vendor', type: 'text' },
        { name: 'creditNoteNo', label: 'Credit Note No.', type: 'text' },
        {
          name: 'condition', label: 'Product Condition', type: 'select',
          options: ['Damaged', 'Expired', 'Defective', 'Perfect']
        },
        { name: 'remarks', label: 'Remarks', type: 'text' },
      ],
      'Purchase Return': [
        {
          name: 'name', label: 'Name', type: 'select',
          options: items.map(item => item.name) || []
        },
        {
          name: 'invoiceNo',
          label: 'Ref. Invoice Number',
          type: 'autocomplete',
          // options: transactions?.map(entry => entry.invoiceNo)
        },
        // { name: 'invoiceNo', label: 'Ref. Invoice Number', type: 'text' },
        { name: 'unitPrice', label: 'Unit Price', type: 'Unit Price' },
        { name: 'quantity', label: 'Quantity', type: 'number' },
        {
          name: 'unit', label: 'Unit Type', type: 'select',
          options: ['jars', 'kg', 'litre', 'g', 'pcs', 'ml']
        },
        { name: 'clientVendor', label: 'Client/Vendor', type: 'text' },
        { name: 'debitNoteNo', label: 'Dedit Note No.', type: 'text' },
        // {
        //   name: 'condition', label: 'Product Condition', type: 'select',
        //   options: ['Damaged', 'Expired', 'Defective', 'Perfect']
        // },
        { name: 'remarks', label: 'Remarks', type: 'text' },
      ],
      'Employees List': [
        { name: 'firstName', label: 'First Name', type: 'text' },
        { name: 'lastName', label: 'Last Name', type: 'text' },
        // { name: 'employeeId', label: 'Employee ID', type: 'autocomplete' },
        { name: 'dob', label: 'Date of Birth', type: 'date' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'phoneNumber', label: 'Phone Number', type: 'text' },
        {
          name: 'gender', label: 'Gender', type: 'select',
          options: ['male', 'female', 'other']
        },
        { name: 'hireDate', label: 'Hire Date', type: 'date' },
        {
          name: 'department', label: 'Department', type: 'select',
          options: ['HR', 'Finance', 'IT', 'Marketing', 'Operations', 'Sales']
        },
        { name: 'jobTitle', label: 'Job Title', type: 'text' },
        {
          name: 'status', label: 'Status', type: 'select',
          options: ['Active', 'Inactive', 'On Leave', 'Terminated']
        },
        { name: 'salary', label: 'Salary', type: 'number' },
        { name: 'workLocation', label: 'Work Location', type: 'text' },
        { name: 'mainAddress', label: 'Address', type: 'text' },
        { name: 'city', label: 'City', type: 'text' },
        {
          name: 'state', label: 'State', type: 'select',
          options: [
            'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
            'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
            'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
            'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
            'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
            'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
          ]
        },
        { name: 'pincode', label: 'Pincode', type: 'text' },
        { name: 'accountNumber', label: 'Account Number', type: 'text' },
        { name: 'bankName', label: 'Bank Name', type: 'text' },
        { name: 'ifscCode', label: 'IFSC Code', type: 'text' },
        { name: 'emergencyContactName', label: 'Emergency Contact Name', type: 'text' },
        { name: 'emergencyContactPhone', label: 'Emergency Contact Phone', type: 'text' },
        { name: 'emergencyContactRelation', label: 'Relationship', type: 'text' },
        // { name: 'profilePicture', label: 'Profile Picture', type: 'file' },

      ],
      'leaveRequest': [
        // { name: 'employeeId', label: 'Employee Id', type: 'text' },
        {
          name: 'leaveType', label: 'Leave Type', type: 'select',
          options: ['Half Day', 'Full Day']
        },
        { name: "startDate", label: "Start Date", type: 'date' },
        { name: "endDate", label: "End date", type: 'date' },
        { name: "totalDays", label: "Total Days", type: 'number' },
        { name: "reason", label: "Reason", type: 'textarea' },
      ],
      'Holiday': [
        // { name: 'employeeId', label: 'Employee Id', type: 'text' },
        { name: "name", label: "Name", type: 'text' },
        { name: "date", label: "Date", type: 'date' },
        {
          name: "type", label: "Type", type: 'select',
          options: ['Public', 'Festival', 'National', 'Other']
        },
        {
          name: "status", label: "Status", type: 'select',
          options: ['Active', 'Inactive']
        },
        { name: "description", label: "Description", type: 'textarea' },
        { name: "notes", label: "Notes", type: 'textarea' },
      ],
      'Attendance Request': [
        { name: "date", label: "Date", type: 'date' },
        { name: "requestedLogInTime", label: "Log in Time", type: 'time' },
        { name: "requestedLogOutTime", label: "Log Out Time", type: 'time' },
        { name: "reason", label: "Reason", type: 'textarea' },
      ],
      'Complaints and Queries': [
        {
          name: "type", label: "Type", type: 'select',
          options: ['Complaint', 'Query']
        },
        {
          name: "priority", label: "Priority", type: 'select',
          options: ['Low', 'Medium', 'High']
        },
        { name: "subject", label: "Subject", type: 'text' },
        { name: "description", label: "Description", type: 'textarea' },
      ]
    };

    return [...(specificFields[formType] || [])];
  };

  const handleDocumentUpload = (event) => {
    const newFiles = Array.from(event.target.files).map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      isExisting: false
    }));
    setDocuments(prev => [...prev, ...newFiles]);
  };

  // Remove profile picture
  const removeProfilePicture = () => {
    if (profilePicture?.isExisting) {
      setRemovedFiles(prev => [...prev, profilePicture.url]);
    }
    setProfilePicture(null);
    // Reset the file input
    if (profileInputRef.current) {
      profileInputRef.current.value = '';
    }
  };

  // Remove document
  const removeDocument = (docToRemove) => {
    if (docToRemove.isExisting) {
      setRemovedFiles(prev => [...prev, docToRemove.url]);
    }
    setDocuments(prev => prev.filter(doc => doc.url !== docToRemove.url));
    // Reset the file input
    if (documentsInputRef.current) {
      documentsInputRef.current.value = '';
    }
  };

  const handleFileUpload = (event) => {
    // const newFiles = Array.from(event.target.files);
    const newFiles = Array.from(event.target.files).map(file => {
      file.isProfilePicture = false
      return file
    });
    // Prevent duplicate files
    const uniqueNewFiles = newFiles.filter(
      newFile => !uploadedFiles.some(existingFile =>
        existingFile.name === newFile.name ||
        (existingFile.originalName && existingFile.originalName === newFile.name)
      )
    );

    console.log('object')
    // setUploadedFiles([...uploadedFiles, ...uniqueNewFiles]);
    // setUploadedFiles(prev => [...prev, ...uniqueNewFiles.map(file => ({ file, isProfilePicture: false }))]);
    setUploadedFiles(prev => [...prev, ...uniqueNewFiles]);
  };

  // Remove a specific file
  // const removeFile = (fileToRemove) => {
  //   setUploadedFiles(uploadedFiles.filter(file => file !== fileToRemove));
  // };

  // const removeFile = (fileToRemove) => {
  //   console.log('filetoremove', fileToRemove)
  //   if (fileToRemove.isProfilePicture) {
  //     setProfilePreview(null);
  //     // Reset the file input value
  //     if (fileInputRef.current) {
  //       fileInputRef.current.value = '';
  //     }
  //   }
  //   // If the file is an existing document, add it to removedDocuments
  //   if (fileToRemove.originalName) {
  //     setRemovedDocuments([...removedDocuments, fileToRemove.path]);
  //   }

  //   // Remove the file from uploadedFiles
  //   // setUploadedFiles(uploadedFiles.filter(file => file !== fileToRemove));
  //   setUploadedFiles(prev =>
  //     prev.filter(file => file !== fileToRemove)
  //   );
  // };

  // console.log('uploadedFiles', uploadedFiles)


  const flattenObject = (obj, parentKey = '') => {
    let result = {};

    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        const flattened = flattenObject(obj[key], parentKey);
        result = { ...result, ...flattened };
      } else {
        const finalKey = key;
        result[finalKey] = obj[key];
      }
    }
    // console.log('flatten result', result)
    return result;
  };

  // Modified defaultInitialValues logic
  const defaultInitialValues = {
    ...getFormFields(formType).reduce((acc, field) => {
      let fieldValue;

      if (initialValues) {
        // Handle nested objects
        const flattenedValues = flattenObject(initialValues);
        fieldValue = flattenedValues[field.name];

        // Special handling for date fields
        if (field.type === 'date' && fieldValue) {
          // Convert date string to YYYY-MM-DD format
          const date = new Date(fieldValue);
          fieldValue = date.toISOString().split('T')[0];
        }
      }

      // If no value is found or no initialValues provided, set defaults
      if (fieldValue === undefined) {
        switch (field.type) {
          case 'array':
            fieldValue = [];
            break;
          case 'boolean':
            fieldValue = false;
            break;
          case 'number':
            fieldValue = 0;
            break;
          case 'date':
            fieldValue = '';
            break;
          default:
            fieldValue = '';
        }
      }

      acc[field.name] = fieldValue;
      return acc;
    }, {}),
    // documents: initialValues?.documents || [],
    // profilePicture: initialValues?.profilePicture || ''
    ...(formType !== 'Leave Request' && formType !== 'Holiday' && formType !== 'Attendance Request' && formType!=='Complaints and Queries' && {
      documents: initialValues?.documents || [],
      profilePicture: initialValues?.profilePicture || ''
    })
  };


  // const defaultInitialValues = {
  //   ...getFormFields(formType).reduce((acc, field) => {
  //     // Check for the field name and set its value based on its type
  //     if (initialValues && initialValues[field?.name] !== undefined) {
  //       acc[field?.name] = initialValues[field?.name];
  //     } else {
  //       // Check for specific field type and set default accordingly
  //       switch (field?.type) {
  //         case 'array':
  //           acc[field?.name] = []; // default to empty array
  //           break;
  //         case 'boolean':
  //           acc[field?.name] = false; // default to false for boolean fields
  //           break;
  //         case 'number':
  //           acc[field?.name] = 0; // default to 0 for number fields
  //           break;
  //         case 'string':
  //         default:
  //           acc[field?.name] = ''; // default to empty string for strings (or any unknown types)
  //           break;
  //       }
  //     }
  //     return acc;
  //   }, {}),
  //   documents: [] // Add documents to initial values
  // };

  const employeeData = {
    name: "John Doe",
    id: "EMP-08",
    department: "Production",
    totalLeaves: 24,
    balanceLeaves: 15
  };

  // console.log('defaultInitialValues', defaultInitialValues)
  const handleFormSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('valueswaaaa', values)
    // Create a FormData object to send files
    const formData = new FormData();

    // Append all form fields
    // Object.keys(values).forEach(key => {
    //   if (key !== 'documents') {
    //     formData.append(key, values[key]);
    //   }
    // });
    if (formType === 'leaveRequest' || formType === 'Attendance Request') {
      formData.append('employeeId', employeeData.id)
    }
    if (formType === 'Attendance Request' || formType === 'Complaints and Queries') {
      values.employeeId = employeeData.id
    }
    Object.keys(values).forEach(key => {
      if (key !== 'documents' && key !== 'profilePicture') {
        formData.append(key, values[key]);
      }
    });

    // Append profile picture if exists and is new
    if (formType === 'Employees List' && profilePicture) {
      if (!profilePicture.isExisting) {
        formData.append('profilePicture', profilePicture.file);
      } else {
        formData.append('existingProfilePicture', profilePicture.url);
      }
    }

    // Append documents
    // documents.forEach(doc => {
    //   if (!doc.isExisting) {
    //     formData.append('documents', doc.file);
    //   }
    // });

    // Append documents
    documents.forEach(doc => {
      if (!doc.isExisting) {
        formData.append('documents', doc.file);
      } else {
        const existingDocs = formData.get('existingDocuments') || '[]';
        const docsArray = JSON.parse(existingDocs);
        docsArray.push(doc.url);
        formData.set('existingDocuments', JSON.stringify(docsArray));
      }
    });

    // Append removed files
    if (removedFiles.length > 0) {
      formData.append('removedFiles', JSON.stringify(removedFiles));
    }

    // Handle file uploads based on form type
    // if (formType === 'Employees List') {
    //   // Add profile picture first if it exists
    //   console.log('uploadfilesss', uploadedFiles)
    //   const profilePic = uploadedFiles.find(file => file.isProfilePicture);
    //   // console.log('profile picture', profilePic);
    //   if (profilePic) {
    //     formData.append('profilePicture', profilePic);
    //   }

    //   // Add other documents
    //   uploadedFiles
    //     .filter(file => !file.isProfilePicture && !file.originalName)
    //     .forEach(file => {
    //       formData.append('documents', file);
    //     });
    // } else {
    //   // Handle normal document uploads for other form types
    //   uploadedFiles
    //     .filter(file => !file.originalName)
    //     .forEach(file => {
    //       formData.append('documents', file);
    //     });
    // }


    // if (uploadedFiles.length > 0) {
    //   uploadedFiles.forEach((file, index) => {
    //     console.log('filewa', file)
    //     // Only append new files (not existing documents)
    //     if (!file.originalName) {
    //       formData.append(`documents`, file);
    //     }
    //   });
    // }


    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value, typeof value);
    // }

    // Append removed documents 
    // if (removedDocuments.length > 0) {
    //   formData.append('removedDocuments', JSON.stringify(removedDocuments));
    // }

    // Call onSubmit with FormData
    // onSubmit(formData, () => {
    //   setSubmitting(false);
    //   // resetForm();
    //   setUploadedFiles([]); // Clear uploaded files after submission
    //   setRemovedDocuments([]);
    // });
    onSubmit(formType === 'Item List' || formType === 'leaveRequest' || formType === 'Holiday' || formType === 'Attendance Request' || formType==='Complaints and Queries' ? values : formData, () => {
      setSubmitting(false);
      // resetForm();
      setDocuments([]);
      setProfilePicture(null);
      setRemovedFiles([]);



      // setUploadedFiles([]); // Clear uploaded files after submission
      // setRemovedDocuments([]);
      // setProfilePreview(null);

      // Reset file inputs
      if (profileInputRef.current) profileInputRef.current.value = '';
      if (documentsInputRef.current) documentsInputRef.current.value = '';
    });
  }


  // Handle profile picture upload
  const handleProfilePicture = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture({
        file,
        url: URL.createObjectURL(file),
        name: file.name,
        isExisting: false
      });
    }
  };


  useEffect(() => {
    if (initialValues) {
      // Set profile picture if exists
      if (initialValues.profilePicture) {
        console.log('profilepicture useeffect', initialValues.profilePicture)
        setProfilePicture({
          url: initialValues.profilePicture,
          name: 'profile picture',
          isExisting: true
        });
      }

      // Set documents if they exist
      if (initialValues.documents && Array.isArray(initialValues.documents)) {
        const existingDocs = initialValues.documents.map(doc => ({
          url: doc.documentUrl,
          name: doc.documentType,
          isExisting: true
        }));
        setDocuments(existingDocs);
      }
    } else {
      // Reset states when dialog opens for new entry
      setProfilePicture(null);
      setDocuments([]);
      setRemovedFiles([]);
    }
  }, [initialValues, open]);

  useEffect(() => {
    console.log('testststs')
    if (formType === 'Sale&Purchase' || formType === 'Item List' || formType === 'Purchase Return' || formType === 'Sales Return') {
      getAllItems("items")
    }

    // Handle both file objects and file name/path strings
    const existingDocs = initialValues?.documents || [];
    setUploadedFiles(existingDocs.map(doc =>
      typeof doc === 'string' ? { originalName: doc, name: doc } : doc
    ));

    // Reset removed documents when dialog opens
    setRemovedFiles([]);

  }, []);

  console.log('removedFiles', removedFiles)
  console.log('uploadedFiles', uploadedFiles)
  console.log('schema', generateValidationSchema(formType))

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 4,
        }
      }}
    >
      <Paper elevation={3} sx={{ p: 3, }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            pb: 4
          }}
        >
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <CloseButton handleClose={onClose} />
          {/* <IconButton
            onClick={onClose}
            sx={{
              color: 'text.secondary',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'action.hover',
                transform: 'rotate(90deg)',
              }
            }}
          >
            <CloseIcon />
          </IconButton> */}
        </Box>
        <Formik
          initialValues={defaultInitialValues}
          validationSchema={generateValidationSchema(formType)}
          onSubmit={handleFormSubmit}
        >
          {({ values, errors, touched, isSubmitting, setFieldValue }) => (
            <Form>
              <Grid container spacing={2}>
                {getFormFields(formType).map((field) => (
                  <Grid size={{ xs: 12, sm: field.type === 'textarea' ? 12 : 6 }} key={field.name}>
                    {field.type === 'autocomplete' ? (
                      <AutoCompleteField
                        formType={formType}
                        items={items}
                        initialValues={initialValues}
                        field={field}
                        setFieldValue={setFieldValue}
                        touched={touched}
                        errors={errors}
                      />
                      // field.name === 'name' ? (
                      //   // Existing name autocomplete component
                      //   <Autocomplete
                      //     freeSolo
                      //     value={initialValues?.name || ''}
                      //     options={filteredItems.length > 0 ? filteredItems.map(item => item.name) : items.map(item => item.name)}
                      //     onInputChange={handleItemNameFilter}
                      //     onChange={(event, newValue) => {
                      //       setFieldValue('name', newValue || event.target.value);
                      //       const selectedItem = items.find(item => item.name === newValue);
                      //       if (selectedItem) {
                      //         setFieldValue('category', selectedItem.category);
                      //         setFieldValue('inventoryType', selectedItem.inventoryType);
                      //         setFieldValue('unit', selectedItem.unit);
                      //       }
                      //     }}
                      //     renderInput={(params) => (
                      //       <TextField
                      //         {...params}
                      //         label={field.label}
                      //         variant="outlined"
                      //         onBlur={(e) => {
                      //           setFieldValue('name', e.target.value);
                      //         }}
                      //         error={touched[field.name] && Boolean(errors[field.name])}
                      //         helperText={touched[field.name] && errors[field.name]}
                      //       />
                      //     )}
                      //   />

                      // ) : field.name === 'invoiceNo' ? (
                      //   // New invoice number autocomplete component
                      //   <Autocomplete
                      //     freeSolo
                      //     value={initialValues.invoiceNo || ''}
                      //     options={filteredTransactions?.length > 0 ? filteredTransactions?.map(entry => entry.invoiceNo) : transactions?.map(entry => entry.invoiceNo)}
                      //     onInputChange={handleInvoiceFilter}
                      //     // onChange={(event, newValue) => {
                      //     //   setFieldValue('invoiceNo', newValue || event.target.value);
                      //     // }}
                      //     onChange={(event, newValue) => {
                      //       setFieldValue('invoiceNo', newValue || event.target.value);
                      //       const selectedEntry = transactions.find(entry => entry.invoiceNo === newValue && entry.name === values.name);
                      //       if (selectedEntry) {
                      //         setFieldValue('unitPrice', selectedEntry.unitPrice);
                      //         setFieldValue('quantity', selectedEntry.quantity);
                      //         setFieldValue('unit', selectedEntry.unit);
                      //         setFieldValue('clientVendor', selectedEntry.clientVendor);
                      //       }
                      //     }}
                      //     renderInput={(params) => (
                      //       <TextField
                      //         {...params}
                      //         label={field.label}
                      //         variant="outlined"
                      //         onBlur={(e) => {
                      //           setFieldValue('invoiceNo', e.target.value);
                      //         }}
                      //         error={touched[field.name] && Boolean(errors[field.name])}
                      //         helperText={touched[field.name] && errors[field.name]}
                      //       />
                      //     )}
                      //   />

                      // )  : null
                    ) : field.type === 'select' ? (
                      <Field
                        as={TextField}
                        select
                        fullWidth
                        name={field.name}
                        label={field.label}
                        disabled={initialValues && (field.name === 'gstRate' || field.name === 'unit')}
                        variant="outlined"
                        error={touched[field.name] && Boolean(errors[field.name])}
                        helperText={touched[field.name] && errors[field.name]}
                        onChange={(e) => {
                          setFieldValue(field.name, e.target.value);

                          if (formType === 'Sale&Purchase' && field.name === 'name') {
                            const selectedItem = items?.find(item => item.name === e.target.value);
                            if (selectedItem) {
                              setFieldValue('category', selectedItem.category);
                              setFieldValue('unit', selectedItem.unit);
                            }
                          }
                        }}
                      >
                        {field.options?.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Field>
                    ) : (
                      <Field
                        as={TextField}
                        fullWidth
                        name={field.name}
                        disabled={initialValues && field.name === 'hsnCode' || field.name === 'totalDays'}
                        label={field.label}
                        type={field.type}
                        variant="outlined"
                        multiline={field.type === 'textarea'}
                        rows='4'
                        error={touched[field.name] && Boolean(errors[field.name])}
                        helperText={touched[field.name] && errors[field.name]}
                        InputLabelProps={field.type === 'date' ? { shrink: true } : {}}
                        InputProps={formType === 'leaveRequest' && field.type === 'date' ? {
                          inputProps: {
                            min: new Date().toISOString().split('T')[0] // Get the current date in YYYY-MM-DD format
                          }
                        } : {}}
                        onChange={(e) => {
                          setFieldValue(field.name, e.target.value);
                          if (field.name === 'endDate' && values.startDate) {
                            const totalDays = calculateTotalDays(values.startDate, e.target.value);
                            setFieldValue('totalDays', totalDays)
                            console.log('totalDays', totalDays)
                          }
                        }}
                      />

                    )}
                  </Grid>
                ))}

                {/* Profile Picture Upload Section for Employees List */}
                {/* Profile Picture Section for Employees List */}
                {formType === 'Employees List' && (
                  <Grid size={{ xs: 12 }} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      {profilePicture ? (
                        <Box sx={{ position: 'relative', width: 150, height: 150 }}>
                          <img
                            src={profilePicture.url}
                            alt="Profile"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: '50%'
                            }}
                          />
                          <IconButton
                            onClick={removeProfilePicture}
                            sx={{
                              position: 'absolute',
                              top: -10,
                              right: -10,
                              backgroundColor: 'error.main',
                              color: 'white',
                              '&:hover': { backgroundColor: 'error.dark' }
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      ) : (
                        <PersonIcon sx={{ width: 100, height: 100, color: 'grey.500' }} />

                      )}

                      <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload Profile Picture
                        <VisuallyHiddenInput
                          ref={profileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleProfilePicture}
                        />
                      </Button>
                    </Box>
                  </Grid>
                )}

                {/* File Upload Section for specific form types */}
                {['Sale&Purchase', 'Purchase Return', 'Sales Return', "Employees List"].includes(formType) && (
                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        color="secondary"
                      >
                        Upload Documents
                        <VisuallyHiddenInput
                          ref={documentsInputRef}
                          type="file"
                          multiple
                          onChange={handleDocumentUpload}
                        />
                      </Button>

                      {/* Uploaded Files List */}
                      {documents.filter(file => !file.isProfilePicture).length > 0 && (
                        <Box sx={{
                          border: '1px dashed grey',
                          borderRadius: 2,
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 1
                        }}>
                          <Typography variant="subtitle2">
                            Uploaded Files:
                          </Typography>
                          {documents.filter(file => !file.isProfilePicture).map((file, index) => (
                            <Box
                              key={index}
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                bgcolor: 'action.hover',
                                p: 1,
                                borderRadius: 1
                              }}
                            >
                              <Typography variant="body2">
                                {file.name || file.originalName}
                              </Typography>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => removeDocument(file)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          ))}
                        </Box>
                      )}

                    </Box>
                  </Grid>
                )}

                {/* <Grid size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    // disabled={isSubmitting}
                    fullWidth
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </Grid> */}
                <SubmitButton title='Submit' isSubmitting={isSubmitting} style={{width:'100%'}} />
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Dialog>
  );
};

export default FormDialog;