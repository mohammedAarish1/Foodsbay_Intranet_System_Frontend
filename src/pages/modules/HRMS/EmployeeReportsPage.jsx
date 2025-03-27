import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Typography,
  Container,
  Paper,
  MenuItem,
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  useMediaQuery
} from '@mui/material';
import {
  CloudDownload,
  Description,
  CalendarMonth,
  Person,
  BusinessCenter
} from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import PageTitle from '../../../components/common/PageTitle';
import { getEmployeeList } from '../../../features/hrms/hrmsAPI';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


// Mock data - would be replaced with actual API calls
// const EMPLOYEES = [
//   { id: 'EMP001', name: 'John Doe', department: 'Engineering' },
//   { id: 'EMP002', name: 'Jane Smith', department: 'Human Resources' },
//   { id: 'EMP003', name: 'Michael Johnson', department: 'Finance' },
//   { id: 'EMP004', name: 'Emily Davis', department: 'Marketing' },
// ];


// Function to generate and download reports
export const generateAndDownloadReport = async (reportData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/hrms/generate-report`, reportData, {
      responseType: 'blob', // Important for downloading files
    });
    
    // Create a blob from the response data
    const blob = new Blob([response.data], { type: 'application/pdf' });
    
    // Create a link element to trigger the download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${reportData.reportType}_report_${reportData.employeeId}.pdf`);
    document.body.appendChild(link);
    
    // Trigger the download
    link.click();
    
    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
    
    return { success: true };
  } catch (error) {
    console.error('Error downloading report:', error);
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to download report' 
    };
  }
};


const REPORT_CATEGORIES = [
  { id: 'attendance', name: 'Attendance Report' },
  { id: 'performance', name: 'Performance Evaluation' },
  { id: 'timesheet', name: 'Timesheet Report' },
  { id: 'leave', name: 'Leave Report' },
  { id: 'salary', name: 'Salary Summary' },
];

const EmployeeReportsPage = () => {


  const dispatch = useDispatch();
  const { employeesList } = useSelector(state => state.hrms.data);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme => theme.breakpoints.between('sm', 'md'));

  // Validation schema using Yup
  const validationSchema = Yup.object({
    employeeId: Yup.string().required('Employee ID is required'),
    startDate: Yup.date()
      .required('Start date is required')
      .nullable(),
    endDate: Yup.date()
      .required('End date is required')
      .min(Yup.ref('startDate'), 'End date must be after start date')
      .nullable(),
    reportType: Yup.string().required('Report category is required'),
  });


