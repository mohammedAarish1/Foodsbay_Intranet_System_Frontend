import React from 'react';
import Grid from '@mui/material/Grid2';
import {
  InventoryIcon,
  CategoryIcon,
  SpeedIcon,
  UpdateIcon,
  BusinessIcon,
  DocumentIcon,
  AttachMoneyIcon,
  InfoOutlinedIcon,
  LocalShippingIcon,
  CloseIcon,
  ReceiptIcon,
  CalendarTodayIcon,
  ShoppingCartIcon,
  EventIcon,
  AccessTimeIcon,
  PersonIcon,
  EditIcon,
  AccountBoxIcon,
  CakeIcon,
  EmailIcon,
  PhoneIcon,
  AccessibilityIcon,
  LocationOnIcon,
  PhotoCameraIcon,
  WorkIcon
} from '../../../assets/icons/icon.js';
import {
  Box,
  Paper,
  IconButton,
  Typography,
  useTheme,
  Dialog,
  DialogContent,
  Divider,
  Container,
  alpha,
  Chip,
  Card,
  CardContent,
  Avatar
} from '../../MUI';
import { getNestedValue } from '../../../helper/commonUtils.js';
import CloseButton from '../../Buttons/CloseButton.jsx';


// Configuration for different sections
const SECTION_CONFIGURATIONS = {
  'Item List': [
    {
      key: 'name',
      icon: <InventoryIcon color="primary" />,
      label: 'Item Name'
    },
    {
      key: 'category',
      icon: <CategoryIcon color="secondary" />,
      label: 'Category'
    },
    {
      key: 'inventoryType',
      icon: <SpeedIcon color="success" />,
      label: 'Inventory Type'
    },
    {
      key: 'stockInHand',
      icon: <LocalShippingIcon color="primary" />,
      label: 'Stock In Hand'
    },
    {
      key: 'unit',
      icon: <LocalShippingIcon color="primary" />,
      label: 'Unit'
    },
    {
      key: 'minStock',
      icon: <LocalShippingIcon color="secondary" />,
      label: 'Minimum Stock'
    },
    {
      key: 'status',
      icon: <UpdateIcon color="success" />,
      label: 'Status'
    },
    // {
    //   key: 'vendorName',
    //   icon: <Business color="primary" />,
    //   label: 'Vendor Name'
    // },
    {
      key: 'hsnCode',
      icon: <DocumentIcon color="secondary" />,
      label: 'HSN Code'
    },
    {
      key: 'hsnDesc',
      icon: <DocumentIcon color="secondary" />,
      label: 'HSN Desc'
    },
    {
      key: 'gstRate',
      icon: <AttachMoneyIcon color="success" />,
      label: 'GST Rate'
    },
    {
      key: 'createdAt',
      icon: <EventIcon color="success" />,
      label: 'Created On'
    },
    {
      key: 'createdBy',
      icon: <PersonIcon color="success" />,
      label: 'Created By'
    },
    {
      key: 'updatedAt',
      icon: <AccessTimeIcon color="success" />,
      label: 'Last Updated On'
    },
    {
      key: 'updatedBy',
      icon: <EditIcon color="success" />,
      label: 'Updated By'
    }
  ],
  // 'Sale&Purchase': [
  //   {
  //     key: 'name',
  //     icon: <ShoppingCart color="primary" />,
  //     label: 'Name'
  //   },
  //   // {
  //   //   key: 'category',
  //   //   icon: <Category color="secondary" />,
  //   //   label: 'Category'
  //   // },
  //   {
  //     key: 'invoiceNo',
  //     icon: <Receipt color="success" />,
  //     label: 'Invoice No.'
  //   },
  //   {
  //     key: 'amount',
  //     icon: <AttachMoney color="primary" />,
  //     label: 'Amount'
  //   },
  //   {
  //     key: 'quantity',
  //     icon: <LocalShipping color="secondary" />,
  //     label: 'Quantity'
  //   },
  //   {
  //     key: 'unit',
  //     icon: <LocalShipping color="secondary" />,
  //     label: 'Unit'
  //   },
  //   {
  //     key: 'clientVendor',
  //     icon: <Business color="success" />,
  //     label: 'Client/Vendor'
  //   },
  //   {
  //     key: 'biltyNumber',
  //     icon: <Description color="primary" />,
  //     label: 'Bilty Number'
  //   },
  //   {
  //     key: 'createdAt',
  //     icon: <CalendarToday color="secondary" />,
  //     label: 'Date'
  //   },
  //   {
  //     key: 'remarks',
  //     icon: <Description color="primary" />,
  //     label: 'Remarks'
  //   }
  // ],
  'Sale&Purchase': [
    {
      key: 'name',
      icon: <ShoppingCartIcon color="primary" />,
      label: 'Name'
    },
    {
      key: 'invoiceNo',
      icon: <ReceiptIcon color="success" />,
      label: 'Invoice No.'
    },
    {
      key: 'unitPrice',
      icon: <AttachMoneyIcon color="primary" />,
      label: 'Unit Price'
    },
    {
      key: 'taxableAmount',
      icon: <AttachMoneyIcon color="primary" />,
      label: 'Amount Before tax'
    },
    {
      key: 'taxAmount',
      icon: <AttachMoneyIcon color="primary" />,
      label: 'GST Amount'
    },
    {
      key: 'totalAmount',
      icon: <AttachMoneyIcon color="primary" />,
      label: 'Total Amount'
    },
    {
      key: 'quantity',
      icon: <LocalShippingIcon color="primary" />,
      label: 'Quantity'
    },
    {
      key: 'unit',
      icon: <LocalShippingIcon color="secondary" />,
      label: 'Unit'
    },
    {
      key: 'clientVendor',
      icon: <BusinessIcon color="success" />,
      label: 'Client/Vendor'
    },
    {
      key: 'biltyNumber',
      icon: <DocumentIcon color="primary" />,
      label: 'Bilty Number'
    },
    {
      key: 'createdAt',
      icon: <EventIcon color="success" />,
      label: 'Created On'
    },
    {
      key: 'createdBy',
      icon: <PersonIcon color="success" />,
      label: 'Created By'
    },
    {
      key: 'updatedAt',
      icon: <AccessTimeIcon color="success" />,
      label: 'Last Updated On'
    },
    {
      key: 'updatedBy',
      icon: <EditIcon color="success" />,
      label: 'Updated By'
    },
    {
      key: 'remarks',
      icon: <CalendarTodayIcon color="secondary" />,
      label: 'Remarks'
    }
  ],
  'Sales Return': [
    {
      key: 'name',
      icon: <ShoppingCartIcon color="primary" />,
      label: 'Name'
    },
    {
      key: 'creditNoteNo',
      icon: <ReceiptIcon color="success" />,
      label: 'Debit Note No.'
    },
    {
      key: 'quantity',
      icon: <LocalShippingIcon color="primary" />,
      label: 'Quantity'
    },
    {
      key: 'unit',
      icon: <LocalShippingIcon color="secondary" />,
      label: 'Unit'
    },
    {
      key: 'clientVendor',
      icon: <BusinessIcon color="success" />,
      label: 'Client/Vendor'
    },
    {
      key: 'condition',
      icon: <CategoryIcon color="primary" />,
      label: 'Product Condition'
    },
    {
      key: 'createdAt',
      icon: <EventIcon color="success" />,
      label: 'Created On'
    },
    {
      key: 'createdBy',
      icon: <PersonIcon color="success" />,
      label: 'Created By'
    },
    {
      key: 'updatedAt',
      icon: <AccessTimeIcon color="success" />,
      label: 'Last Updated On'
    },
    {
      key: 'updatedBy',
      icon: <EditIcon color="success" />,
      label: 'Updated By'
    }
  ],
  'Purchase Return': [
    {
      key: 'name',
      icon: <ShoppingCartIcon color="primary" />,
      label: 'Name'
    },
    {
      key: 'debitNoteNo',
      icon: <ReceiptIcon color="success" />,
      label: 'Debit Note No.'
    },
    {
      key: 'quantity',
      icon: <LocalShippingIcon color="primary" />,
      label: 'Quantity'
    },
    {
      key: 'unit',
      icon: <LocalShippingIcon color="secondary" />,
      label: 'Unit'
    },
    {
      key: 'clientVendor',
      icon: <BusinessIcon color="success" />,
      label: 'Client/Vendor'
    },
    {
      key: 'createdAt',
      icon: <EventIcon color="success" />,
      label: 'Created On'
    },
    {
      key: 'createdBy',
      icon: <PersonIcon color="success" />,
      label: 'Created By'
    },
    {
      key: 'updatedAt',
      icon: <AccessTimeIcon color="success" />,
      label: 'Last Updated On'
    },
    {
      key: 'updatedBy',
      icon: <EditIcon color="success" />,
      label: 'Updated By'
    }
  ],
  'Employees List': [
    {
      key: 'employeeId',
      icon: <AccountBoxIcon color="secondary" />,
      label: 'Employee ID'
    },
    {
      key: 'basicInfo.firstName',
      icon: <PersonIcon color="primary" />,
      label: 'First Name'
    },
    {
      key: 'basicInfo.lastName',
      icon: <PersonIcon color="primary" />,
      label: 'Last Name'
    },
    {
      key: 'basicInfo.dob',
      icon: <CakeIcon color="success" />,
      label: 'Date of Birth'
    },
    {
      key: 'basicInfo.email',
      icon: <EmailIcon color="primary" />,
      label: 'Email'
    },
    {
      key: 'basicInfo.phoneNumber',
      icon: <PhoneIcon color="secondary" />,
      label: 'Phone Number'
    },
    {
      key: 'basicInfo.gender',
      icon: <AccessibilityIcon color="success" />,
      label: 'Gender'
    },
    {
      key: 'workDetails.hireDate',
      icon: <EventIcon color="primary" />,
      label: 'Hire Date'
    },
    {
      key: 'workDetails.department',
      icon: <BusinessIcon color="secondary" />,
      label: 'Department'
    },
    {
      key: 'workDetails.jobTitle',
      icon: <WorkIcon color="success" />,
      label: 'Job Title'
    },
    {
      key: 'workDetails.salary',
      icon: <AttachMoneyIcon color="primary" />,
      label: 'Salary'
    },
    {
      key: 'workDetails.workLocation',
      icon: <LocationOnIcon color="secondary" />,
      label: 'Work Location'
    },
    {
      key: 'createdAt',
      icon: <EventIcon color="success" />,
      label: 'Created On'
    },
    {
      key: 'createdBy',
      icon: <PersonIcon color="success" />,
      label: 'Created By'
    },
    {
      key: 'updatedAt',
      icon: <AccessTimeIcon color="success" />,
      label: 'Last Updated On'
    },
    {
      key: 'updatedBy',
      icon: <EditIcon color="success" />,
      label: 'Updated By'
    }
    // {
    //   key: 'profilePicture',
    //   icon: <PhotoCameraIcon color="primary" />,
    //   label: 'Profile Picture'
    // }
  ]
};

