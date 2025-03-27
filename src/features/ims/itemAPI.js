
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axiosConfig";


// create a new item in the database
export const createNewEntry = createAsyncThunk(
    'entries/createNewEntry',
    async ({ formData, type }, { rejectWithValue }) => {
        try {
            //       for (let [key, value] of formData.entries()) {
            //     console.log(key, value, typeof value);
            //   }
            let URL;

            switch (type) {
                case 'itemEntry':
                case 'purchaseEntry':
                case 'salesEntry':
                case 'salesReturnEntry':
                case 'purchaseReturnEntry':
                    URL = `/api/v1/item/create/${type}`;
                    break;

                case 'employee':
                    URL = `/api/v1/hrms/create/${type}`
                    break;
            }
            const response = await api.post(URL, formData, {
                headers: {
                    'Content-Type': type === 'itemEntry' ? 'application/json' : 'multipart/form-data'
                    // 'Content-Type': 'multipart/form-data'
                }
            })
            console.log('response', response.data)
            return { ...response.data, type }
        } catch (error) {
            console.log('errrror', error)
            return rejectWithValue(error.response.data)
        }
    }
);

// get all items from the database
export const getAllEntries = createAsyncThunk(
    'entries/getAllEntries',
    async (type, { rejectWithValue }) => {
        console.log('type', type)


        let URL;

        switch (type) {
            case 'items':
            case 'purchases':
            case 'sales':
            case 'sales-return':
            case 'purchase-return':
                URL = `/api/v1/item/list/${type}`;
                break;

            case 'employees':
                URL = `/api/v1/hrms/list/${type}`
                break;
        }

        try {
            const response = await api.get(URL)
            console.log('res list', response.data)
            return { ...response.data, type }
        } catch (error) {
            console.log('errrror', error)
            return rejectWithValue(error.response.data)
        }
    }
);
// get all items from the database
export const deleteEntry = createAsyncThunk(
    'entries/deleteEntry',
    async ({ id, type }, { rejectWithValue }) => {

        let URL;

        switch (type) {
            case 'itemEntry':
                case 'purchaseEntry':
                case 'salesEntry':
                case 'salesReturnEntry':
                case 'purchaseReturnEntry':
                URL = `/api/v1/item/delete/${type}/${id}`;
                break;

            case 'employee':
                URL = `/api/v1/hrms/delete/${type}/${id}`
                break;
        }

        try {
            const response = await api.delete(URL)
            console.log('res delete', response)
            return { ...response.data, type }
        } catch (error) {
            console.log('errrror', error)
            return rejectWithValue(error.response.data)
        }
    }
);
// update item  info in the database
export const updateEntry = createAsyncThunk(
    'entries/updateEntry',
    async ({ id, formData, type }, { rejectWithValue }) => {
       
        // console.log('type', type)
        // console.log('formData', formData)

        let URL;

        switch (type) {
            case 'itemEntry':
                case 'purchaseEntry':
                case 'salesEntry':
                case 'salesReturnEntry':
                case 'purchaseReturnEntry':
                URL = `/api/v1/item/update/${type}/${id}`;
                break;

            case 'employee':
                URL = `/api/v1/hrms/update/${type}/${id}`
                break;
        }

        try {
            const response = await api.put(URL,
                formData,
                {
                    headers: {
                        'Content-Type': type === 'itemEntry' ? 'application/json' : 'multipart/form-data'
                    }
                }
            )
            console.log('res update', response)
            return { ...response.data, type }
        } catch (error) {
            console.log('errrror', error)
            return rejectWithValue(error.response.data)
        }
    }
);
// get  item  names from the database
// export const  getItemNames=createAsyncThunk(
//     'entries/getItemNames',
//     async(_,{rejectWithValue})=>{
//         try {
//             const response=await api.put(`/api/v1/item/all/names`)
//             console.log('res names', response)
//             return response.data
//         } catch (error) {
//             console.log('errrror', error)
//             return rejectWithValue(error.response.data)
//         }
//     }
// );

// get all items from the database
export const getItemHistory = createAsyncThunk(
    'inventory/getItemHistory',
    async (itemId, { rejectWithValue }) => {
        // console.log('type', type)
        try {
            const response = await api.get(`/api/v1/item/history/${itemId}`,)
            console.log('res list', response.data)
            // return { ...response.data, type }
            return response.data
        } catch (error) {
            console.log('errrror', error)
            return rejectWithValue(error.response.data)
        }
    }
);