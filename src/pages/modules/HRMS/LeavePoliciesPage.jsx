import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const LeavePoliciesPage = () => {
  // State for leave policies
  const [policies, setPolicies] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [policyForm, setPolicyForm] = useState({ name: '', type: '', description: '' });

  // Handle Open/Close Dialog
  const handleOpenDialog = (policy = null) => {
    setSelectedPolicy(policy);
    setPolicyForm(policy || { name: '', type: '', description: '' });
    setEditMode(!!policy);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle Form Change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setPolicyForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle Add/Edit Policy
  const handleSavePolicy = () => {
    if (editMode) {
      // Edit Policy
      setPolicies((prevPolicies) =>
        prevPolicies.map((policy) =>
          policy.id === selectedPolicy.id ? { ...policy, ...policyForm } : policy
        )
      );
    } else {
      // Add New Policy
      setPolicies([
        ...policies,
        { id: Date.now(), ...policyForm }, // Add a unique ID (e.g., timestamp) for each policy
      ]);
    }
    handleCloseDialog();
  };

  // Handle Delete Policy
  const handleDeletePolicy = (id) => {
    setPolicies(policies.filter((policy) => policy.id !== id));
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => handleOpenDialog()}
        sx={{ marginBottom: 2 }}
      >
        Add Leave Policy
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="leave policies table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {policies.map((policy) => (
              <TableRow key={policy.id}>
                <TableCell>{policy.name}</TableCell>
                <TableCell>{policy.type}</TableCell>
                <TableCell>{policy.description}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleOpenDialog(policy)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeletePolicy(policy.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add/Edit Policy */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? 'Edit Leave Policy' : 'Add Leave Policy'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Policy Name"
            name="name"
            value={policyForm.name}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Policy Type"
            name="type"
            value={policyForm.type}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={policyForm.description}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSavePolicy} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LeavePoliciesPage;