// Replace your existing handleDownloadReport function with this:
const handleDownloadReport = async (values, { setSubmitting }) => {
  setLoading(true);
  
  try {
    const reportData = {
      employeeId: values.employeeId,
      startDate: values.startDate,
      endDate: values.endDate,
      reportType: values.reportType
    };
    console.log('reportData',reportData)
    const result = await generateAndDownloadReport(reportData);
    
    if (result.success) {
      setSuccessMessage(true);
    } else {
      // Handle error scenario
      console.error('Failed to generate report:', result.error);
      // You could add a state for error message and display it to the user
    }
  } catch (error) {
    console.error('Error in download process:', error);
  } finally {
    setLoading(false);
    setSubmitting(false);
  }
};


  // Handle closing the success message
  const handleCloseMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessMessage(false);
  };

  useEffect(() => {
    dispatch(getEmployeeList('employees'));
  }, []);

  return (
    <Box maxWidth="lg" sx={{ my: 4 }}>
      <Paper
        // elevation={3}
        sx={{
          p: isMobile ? 2 : 4,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', mb: 2 }}>
          <PageTitle title='Employee Reports' />
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Formik
          initialValues={{
            employeeId: '',
            employeeName: '',
            employeeDepartment: '',
            startDate: '',
            endDate: '',
            reportType: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleDownloadReport}
        >
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isValid, dirty }) => {
            // Update employee details when an employee is selected
            const handleEmployeeChange = (event) => {
              const employeeId = event.target.value;
              handleChange(event);

              const selectedEmployee = employeesList.find(emp => emp.employeeId === employeeId);
              if (selectedEmployee) {
                setFieldValue('employeeName', selectedEmployee.basicInfo.firstName + ' ' + selectedEmployee.basicInfo.lastName);
                setFieldValue('employeeDepartment', selectedEmployee.workDetails.department);
              }
            };

            return (
              <Form>
                <Grid container spacing={3}>
                  {/* Employee Selection */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography variant="h6" component="h2" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                          <Person sx={{ mr: 1 }} /> Employee Details
                        </Typography>

                        <TextField
                          fullWidth
                          id="employeeId"
                          name="employeeId"
                          label="Select Employee"
                          select
                          margin="normal"
                          value={values.employeeId}
                          onChange={handleEmployeeChange}
                          onBlur={handleBlur}
                          error={touched.employeeId && Boolean(errors.employeeId)}
                          helperText={touched.employeeId && errors.employeeId}
                        >
                          {employeesList.map((employee) => (
                            <MenuItem key={employee.employeeId} value={employee.employeeId}>
                              {employee.employeeId}
                            </MenuItem>
                          ))}
                        </TextField>

                        {values.employeeId && (
                          <Box sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                              <Grid size={{ xs: 12 }}>
                                <TextField
                                  fullWidth
                                  id="employeeName"
                                  name="employeeName"
                                  label="Employee Name"
                                  value={values.employeeName}
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                  variant="filled"
                                />
                              </Grid>
                              <Grid size={{ xs: 12 }}>
                                <TextField
                                  fullWidth
                                  id="employeeDepartment"
                                  name="employeeDepartment"
                                  label="Department"
                                  value={values.employeeDepartment}
                                  InputProps={{
                                    readOnly: true,
                                    startAdornment: <BusinessCenter sx={{ mr: 1, color: 'text.secondary' }} />,
                                  }}
                                  variant="filled"
                                />
                              </Grid>
                            </Grid>
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Report Configuration */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography variant="h6" component="h2" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                          <CalendarMonth sx={{ mr: 1 }} /> Report Configuration
                        </Typography>

                        <Grid container spacing={2}>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                              fullWidth
                              id="startDate"
                              name="startDate"
                              label="Start Date"
                              type="date"
                              margin="normal"
                              value={values.startDate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.startDate && Boolean(errors.startDate)}
                              helperText={touched.startDate && errors.startDate}
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                              fullWidth
                              id="endDate"
                              name="endDate"
                              label="End Date"
                              type="date"
                              margin="normal"
                              value={values.endDate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.endDate && Boolean(errors.endDate)}
                              helperText={touched.endDate && errors.endDate}
                              InputLabelProps={{ shrink: true }}
                              inputProps={{ min: values.startDate }}
                            />
                          </Grid>
                        </Grid>

                        <TextField
                          fullWidth
                          id="reportType"
                          name="reportType"
                          label="Report Category"
                          select
                          margin="normal"
                          value={values.reportType}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.reportType && Boolean(errors.reportType)}
                          helperText={touched.reportType && errors.reportType}
                        >
                          {REPORT_CATEGORIES.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                              {category.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Download Button */}
                  <Grid size={{ xs: 12 }} sx={{ mt: 2, textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      type="submit"
                      disabled={loading || !(isValid && dirty)}
                      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CloudDownload />}
                      sx={{
                        borderRadius: 2,
                        py: 1.5,
                        px: 4,
                        backgroundColor: '#1976d2',
                        '&:hover': {
                          backgroundColor: '#1565c0',
                        },
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease-in-out',
                      }}
                    >
                      {loading ? 'Downloading...' : 'Download Report'}
                    </Button>

                    <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                      Reports will be downloaded in PDF format
                    </Typography>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Paper>

      {/* Success message */}
      <Snackbar
        open={successMessage}
        autoHideDuration={6000}
        onClose={handleCloseMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseMessage} severity="success" sx={{ width: '100%' }}>
          Report downloaded successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EmployeeReportsPage;