import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  ListItemText,
  FormControlLabel,
  Switch,
  Tooltip,
  Stack,
  Slider
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
  FilterList as FilterIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  DateRange as DateRangeIcon
} from '@mui/icons-material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

/**
 * Reusable Filter Component for Manufacturing Management System
 * 
 * @param {Object} props - Component props
 * @param {Array} props.fields - Array of field configurations for filtering
 * @param {Function} props.onApplyFilters - Callback function when filters are applied
 * @param {Object} props.initialFilters - Initial filter values
 * @param {Boolean} props.showFilterBar - Whether to show the filter bar with applied filters
 * @param {String} props.title - Title for the filter drawer
 * @param {Boolean} props.loading - Loading state
 */
const FilterData = ({
  fields = [],
  onApplyFilters,
  initialFilters = {},
  showFilterBar = true,
  title = "Filters",
  loading = false
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState([]);

  // For debouncing without lodash
  const [debouncedFilters, setDebouncedFilters] = useState(initialFilters);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  console.log('activeFilters', activeFilters)
  // Initialize filters on component mount
  useEffect(() => {
    setFilters(initialFilters);
    setDebouncedFilters(initialFilters);
    setAppliedFilters(initialFilters);
    calculateActiveFilters(initialFilters);
  }, [initialFilters]);

  // Use debounced filters to update actual filters
  useEffect(() => {
    setFilters(debouncedFilters);
  }, [debouncedFilters]);

  // Calculate which filters are currently active
//   const calculateActiveFilters = (currentFilters) => {
//     const active = [];
// console.log('fields',fields)
// console.log('currentFilters',currentFilters)
//     fields.forEach(field => {
//       const value = currentFilters[field.name];
//       console.log('value', value)
//       if (value !== undefined && value !== '' &&
//         ((Array.isArray(value) && value.length > 0) ||
//           (!Array.isArray(value) && value !== null))) {
//         active.push({
//           name: field.name,
//           label: field.label,
//           value: value,
//           type: field.type
//         });
//       }
//     });
//     // console.log('activeeee',active)
//     setActiveFilters(active);
//   };


const calculateActiveFilters = (currentFilters) => {
  const active = [];
  
  fields.forEach(field => {
    const value = currentFilters[field.name];
    
    // More robust empty value checking
    let isEmpty = false;
    
    if (value === undefined || value === null || value === '') {
      isEmpty = true;
    } else if (Array.isArray(value) && value.length === 0) {
      isEmpty = true;
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      // Handle date ranges and numeric ranges
      if (field.type === 'dateRange' && (!value.start && !value.end)) {
        isEmpty = true;
      } else if (field.type === 'range' && 
                (value.min === (field.min || 0) && value.max === (field.max || 100))) {
        isEmpty = true;
      } else if (Object.keys(value).length === 0) {
        isEmpty = true;
      }
    } else if (field.type === 'boolean' && value === false) {
      isEmpty = true;
    }
    
    if (!isEmpty) {
      active.push({
        name: field.name,
        label: field.label,
        value: value,
        type: field.type
      });
    }
  });
  
  setActiveFilters(active);
};

  // Custom debounce implementation without lodash
  const handleFilterChange = useCallback((name, value) => {
    // Clear previous timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set new timeout
    const timeout = setTimeout(() => {
      setDebouncedFilters(prev => ({
        ...prev,
        [name]: value
      }));
    }, 300);

    setDebounceTimeout(timeout);

    // Immediately update the UI for better UX
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  }, [debounceTimeout]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  // Handle opening the filter drawer
  const handleOpenFilter = () => {
    setIsFilterOpen(true);
  };

  // Handle closing the filter drawer
  const handleCloseFilter = () => {
    setIsFilterOpen(false);
    // Reset to applied filters when closing without applying
    setFilters(appliedFilters);
    setDebouncedFilters(appliedFilters);
  };

  // Apply current filters
  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    calculateActiveFilters(filters);
    if (onApplyFilters) {
      onApplyFilters(filters);
    }
    setIsFilterOpen(false);
  };

  // Clear all filters
  const handleClearFilters = () => {
    console.log('yesssssssssss')
    const emptyFilters = {};
    fields.forEach(field => {
      if (field.type === 'select' || field.type === 'multiselect') {
        emptyFilters[field.name] = field.type === 'multiselect' ? [] : '';
      } else if (field.type === 'dateRange') {
        emptyFilters[field.name] = { start: '', end: '' };
      } else if (field.type === 'range') {
        emptyFilters[field.name] = { min: field.min || 0, max: field.max || 100 };
      } else if (field.type === 'boolean') {
        emptyFilters[field.name] = false;
      } else {
        emptyFilters[field.name] = '';
      }
    });
    setFilters(emptyFilters);
    setDebouncedFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    calculateActiveFilters(emptyFilters);
    if (onApplyFilters) {
      onApplyFilters(emptyFilters);
    }
  };
  console.log('activeFilters', activeFilters) 

  // Remove a single filter
  const handleRemoveFilter = (filterName) => {
    const updatedFilters = { ...appliedFilters };

    const field = fields.find(f => f.name === filterName);
    if (field) {
      if (field.type === 'multiselect') {
        updatedFilters[filterName] = [];
      } else if (field.type === 'dateRange') {
        updatedFilters[filterName] = { start: '', end: '' };
      } else if (field.type === 'range') {
        updatedFilters[filterName] = { min: field.min || 0, max: field.max || 100 };
      } else if (field.type === 'boolean') {
        updatedFilters[filterName] = false;
      } else {
        updatedFilters[filterName] = '';
      }
    }

    setFilters(updatedFilters);
    setDebouncedFilters(updatedFilters);
    setAppliedFilters(updatedFilters);
    calculateActiveFilters(updatedFilters);

    if (onApplyFilters) {
      onApplyFilters(updatedFilters);
    }
  };

  // Render different field types
  const renderField = (field) => {
    const { type, name, label, options, placeholder, min, max } = field;
    const value = filters[name] !== undefined ? filters[name] : (
      type === 'multiselect' ? [] :
        type === 'dateRange' ? { start: '', end: '' } :
          type === 'range' ? { min: min || 0, max: max || 100 } :
            type === 'boolean' ? false : ''
    );

    switch (type) {
      case 'text':
        return (
          <TextField
            fullWidth
            label={label}
            name={name}
            value={value}
            placeholder={placeholder || `Enter ${label.toLowerCase()}`}
            onChange={(e) => handleFilterChange(name, e.target.value)}
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: value ? (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => handleFilterChange(name, '')}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null
            }}
          />
        );

      case 'select':
        return (
          <FormControl fullWidth size="small" variant="outlined">
            <InputLabel id={`filter-select-${name}`}>{label}</InputLabel>
            <Select
              labelId={`filter-select-${name}`}
              value={value}
              onChange={(e) => handleFilterChange(name, e.target.value)}
              label={label}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case 'multiselect':
        return (
          <FormControl fullWidth size="small" variant="outlined">
            <InputLabel id={`filter-multiselect-${name}`}>{label}</InputLabel>
            <Select
              labelId={`filter-multiselect-${name}`}
              multiple
              value={value || []}
              onChange={(e) => handleFilterChange(name, e.target.value)}
              input={<OutlinedInput label={label} />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((val) => {
                    const optionLabel = options.find(opt => opt.value === val)?.label || val;
                    return <Chip key={val} label={optionLabel} size="small" />;
                  })}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Checkbox checked={(value || []).indexOf(option.value) > -1} />
                  <ListItemText primary={option.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case 'dateRange':
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                label={`${label} From`}
                type="date"
                value={value?.start || ''}
                onChange={(e) => handleFilterChange(name, { ...value, start: e.target.value })}
                size="small"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DateRangeIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                label={`${label} To`}
                type="date"
                value={value?.end || ''}
                onChange={(e) => handleFilterChange(name, { ...value, end: e.target.value })}
                size="small"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DateRangeIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
        );

      case 'boolean':
        return (
          <FormControlLabel
            control={
              <Switch
                checked={value || false}
                onChange={(e) => handleFilterChange(name, e.target.checked)}
                name={name}
                color="primary"
              />
            }
            label={label}
          />
        );

      case 'range':
        return (
          <Box sx={{ width: '100%', px: 2 }}>
            <Typography gutterBottom>{label}</Typography>
            <Box sx={{ px: 1 }}>
              <Slider
                value={[value?.min || min || 0, value?.max || max || 100]}
                onChange={(e, newValue) => {
                  handleFilterChange(name, { min: newValue[0], max: newValue[1] });
                }}
                valueLabelDisplay="auto"
                min={min || 0}
                max={max || 100}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption">{value?.min || min || 0}</Typography>
              <Typography variant="caption">{value?.max || max || 100}</Typography>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  // Format filter value for display in chips
  const formatFilterValue = (filter) => {
    const { type, value } = filter;

    if (type === 'multiselect') {
      if (value.length === 1) {
        const field = fields.find(f => f.name === filter.name);
        const option = field?.options.find(opt => opt.value === value[0]);
        return option ? option.label : value[0];
      }
      return `${value.length} selected`;
    } else if (type === 'dateRange') {
      const start = value.start ? value.start : '';
      const end = value.end ? value.end : '';
      return start && end ? `${start} - ${end}` : (start || end);
    } else if (type === 'range') {
      return `${value.min} - ${value.max}`;
    } else if (type === 'boolean') {
      return value ? 'Yes' : 'No';
    } else if (type === 'select') {
      const field = fields.find(f => f.name === filter.name);
      const option = field?.options.find(opt => opt.value === value);
      return option ? option.label : value;
    }

    return String(value);
  };

  return (
    <>
      {/* Filter Button & Bar */}
      <Paper
        elevation={1}
        sx={{
          p: 1,
          mb: 2,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={handleOpenFilter}
              size="small"
            >
              Filter
            </Button>
            {activeFilters.length > 0 && (
              <Button
                variant="text"
                color="error"
                size="small"
                startIcon={<ClearIcon />}
                onClick={handleClearFilters}
                sx={{ ml: 1 }}
              // disabled={loading}
              >
                Clear All
              </Button>
            )}
          </Box>
          <Typography variant="body2" color="textSecondary">
            {activeFilters.length > 0
              ? `${activeFilters.length} filter${activeFilters.length > 1 ? 's' : ''} applied`
              : 'No filters applied'}
          </Typography>
        </Box>

        {/* Active Filter Chips */}
        {showFilterBar && activeFilters.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}
          >
            {activeFilters.map((filter) => (
              <Chip
                key={filter.name}
                label={
                  <Tooltip title={formatFilterValue(filter)}>
                    <Typography variant="caption" noWrap>
                      {filter.label}: {formatFilterValue(filter)}
                    </Typography>
                  </Tooltip>
                }
                onDelete={() => handleRemoveFilter(filter.name)}
                size="small"
                // disabled={loading}
              />
            ))}
          </Stack>
        )}
      </Paper>

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={isFilterOpen}
        onClose={handleCloseFilter}
      >
        <Box sx={{ width: 320, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">{title}</Typography>
            <IconButton onClick={handleCloseFilter} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Box sx={{ mb: 2 }}>
            {fields.map((field) => (
              <Box key={field.name} sx={{ mb: 2 }}>
                {renderField(field)}
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              onClick={handleClearFilters}
              color="inherit"
            // disabled={loading}
            >
              Clear All
            </Button>
            <Button
              onClick={handleApplyFilters}
              variant="contained"
              color="primary"
            // disabled={loading}
            >
              Apply Filters
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default FilterData;