import React, { useCallback } from "react";
import {
    IconButton,
    Menu,
    MenuItem,
    Card,
    Box,
    Typography,
} from "../MUI";
import { MoreVertIcon, WarningIcon } from '../../assets/icons/icon';
import Grid from '@mui/material/Grid2';
import { getNestedValue } from "../../helper/commonUtils";

// Helper function to get status color (you can customize this)
// const getStatusColor = (status) => {
//     const statusColorMap = {
//         'Active': 'success',
//         'Inactive': 'error',
//         'Low Stock': 'warning',
//         'default': 'default'
//     };
//     return statusColorMap[status] || statusColorMap['default'];
// };

const MobileCard = ({
    item,
    onActionClick,
    actions = [],
    actionAnchorEl = null,
    setActionAnchorEl,
    selectedItem = null,
    displayFields = []
}) => {

    const getValue = useCallback((key, row) => {
        // Determine if column.key is for a nested value (contains a dot)
        const isNested = key.includes('.');

        // Access nested value if needed, otherwise access directly
        const value = isNested ? getNestedValue(row, key) : row[key];
        return value !== undefined ? value : "__";
    }, []);


    const getHeading = (key, field) => {
        switch (key) {
            case 'EmployeeList':
                return field.basicInfo?.firstName + ' ' + field.basicInfo?.lastName || '';
            default:
                return '';
        }
    }

    // Function to render different field types
    const renderField = (field, value) => {
        // Special rendering for specific fields
        switch (field.key) {
            case 'quantity':
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            {field.label}: {value} {item.unit || ''}
                        </Typography>
                        {/* Example condition for low stock warning */}
                        {value <= 10 && (
                            <WarningIcon color="warning" sx={{ ml: 1, fontSize: 16 }} />
                        )}
                    </Box>
                );

            case 'amount':
                return (
                    <Typography variant="body2" color="text.secondary">
                        {field.label}: ₹{value.toLocaleString()}
                    </Typography>
                );

            default:
                return (
                    <Typography variant="body2" color="text.secondary">
                        {field.label}: {value}
                    </Typography>
                );
        }
    };

    return (
        <Card sx={{ mb: 2, p: 2 }}>
            {/* Header with name and actions */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                    {getHeading('EmployeeList', item)}
                    {/* {item.name || 'ddd'} */}
                </Typography>
                {actions.length > 0 && (
                    <>
                        <IconButton size="small" onClick={(e) => onActionClick(e, item)}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={actionAnchorEl}
                            open={Boolean(actionAnchorEl)}
                            onClose={() => setActionAnchorEl(null)}
                        >
                            {actions.map((action, idx) => (
                                <MenuItem
                                    key={idx}
                                    onClick={() => {
                                        action.onClick(selectedItem);
                                        setActionAnchorEl(null);
                                    }}
                                >
                                    {action.icon} {action.label}
                                </MenuItem>
                            ))}
                        </Menu>
                    </>
                )}
            </Box>

            {/* Dynamic Grid of Fields */}
            <Grid container spacing={1.5}>
                {displayFields.map((field, index) => {
                    return (
                        (
                            <Grid xs={6} key={index}>
                                {renderField(field, getValue(field.key, item))}
                            </Grid>
                        )
                    )
                })}
            </Grid>
        </Card>
    );
};

export default MobileCard;