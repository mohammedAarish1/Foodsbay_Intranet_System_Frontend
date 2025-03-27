import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axiosConfig";
import { addAPI, getAPI } from "../../helper/apiUtils";

export const addRequest = createAsyncThunk(
    'user/addRequest',
    async (data, { rejectWithValue, getState }) => {
        // const userstates=getState();
        const employeeData = {
            name: "John Doe",
            id: "EMP-08",
            department: "Production",
            totalLeaves: 24,
            balanceLeaves: 15
        };
        console.log('heeeeeeeeeeeeeeeeeeeeeeee', data)
        //   data.append('employeeId',employeeData.id)
        const payload = { ...data.formData, employeeId: employeeData.id }
        const URL = `/api/v1/users/leave-request`
        // console.log('data',data)

        try {
            // const response = await api.post(URL, data, {
            //     headers: {
            //         'Content-Type': 'application/json' 
            //     }
            // })

            const response = await addAPI(URL, payload)
            console.log('response', response.data)
            // return { ...response.data, type }
            return response.data
        } catch (error) {
            console.log('errrror in thunk', error)
            return rejectWithValue(error.response.data)
        }
    }
);


// get all items from the database
export const getSingleUserLeaves = createAsyncThunk(
    'user/getSingleUserLeaves',
    async (employeeId, { rejectWithValue }) => {
        console.log('employee id', employeeId)
        const URL = `/api/v1/users/leave/list/${employeeId}`
        try {
            const response = await getAPI(URL)
            console.log('leave list', response.data)
            // return { ...response.data, type }
            return response.data
        } catch (error) {
            console.log('errrror', error)
            return rejectWithValue(error.response.data)
        }
    }
);


export const deleteLeaveRequest = createAsyncThunk(
    'user/deleteLeaveRequest',
    async ({ id, type }, { rejectWithValue }) => {

        const URL = `/api/v1/users/leave/request/${id}`

        try {
            const response = await api.delete(URL)
            console.log('res delete', response)
            // return { ...response.data, type }
            return response.data
        } catch (error) {
            console.log('errrror', error)
            return rejectWithValue(error.response.data)
        }
    }
);

// get all items from the database
export const getSingleUserAttendance = createAsyncThunk(
    'user/getSingleUserAttendance',
    async (employeeId, { rejectWithValue }) => {
        console.log('employee id', employeeId)
        const URL = `/api/v1/users/attendance/list/${employeeId}`
        try {
            const response = await getAPI(URL)
            console.log('leave list', response.data)
            // return { ...response.data, type }
            return response.data
        } catch (error) {
            console.log('errrror', error)
            return rejectWithValue(error.response.data)
        }
    }
);
// get all items from the database
export const requestLogoutUpdate = createAsyncThunk(
    'user/requestLogoutUpdate',
    async ({ attendanceId, payload }, { rejectWithValue }) => {
        const URL = `/api/v1/users/add/logout-request/${attendanceId}`

        try {
            const response = await api.put(URL, payload)
            // console.log('update log out time', response.data)
            // return { ...response.data, type }
            return response.data
        } catch (error) {
            console.log('errrror', error)
            return rejectWithValue(error.response.data)
        }
    }
)


export const requestAttendanceAdding = createAsyncThunk(
    'user/requestAttendanceAdding',
    async (payload, { rejectWithValue }) => {
        const URL = `/api/v1/users/add/attendance-request`

        try {
            const response = await api.post(URL, payload)
            // console.log('update log out time', response.data)
            // return { ...response.data, type }
            return response.data
        } catch (error) {
            console.log('errrror', error)
            return rejectWithValue(error.response.data)
        }
    }
);


export const addTicket = createAsyncThunk(
    'user/raiseTicket',
    async (data, { rejectWithValue, getState }) => {
       
        const URL = `/api/v1/users/add/ticket`

        try {
          
            const response = await addAPI(URL, data)
            console.log('response', response.data)
            return response.data
        } catch (error) {
            console.log('errrror in thunk', error)
            return rejectWithValue(error.response.data)
        }
    }
);


// get all items from the database
export const getTicketList = createAsyncThunk(
    'user/getTicketList',
    async (employeeId, { rejectWithValue }) => {
        const URL = `/api/v1/users/ticket/list/${employeeId}`
        try {
            const response = await getAPI(URL)
            console.log('ticket list', response.data)
            // return { ...response.data, type }
            return response.data
        } catch (error) {
            console.log('errrror', error)
            return rejectWithValue(error.response.data)
        }
    }
);