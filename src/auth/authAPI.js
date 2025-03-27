import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../config/axiosConfig';

const backendUrl = import.meta.env.VITE_BACKEND_URL;


// Login API call
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await api.post(`/api/v1/auth/login`, credentials)
            console.log('response', response.data)
            if (response.data.data?.isTemporary) {
                console.log('dddddddnnn')
                return response.data
            }
            const { user, accessToken } = response.data.data
            // Set access token in axios headers
            api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            console.log('resss', response)
            return { user, accessToken };
        } catch (error) {
            console.log('errrr', error)
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const handlePasswordChange = createAsyncThunk(
    'auth/handlePasswordChange',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await api.post(`/api/v1/auth/change-password`, payload)
            console.log('response', response.data)
            const { user, accessToken } = response.data.data
            if (user && accessToken) {
                api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
                return { user, accessToken };
            }else {
                return {}
            }

        } catch (error) {
            console.log('errrr', error)
            return rejectWithValue(error.response.data.message);
        }
    }
);


// Register API call
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${backendUrl}/api/v1/user/register`, userData)
            console.log('response', response.data)
            //   if (!response.ok) {
            //     throw new Error(data.message || 'Registration failed');
            //   }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


//  thunk to check auth status on app load
export const checkAuthStatus = createAsyncThunk(
    "auth/checkAuthStatus",
    async (_, { rejectWithValue }) => {
        console.log('yesssss')
        try {
            const response = await api.post("/api/v1/auth/refresh-token");
            console.log('reee', response.data.data)
            const { user, accessToken } = response.data.data;

            // Update axios headers
            api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            return { user, accessToken };
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);


// Logout API call 
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.post(`/api/v1/auth/logout`)
            console.log('response', response.data)
            //   if (!response.ok) {
            //     throw new Error(data.message || 'Registration failed');
            //   }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
