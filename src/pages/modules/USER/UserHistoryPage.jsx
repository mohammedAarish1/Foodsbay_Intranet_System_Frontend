import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Select, MenuItem, InputLabel, FormControl, Button, TextField } from '@mui/material';

const UserHistoryPage = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [filter, setFilter] = useState({ status: '', leaveType: '', startDate: '', endDate: '' });
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    // Fetch leave data from the backend API
    fetchLeaveHistory();
  }, [filter, page]);

  const fetchLeaveHistory = () => {
    // Example: Replace with actual API call to get leave history with filters
    const filteredData = []; // fetched filtered data
    setLeaveData(filteredData);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleFilterChange = (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <h1>Leave History</h1>
      <div style={{ marginBottom: '20px' }}>
        <FormControl>
          <InputLabel>Status</InputLabel>
          <Select name="status" value={filter.status} onChange={handleFilterChange}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Leave Type</InputLabel>
          <Select name="leaveType" value={filter.leaveType} onChange={handleFilterChange}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="sick">Sick</MenuItem>
            <MenuItem value="vacation">Vacation</MenuItem>
            {/* Add more leave types */}
          </Select>
        </FormControl>

        <TextField
          type="date"
          label="Start Date"
          name="startDate"
          value={filter.startDate}
          onChange={handleFilterChange}
        />
        <TextField
          type="date"
          label="End Date"
          name="endDate"
          value={filter.endDate}
          onChange={handleFilterChange}
        />

        <Button variant="contained" onClick={fetchLeaveHistory}>Search</Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Leave Type</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Total Days</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaveData.map((leave) => (
              <TableRow key={leave._id}>
                <TableCell>{leave.leaveType}</TableCell>
                <TableCell>{new Date(leave.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(leave.endDate).toLocaleDateString()}</TableCell>
                <TableCell>{leave.totalDays}</TableCell>
                <TableCell>{leave.status === 'approved' ? 'Approved' : 'Rejected'}</TableCell>
                <TableCell>
                  <Button onClick={() => viewLeaveDetails(leave)}>View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(leaveData.length / rowsPerPage)}
        page={page}
        onChange={handlePageChange}
        style={{ marginTop: '20px' }}
      />
    </div>
  );
};



export default UserHistoryPage
