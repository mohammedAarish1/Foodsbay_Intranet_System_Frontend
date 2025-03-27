import React from 'react';
import { Modal, Box, Typography, IconButton, Button, TextField, MenuItem, Select, FormControl, InputLabel, useTheme } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import SubmitButton from '../../Buttons/SubmitButton';
import CloseButton from '../../Buttons/CloseButton';

const getListOptions = (type) => {
  const options = {
    'Leave Status': [
      {
        label: 'Pending',
        value: 'pending',
      },
      {
        label: 'Approved',
        value: 'approved',
      },
      {
        label: 'Rejected',
        value: 'rejected',
      },
    ],
    'Verify Attendance': [
      {
        label: 'Approved',
        value: 'approved',
      },
      {
        label: 'Rejected',
        value: 'rejected'
      }
    ],
    'Complaints and Queries': [
      {
        label: 'Open',
        value: 'Open',
      },
      {
        label: 'In Progress',
        value: 'In Progress'
      },
      {
        label: 'Resolved',
        value: 'Resolved'
      }
    ]
  }

  return (options[type] || [])
}


// Validation schema with Yup
const validationSchema = Yup.object({
  status: Yup.string().required('Status is required'),
  comment: Yup.string().optional(),
});

const UpdateStatusModal = ({ type, open, onClose, currentStatus, onUpdate }) => {
  const theme = useTheme();
console.log('type', type)
  // Handle form submission
  const handleSubmit = (values) => {
    onUpdate(values);
    onClose();
  };


  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: { xs: '80%', sm: '50%', md: '40%' },  // Responsive width
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: 24,
          padding: 4,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            textAlign: 'end',
          }}
        >
          <CloseButton handleClose={onClose} />
        </Box>
        <Typography
          variant="h6"
          component="h2"
          id="modal-title"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 2,
            color: theme.palette.text.primary,
          }}
        >
          {type}
        </Typography>

        <Formik
          initialValues={{
            status: currentStatus, // Default status if not passed
            comment: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, errors, touched, setFieldValue }) => (
            <Form>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel id="status-label" sx={{ color: theme.palette.text.primary }}>
                  Status
                </InputLabel>
                <Select
                  labelId="status-label"
                  id="status-select"
                  value={values.status}
                  label="Status"
                  onChange={(e) => setFieldValue('status', e.target.value)}
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                  }}
                >
                  {getListOptions(type).map(({ value, label }) => (
                    <MenuItem value={value}>{label}</MenuItem>
                  ))}
                </Select>
                {touched.status && errors.status && (
                  <Typography color="error" variant="caption">
                    {errors.status}
                  </Typography>
                )}
              </FormControl>

              {type === 'Leave Status' || type==='Complaints and Queries' && (
                <Field
                  as={TextField}
                  label="Leave Comment (Optional)"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  name="comment"
                  value={values.comment}
                  onChange={handleChange}
                  sx={{
                    marginBottom: 2,
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                  }}
                  helperText={touched.comment && errors.comment}
                  error={touched.comment && Boolean(errors.comment)}
                />
              )}

              <SubmitButton title='Update' />
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default UpdateStatusModal;