const ItemDetailsModal = ({
  open,
  onClose,
  item,
  section = 'Item List'
}) => {
  const theme = useTheme();

  if (!item) return null;

  // Get configuration for the specific section
  const sectionConfig = SECTION_CONFIGURATIONS[section] || SECTION_CONFIGURATIONS['Item List'];
  console.log('sectionConfig', sectionConfig)
  // Generate details based on section configuration
  const details = sectionConfig.map(config => ({
    icon: config.icon,
    label: config.label,
    // value: item[config.key.replace(/\s+/g, '').toLowerCase()] !== undefined
    //   ? item[config.key.replace(/\s+/g, '').toLowerCase()]
    //   : 'N/A',
    value: config.key.includes('.') ? getNestedValue(item, config.key) : item[config.key]
  }));


  console.log('details', details)
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 4,
          background: theme.palette.mode === 'dark'
            ? alpha(theme.palette.background.default, 0.95)
            : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }
      }}
    >
      {/* Modal Header */}
      <Box
        sx={{
          position: 'relative',
          p: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: theme.palette.mode === 'dark'
            ? alpha(theme.palette.background.paper, 0.5)
            : 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <Box sx={{ px: 3 }}>
          {section === 'Employees list' && (
            <>
              <Typography
                variant="h5"
                fontWeight="bold"
                color="primary"
                sx={{
                  textShadow: theme.palette.mode === 'dark'
                    ? '0 0 5px rgba(255,255,255,0.3)'
                    : 'none'
                }}
              >
                {item.name || `${section} Details`}
              </Typography>

              <Chip
                label={item.status}
                color={
                  item.status === 'In Stock' ? 'success' :
                    item.status === 'Low Stock' ? 'warning' :
                      'default'
                }
                sx={{
                  mt: 1,
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 0 5px rgba(255,255,255,0.2)'
                    : 'none'
                }}
              />
              <Grid>
                <Avatar alt={item.basicInfo.firstName} src={item.profilePicture} sx={{ width: 150, height: 150 }} />
              </Grid>
            </>



          )}

        </Box>

        <CloseButton handleClose={onClose} />
      </Box>

      {/* Modal Content */}
      <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Container maxWidth="md">
          <Grid container spacing={3}>
            {/* Details Section */}
            <Grid xs={12}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: '100%',
                  // '&:hover': {
                  //     transform: 'scale(1.02)',
                  //     boxShadow: theme.shadows[4]
                  // }
                }}
              >
                <Grid container spacing={6}>
                  {details.map((detail, index) => (
                    <Grid xs={12} sm={4} key={index}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2
                        }}
                      >
                        {detail.icon}
                        <Box>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            {detail.label}
                          </Typography>
                          <Typography
                            variant="body1"
                            fontWeight="medium"
                            color="text.primary"
                          >
                            {detail.value}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>

            {/* Additional Information Section */}
            <Grid xs={12} sx={{ width: '100%' }}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                <InfoOutlinedIcon color="primary" />
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Details for {section} section. Verify with the respective department for the most up-to-date information.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDetailsModal;