// components/ItemDetailsPopup.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid2';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent,
  IconButton,
  Typography,
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  useTheme,
  useMediaQuery,
  Chip,
  CircularProgress,
  Alert,
} from '../../MUI';
import { 
   CloseIcon,
   SearchIcon,
   DownloadIcon,
} from '../../../assets/icons/icon.js';
import { DatePicker } from '@mui/x-date-pickers';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import * as XLSX from 'xlsx';
import { getItemHistory } from '../../../features/ims/itemAPI';

const ItemHistory = ({ open, handleClose, itemId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const dispatch = useDispatch();
  const { 
    itemDetails, 
    transactions, 
    summary, 
    loading, 
    error 
  } = useSelector((state) => state.item.historyData);

  const [tabValue, setTabValue] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(isMobile ? 5 : 10);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    if (open && itemId) {
      dispatch(getItemHistory(itemId));
    }
    return () => {
      // dispatch(clearItemTransactions());
    };
  }, [open, itemId, dispatch]);

  useEffect(() => {
    if (transactions) {
      filterTransactions(tabValue, searchQuery, startDate, endDate);
    }
  }, [transactions, tabValue, searchQuery, startDate, endDate]);

  const filterTransactions = (tab, query, start, end) => {
    let filtered = [...transactions];

    if (tab !== 'all') {
      filtered = filtered.filter(t => t.type === tab);
    }

    if (query) {
      filtered = filtered.filter(t => 
        t.documentNo.toLowerCase().includes(query.toLowerCase()) ||
        t.party.toLowerCase().includes(query.toLowerCase()) ||
        t.referenceNo.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (start && end) {
      filtered = filtered.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate >= start && transactionDate <= end;
      });
    }

    setFilteredTransactions(filtered);
    setPage(0);
  };

  const exportToExcel = () => {
    const exportData = filteredTransactions.map(t => ({
      Date: new Date(t.date).toLocaleDateString(),
      Type: t.type,
      'Document No': t.documentNo,
      'Reference No': t.referenceNo,
      Party: t.party,
      Quantity: Math.abs(t.quantity),
      Unit: t.unit,
      Rate: t.rate,
      'Taxable Amount': t.taxableAmount,
      'Tax Amount': t.taxAmount,
      'Total Amount': t.totalAmount,
      Balance: t.balance,
      Remarks: t.remarks
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, `${itemDetails?.name}_Transactions.xlsx`);
  };

  const renderSummary = () => (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid  size={{ xs: 12,sm:6, md: 3 }} >
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="textSecondary">Total Purchase</Typography>
          <Typography variant="h6">{summary?.totalPurchaseQty} {itemDetails?.unit}</Typography>
          <Typography variant="body2">₹{summary?.totalPurchaseAmount?.toLocaleString()}</Typography>
        </Paper>
      </Grid>
      <Grid  size={{ xs: 12,sm:6, md: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="textSecondary">Total Sales</Typography>
          <Typography variant="h6">{summary?.totalSaleQty} {itemDetails?.unit}</Typography>
          <Typography variant="body2">₹{summary?.totalSaleAmount?.toLocaleString()}</Typography>
        </Paper>
      </Grid>
      <Grid  size={{ xs: 12,sm:6, md: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="textSecondary">Current Stock</Typography>
          <Typography variant="h6">{itemDetails?.currentStock} {itemDetails?.unit}</Typography>
          <Chip 
            size="small" 
            label={itemDetails?.status}
            color={itemDetails?.status === 'Out of Stock' ? 'error' : 'success'}
          />
        </Paper>
      </Grid>
      <Grid  size={{ xs: 12,sm:6, md: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="textSecondary">Min. Stock Level</Typography>
          <Typography variant="h6">{itemDetails?.minStock} {itemDetails?.unit}</Typography>
          <Typography variant="body2">{itemDetails?.category}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );

  const renderTable = () => (
    <TableContainer component={Paper} sx={{ mb: 3 }}>
      <Table size={isMobile ? "small" : "medium"}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            {!isMobile && <TableCell>Type</TableCell>}
            <TableCell>Document No</TableCell>
            {!isMobile && <TableCell>Party</TableCell>}
            <TableCell align="right">Qty</TableCell>
            {!isMobile && <TableCell align="right">Rate</TableCell>}
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTransactions
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                {!isMobile && <TableCell>{transaction.type}</TableCell>}
                <TableCell>{transaction.documentNo}</TableCell>
                {!isMobile && <TableCell>{transaction.party}</TableCell>}
                <TableCell align="right">
                  {Math.abs(transaction.quantity)} {transaction.unit}
                </TableCell>
                {!isMobile && <TableCell align="right">₹{transaction.rate}</TableCell>}
                <TableCell align="right">₹{transaction.totalAmount}</TableCell>
                <TableCell align="right">{transaction.balance} {transaction.unit}</TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filteredTransactions.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </TableContainer>
  );

  const renderChart = () => (
    <Box sx={{ width: '100%', height: 300, mb: 3 }}>
      <ResponsiveContainer>
        <LineChart data={transactions}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis />
          <Tooltip 
            labelFormatter={(date) => new Date(date).toLocaleDateString()}
            formatter={(value) => [`${value} ${itemDetails?.unit}`, 'Balance']}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="balance" 
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="lg" 
      fullWidth
      fullScreen={isMobile}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6">
              {itemDetails?.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {itemDetails?.inventoryType}
            </Typography>
          </Box>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {loading && (
          <Box display="flex" justifyContent="center" my={3}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
        )}

        {!loading && !error && (
          <>
            {renderSummary()}

            <Box sx={{ mb: 3 }}>
              <Tabs 
                value={tabValue} 
                onChange={(e, newValue) => setTabValue(newValue)}
                variant={isMobile ? "scrollable" : "standard"}
                scrollButtons={isMobile ? "auto" : false}
              >
                <Tab label="All" value="all" />
                <Tab label="Purchases" value="purchase" />
                <Tab label="Sales" value="sale" />
                <Tab label="Purchase Returns" value="purchaseReturn" />
                <Tab label="Sales Returns" value="saleReturn" />
              </Tabs>
            </Box>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid xs={12} sm={4}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search by document no. or party"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  slotProps={{
                    startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} />
                  }}
                />
              </Grid>
              {/* <Grid  xs={12} sm={3}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                />
              </Grid>
              <Grid  xs={12} sm={3}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(date) => setEndDate(date)}
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                />
              </Grid> */}
              <Grid  xs={12} sm={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={exportToExcel}
                >
                  Export
                </Button>
              </Grid>
            </Grid>

            {renderTable()}
            {renderChart()}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};


export default ItemHistory;