import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axiosConfig";


// create a new item in the database
export const createNewEmployee = createAsyncThunk(
    'hrms/createNewEmployee',
    async ({ formData, type }, { rejectWithValue }) => {
        try {
            //       for (let [key, value] of formData.entries()) {
            //     console.log(key, value, typeof value);
            //   }
            const URL = `/api/v1/hrms/create/${type}`
            const response = await api.post(URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
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
export const getEmployeeList = createAsyncThunk(
    'hrms/getEmployeeList',
    async (type, { rejectWithValue }) => {
        console.log('type', type)
        const URL = `/api/v1/hrms/list/${type}`

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
export const deleteEmployee = createAsyncThunk(
    'hrms/deleteEmployee',
    async ({ id, type }, { rejectWithValue }) => {

        const URL = `/api/v1/hrms/delete/${type}/${id}`

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
export const updateEmployee = createAsyncThunk(
    'hrms/updateEmployee',
    async ({ id, formData, type }, { rejectWithValue }) => {

        // console.log('type', type)
        // console.log('formData', formData)


        const URL = `/api/v1/hrms/update/${type}/${id}`

        try {
            const response = await api.put(URL,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
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


export const getLeaveList = createAsyncThunk(
    'hrms/getLeaveList',
    async (type, { rejectWithValue }) => {
        console.log('type', type)

        const URL = `/api/v1/hrms/list/leaves`

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

export const updateLeaveStatus = createAsyncThunk(
    'hrms/updateLeaveStatus',
    async ({ leaveId, payload }, { rejectWithValue }) => {
        const URL = `/api/v1/hrms/update/leave-status/${leaveId}`
        console.log('leaveid', leaveId)
        console.log('payload', payload)
        try {
            const response = await api.put(URL, payload)
            console.log('update leave list', response.data)
            // return { ...response.data, type }
            return response.data
        } catch (error) {
            console.log('errrror', error)
            return rejectWithValue(error.response.data)
        }
    }
);

// get all attendance list
export const getAttendanceList = createAsyncThunk(
    'hrms/getAttendanceList',
    async ({ filters }, { rejectWithValue }) => {
        const { employeeId, status, dateRange } = filters

console.log('employeeId',employeeId)
        // Construct the query string
        const queryString = new URLSearchParams({
            employeeId,
            status: status.join(","),  // Join array as a comma-separated string
            "dateRange[start]": dateRange.start,
            "dateRange[end]": dateRange.end
        }).toString();

        const URL = `/api/v1/hrms/list/attendance?${queryString}`
        try {
            const response = await api.get(URL)
            console.log('res attendance list', response.data)
            // return { ...response.data, type }
            return response.data
        } catch (error) {
            console.log('errrror', error)
            return rejectWithValue(error.response.data)
        }
    }
);


export const updateEmpLogOutTime = createAsyncThunk(
    'hrms/updateEmpLogOutTime',
    async ({ attendanceId, payload }, { rejectWithValue }) => {
        console.log('payload', payload)
        const URL = `/api/v1/hrms/update/logout-time/${attendanceId}`

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


// fetch log out update request
export const getLogoutRequests = createAsyncThunk(
    'hrms/getLogoutRequests',
    async (_, { rejectWithValue }) => {
        const URL = `/api/v1/hrms/logout/request-list`

        try {
            const response = await api.get(URL)
            console.log('logout update request', response.data)
            // return { ...response.data, type }
            return response.data
        } catch (error) {
            console.log('errrror', error)
            return rejectWithValue(error.response.data)
        }
    }
)


// add holidays
export const addHoliday = createAsyncThunk(
    'hrms/addHoliday',
    async ({ formData }, { rejectWithValue }) => {
        try {
            //       for (let [key, value] of formData.entries()) {
            //     console.log(key, value, typeof value);
            //   }
            const URL = `/api/v1/hrms/add/holiday`
            const response = await api.post(URL, formData, {
                headers: {
                    // 'Content-Type': 'multipart/form-data'
                    // 'Content-Type': 'multipart/form-data'
                }
            })
            console.log('response', response.data)
            // return { ...response.data, type }
            return response.data
        } catch (error) {
            console.log('errrror', error)
            return rejectWithValue(error.response.data)
        }
    }
);

// get holiday list
export const getHolidayList = createAsyncThunk(
    'hrms/getHolidayList',
    async (_, { rejectWithValue }) => {

        const URL = `/api/v1/hrms/holiday/list`

        try {
            const response = await api.get(URL)
            console.log('res list', response.data)
            return response.data
        } catch (error) {
            console.log('errrror', error)
            return rejectWithValue(error.response.data)
        }
    }
);


// delete holiday from the database
export const deleteHoliday = createAsyncThunk(
    'hrms/deleteHoliday',
    async ({ id, type }, { rejectWithValue }) => {

        const URL = `/api/v1/hrms/delete/${type}/${id}`
        console.log('URL', URL)
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
// verify attendance (reject or approve)
export const verifyAttendance = createAsyncThunk(
    'hrms/verifyAttendance',
    async (payload, { rejectWithValue }) => {

        const URL = `/api/v1/hrms/verify-attendance`
        try {
            const response = await api.post(URL,payload)
            console.log('res verify attendance', response.data)
            // return { ...response.data, type }
            return response.data
        } catch (error) {
            console.log('errrror', error)
            return rejectWithValue(error.response.data)
        }
    }
);


export const getTicketList = createAsyncThunk(
    'hrms/getTicketList',
    async (type, { rejectWithValue }) => {

        const URL = `/api/v1/hrms/list/tickets`

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


export const updateTicketStatus = createAsyncThunk(
    'hrms/updateTicketStatus',
    async ({ ticketId, payload }, { rejectWithValue }) => {
        const URL = `/api/v1/hrms/update/ticket-status/${ticketId}`
        console.log('payload', payload)
        try {
            const response = await api.put(URL, payload)
            console.log('update leave list', response.data)
            // return { ...response.data, type }
            return response.data
        } catch (error) {
            console.log('errrror', error)
            return rejectWithValue(error.response.data)
        }
    }
);
