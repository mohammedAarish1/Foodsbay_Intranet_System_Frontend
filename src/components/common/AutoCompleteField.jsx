import React, { useEffect, useState } from 'react'
import {
    TextField,
    Autocomplete,
} from '../MUI';
import api from '../../config/axiosConfig.js';
import { useSelector } from 'react-redux';

const AutoCompleteField = ({
    formType,
    items,
    initialValues,
    field,
    setFieldValue,
    touched,
    errors,

}) => {
    const [filteredItems, setFilteredItems] = useState([]);
    // const [items, setItems] = useState([]);

    const [transactions, setTransactions] = useState([]); // for the list of sale and purchase
    const [filteredTransactions, setFilteredTransactions] = useState([]);

    const { employeesList } = useSelector(state => state.hrms)
    console.log('epmloyeelist', employeesList)


    const getTransactions = async (type) => {
        try {
            const response = await api.get(`/api/v1/item/list/${type}`);
            console.log('response', response.data)
            if (response.data.status === 200) {
                setTransactions(response.data?.data);
            }
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    }

    // New function to handle item name filtering
    const handleItemNameFilter = (event, newInputValue) => {
        console.log('newinput va', newInputValue)

        const filtered = items.filter(item =>
            item.name.toLowerCase().includes(newInputValue.toLowerCase())
        );
        setFilteredItems(filtered);

    };

    // Handle invoice number filtering
    const handleInvoiceFilter = (event, newInputValue) => {
        if (newInputValue) {
            const filtered = transactions.filter(entry =>
                entry.invoiceNo.toLowerCase().includes(newInputValue.toLowerCase())
            );
            setFilteredTransactions(filtered);
        }
    };

    useEffect(() => {
        console.log('testststs')

        if (formType === 'Purchase Return') {
            getTransactions('purchases')
        } else if (formType === 'Sales Return') {
            getTransactions('sales')
        }

    }, []);

    return (
        <>
            {field.name === 'name' ? (
                <Autocomplete
                    freeSolo
                    value={initialValues?.name || ''}
                    options={filteredItems.length > 0 ? filteredItems.map(item => item.name) : items.map(item => item.name)}
                    onInputChange={handleItemNameFilter}
                    onChange={(event, newValue) => {
                        setFieldValue('name', newValue || event.target.value);
                        const selectedItem = items.find(item => item.name === newValue);
                        if (selectedItem) {
                            setFieldValue('category', selectedItem.category);
                            setFieldValue('inventoryType', selectedItem.inventoryType);
                            setFieldValue('unit', selectedItem.unit);
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={field.label}
                            variant="outlined"
                            onBlur={(e) => {
                                setFieldValue('name', e.target.value);
                            }}
                            error={touched[field.name] && Boolean(errors[field.name])}
                            helperText={touched[field.name] && errors[field.name]}
                        />
                    )}
                />
            ) : field.name === 'invoiceNo' ? (
                //   New invoice number autocomplete component
                <Autocomplete
                    freeSolo
                    value={initialValues.invoiceNo || ''}
                    options={filteredTransactions?.length > 0 ? filteredTransactions?.map(entry => entry.invoiceNo) : transactions?.map(entry => entry.invoiceNo)}
                    onInputChange={handleInvoiceFilter}
                    onChange={(event, newValue) => {
                        setFieldValue('invoiceNo', newValue || event.target.value);
                        const selectedEntry = transactions.find(entry => entry.invoiceNo === newValue && entry.name === values.name);
                        if (selectedEntry) {
                            setFieldValue('unitPrice', selectedEntry.unitPrice);
                            setFieldValue('quantity', selectedEntry.quantity);
                            setFieldValue('unit', selectedEntry.unit);
                            setFieldValue('clientVendor', selectedEntry.clientVendor);
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={field.label}
                            variant="outlined"
                            onBlur={(e) => {
                                setFieldValue('invoiceNo', e.target.value);
                            }}
                            error={touched[field.name] && Boolean(errors[field.name])}
                            helperText={touched[field.name] && errors[field.name]}
                        />
                    )}
                />
            ) : field.name === 'employeeId' ? (
                <Autocomplete
                    freeSolo
                    value={initialValues?.employeeId || ''}
                    options={employeesList?.length > 0 ? employeesList?.map(entry => entry.employeeId) : []}
                    onInputChange={handleInvoiceFilter}
                    onChange={(event, newValue) => {
                        setFieldValue('employeeId', newValue || event.target.value);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={field.label}
                            variant="outlined"
                            onBlur={(e) => {
                                setFieldValue('employeeId', e.target.value);
                            }}
                            error={touched[field.name] && Boolean(errors[field.name])}
                            helperText={touched[field.name] && errors[field.name]}
                        />
                    )}
                />
            ) : null}
        </>
    )
}

export default AutoCompleteField;
